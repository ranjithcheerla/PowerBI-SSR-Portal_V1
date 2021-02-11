import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment } from '@angular/router';
import { MsalService } from './msal.service';
import { Injectable, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { InteractionType } from '@azure/msal-browser';
import { MsalGuardConfiguration } from './msal.guard.config';
import { MSAL_GUARD_CONFIG } from './constants';
import { concatMap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ConfigurationService } from './../modules/core/services/configuration.service';

@Injectable()
export class MsalGuard implements CanActivate, CanLoad {
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private location: Location,
    private configService: ConfigurationService
  ) { }

  /**
   * Builds the absolute url for the destination page
   * @param path Relative path of requested page
   * @returns Full destination url
   */
  getDestinationUrl(path: string): string {
    // Absolute base url for the application (default to origin if base element not present)
    const baseElements = document.getElementsByTagName('base');
    const baseUrl = this.location.normalize(baseElements.length ? baseElements[0].href : window.location.origin);

    // Path of page (including hash, if using hash routing)
    const pathUrl = this.location.prepareExternalUrl(path);

    // Hash location strategy
    if (pathUrl.startsWith('#')) {
      return `${baseUrl}/${pathUrl}`;
    }

    // If using path location strategy, pathUrl will include the relative portion of the base path (e.g. /base/page).
    // Since baseUrl also includes /base, can just concatentate baseUrl + path
    return `${baseUrl}${path}`;
  }

  private loginInteractively(url: string): Observable<boolean> {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      return this.authService.loginPopup({ ...this.msalGuardConfig.authRequest }).pipe(
        map(() => true),
        catchError(() => of(false))
      );
    }
    const initialScope = this?.configService?.config?.initialScope ?? '';
    const redirectStartPage = this.getDestinationUrl(url);
    this.authService.loginRedirect({
      redirectStartPage,
      scopes: [initialScope],
      ...this.msalGuardConfig.authRequest
    });
    return of(false);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.authService.handleRedirectObservable().pipe(
      concatMap(() => {
        if (!this.authService.getAllAccounts().length) {
          return this.loginInteractively(state.url);
        }
        return of(true);
      }),
      // tslint:disable-next-line:no-console
      catchError(() => console.log)
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.handleRedirectObservable().pipe(
      concatMap(() => {
        if (!this.authService.getAllAccounts().length) {
          const initialScope = this?.configService?.config?.initialScope ?? [];
          const url = this.constructURLFromSegments(segments);
          const redirectStartPage = this.getDestinationUrl(url);
          this.authService.loginRedirect({
            redirectStartPage,
            scopes: [initialScope],
            ...this.msalGuardConfig.authRequest
          });
          return of(false);
        }
        return of(true);
      }),
      // tslint:disable-next-line:no-console
      catchError(() => console.log)
    );
  }

  private constructURLFromSegments(segments: UrlSegment[]): string {
    let url = '';
    segments.forEach(segment => {
      url += `/${segment.path}`;
    });
    return url;
  }
}
