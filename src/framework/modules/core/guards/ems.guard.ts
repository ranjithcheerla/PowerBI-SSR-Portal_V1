import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanLoad, Route } from '@angular/router';

import { AdalService } from '../services/adal.service';
import { ConfigurationService } from './../services/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class EMSGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private adalSrv: AdalService, private configService: ConfigurationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkForAccess(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route) {
    return this.checkForAccess(route.path);
  }

  checkForAccess(url: string) {
    if (this.adalSrv.isLogged) {
      window.sessionStorage.removeItem('isFirstTimeLogin');
      return true;
    } else {
      const isFirstTimeLogin = window.sessionStorage.getItem('isFirstTimeLogin');
      if (isFirstTimeLogin === null || isFirstTimeLogin === undefined) {
        window.sessionStorage.setItem('isFirstTimeLogin', 'yes');
        this.adalSrv.context.login();
      } else {
        this.router.navigate(['error'], {
          queryParams: { type: 'SESSION_EXPIRY' },
          skipLocationChange: true
        });
        return false;
      }
    }
  }
}
