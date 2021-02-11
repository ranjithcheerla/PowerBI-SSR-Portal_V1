import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { FrameworkService } from './../services/framework.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoggerService } from './../services/logger.service';
import { ConfigurationService } from './../services/configuration.service';
import { MsalService } from './../../../msal';
import { AdalService } from '../services/adal.service';

@Injectable({
  providedIn: 'root'
})
export class CRMGuard implements CanActivate {
  constructor(
    private router: Router,
    private loggerService: LoggerService,
    private fwService: FrameworkService,
    private msalService: MsalService,
    private configService: ConfigurationService,
    private adalService: AdalService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.configService.config.appConfig.authorizations || !this.configService.config.appConfig.authorizations.crmLicenseCheck) {
      this.loggerService.log(` CRM License check has been disabled in the configuration or not added, hence no check has been made! `);
      return of(true);
    }

    const userName = !!this?.configService?.config?.enableMSAL ? this?.msalService?.getAllAccounts()[0]?.username : this.adalService.user;
    const crmUrl = this.configService.config.appConfig.authorizations.crmHostUrl;

    if (!userName) {
      this.loggerService.log(`Failed to retrieve the logged in user email, hence blocking access!`);
      return of(false);
    }

    return this.fwService.apiHttpGet<string>(`${crmUrl}/api/license/has?email=${userName}`).pipe(
      switchMap(data => {
        this.loggerService.log(data);
        if (data === 'License Not Found') {
          this.triggerProvideAccessApi(userName, crmUrl);
          this.redirectToErrorPage();
          return of(false);
        }
        return of(true);
      })
    );
  }

  redirectToErrorPage() {
    const appConfig = this.configService.config.appConfig;

    if (appConfig && appConfig.authorizations && appConfig.authorizations.crmErrorRoute) {
      this.router.navigate([appConfig.authorizations.crmErrorRoute]);
    } else {
      this.router.navigate(['error'], {
        queryParams: { type: 'NO_ACCESS' },
        skipLocationChange: true
      });
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  triggerProvideAccessApi(userName: string, url: string) {
    const crmAppId = this.configService.config.appConfig.authorizations.crmAppId;
    this.fwService.apiHttpPost(`${url}/api/license/provideaccess?appId=${crmAppId}&email=${userName}`, {}).subscribe();
  }
}
