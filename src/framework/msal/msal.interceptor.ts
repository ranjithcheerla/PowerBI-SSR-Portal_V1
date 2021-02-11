import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, from, EMPTY } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { MsalService } from './msal.service';
import { AuthenticationResult, InteractionType } from '@azure/msal-browser';
import { Injectable, Inject } from '@angular/core';
import { MSAL_INTERCEPTOR_CONFIG } from './constants';
import { MsalInterceptorConfig } from './msal.interceptor.config';
import { ConfigurationService } from './../modules/core/services/configuration.service';

@Injectable()
export class MsalInterceptor implements HttpInterceptor {
  static accessToken;
  constructor(
    @Inject(MSAL_INTERCEPTOR_CONFIG) private msalInterceptorConfig: MsalInterceptorConfig,
    private authService: MsalService,
    private configService: ConfigurationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let scopes = this.getScopesForEndpoint(req.url);
    const account = this.authService.getAllAccounts()[0];

    let httpParams = req.params;
    // Read the framework urls which require token to be acquired
    if (this.configService.config.preferenceSecure && req.params.has('prefUrl')) {
      scopes = [req.params.get('prefUrl')];
      httpParams = req.params.delete('prefUrl');
    }

    req = req.clone({
      params: httpParams
    });

    if (!scopes || scopes.length === 0) {
      return next.handle(req);
    }

    // Note: For MSA accounts, include openid scope when calling acquireTokenSilent to return idToken
    return this.authService.acquireTokenSilent({ scopes, account }).pipe(
      catchError(() => {
        if (this.msalInterceptorConfig.interactionType === InteractionType.Popup) {
          return this.authService.acquireTokenPopup({ ...this.msalInterceptorConfig.authRequest, scopes });
        }
        const redirectStartPage = window.location.href;
        this.authService.acquireTokenRedirect({ ...this.msalInterceptorConfig.authRequest, scopes, redirectStartPage });
        return EMPTY;
      }),
      switchMap((result: AuthenticationResult) => {
        const headers = req.headers.set('Authorization', `Bearer ${result.accessToken}`);
        MsalInterceptor.accessToken = result.accessToken;
        const requestClone = req.clone({ headers });
        return next.handle(requestClone);
      })
    );
  }

  private getScopesForEndpoint(endpoint: string): Array<string> | null {
    const protectedResourcesArray = Array.from(this.msalInterceptorConfig.protectedResourceMap.keys());
    const keyMatchesEndpointArray = protectedResourcesArray.filter(key => {
      return endpoint.indexOf(key) > -1;
    });

    // process all protected resources and send the first matched resource
    if (keyMatchesEndpointArray.length > 0) {
      const keyForEndpoint = keyMatchesEndpointArray[0];
      if (keyForEndpoint) {
        return this.msalInterceptorConfig.protectedResourceMap.get(keyForEndpoint);
      }
    }

    return null;
  }
}
