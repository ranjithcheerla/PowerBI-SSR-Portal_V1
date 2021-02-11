import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, Injector, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, tap, finalize } from 'rxjs/operators';

import { AdalService } from '../services/adal.service';
import { ConfigurationService } from './../services/configuration.service';
import { MessageService } from './../services/message.service';
import { enterZone } from './../../commonutil/utils/zone.util';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private inject: Injector,
    private configService: ConfigurationService,
    private ngZone: NgZone,
    private messageService: MessageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const context = this;
    let statusCode: number;
    const aService = this.inject.get(AdalService);
    let widgetId: string, userAction: string, pageId: string, siteId: string;
    let httpParams: HttpParams;
    let started = Date.now();

    const httpHandle = request => {
      return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse || event instanceof HttpErrorResponse) {
            statusCode = event.status;
          }
        }),
        finalize(() => {
          const elapsed = Date.now() - started;
          this.messageService.add({
            userAction: userAction,
            widgetId: widgetId,
            pageId: pageId,
            siteId: this.configService.config.appKey,
            httpMethod: request.method,
            responseTime: elapsed,
            url: request.url,
            httpStatusCode: statusCode
          });
        })
      );
    };
    // Config handler to check whether to proceed with interceptor!
    if (!this?.configService?.config?.appConfig?.enableInterceptor) {
      // return next.handle(req);
      return httpHandle(req);
    }
    let resource = this.configService.config.resources.filter(item => req.url.indexOf(item) > -1)[0] || '';
    if (
      resource &&
      resource !== '' &&
      this.configService.config.resourcesTokenUrlMap &&
      this.configService.config.resourcesTokenUrlMap[resource] &&
      this.configService.config.resourcesTokenUrlMap[resource].tokenUrl
    ) {
      resource = this.configService.config.resourcesTokenUrlMap[resource].tokenUrl;
    }

    httpParams = req.params;
    // Read the framework urls which require token to be acquired
    if (this.configService.config.preferenceSecure && req.params.has('prefUrl')) {
      resource = req.params.get('prefUrl');
      httpParams = req.params.delete('prefUrl');
    }
    // Read the Analytics parameters and clear it from the request object!
    if (req.params.has('widgetId')) {
      widgetId = req.params.get('widgetId');
      httpParams = req.params.delete('widgetId');
    }

    if (req.params.has('userAction')) {
      userAction = req.params.get('userAction');
      httpParams = httpParams.delete('userAction');
    }

    if (req.params.has('pageId')) {
      pageId = req.params.get('pageId');
      httpParams = httpParams.delete('pageId');
    }

    if (req.params.has('siteId')) {
      siteId = req.params.get('siteId');
      httpParams = httpParams.delete('siteId');
    }

    req = req.clone({
      params: httpParams
    });
    started = Date.now();
    if (resource && resource !== '') {
      return aService.acquireToken(resource).pipe(
        mergeMap(token => {
          if (token) {
            req = req.clone({
              setHeaders: this.getHeaders(token)
            });
          }
          return context.ngZone.run(() => {
            return httpHandle(req).pipe(enterZone(context.ngZone));
          });
        })
      );
    } else {
      return context.ngZone.run(() => {
        return httpHandle(req).pipe(enterZone(context.ngZone));
      });
    }
  }

  private getHeaders(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      Expires: '0'
    };

    if (this?.configService?.config?.appConfig?.pragmaOnRequestHeader ?? true) {
      headers['Pragma'] = 'no-cache';
    }
    return headers;
  }
}
