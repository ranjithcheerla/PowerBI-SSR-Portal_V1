import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Api } from './api.service';
import { shareReplay, map, filter, switchMap } from 'rxjs/operators';
import { User, IUserDetails } from '../models/user.model';
import { MsalService } from './../../../msal';
import { ConfigurationService } from './configuration.service';
import { AdalService } from './adal.service';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserDetails {
  private loggedInUser: User;
  private CACHE_SIZE = 1;
  private cacheUser$: Observable<any>;
  private configService: ConfigurationService;
  constructor(private injector: Injector) {
    this.configService = this.injector.get(ConfigurationService);
  }

  getLoggedUserEmail$(): Observable<string> {
    if (this.configService.config.enableMSAL) {
      const msalService = this.injector.get(MsalService);
      const userEmail = msalService?.getAllAccounts()?.[0]?.username;
      return of(userEmail);
    } else {
      const adalSrv = this.injector.get(AdalService);
      const userEmail = adalSrv.user;
      return of(userEmail);
    }
  }

  getLoggedUserEmail(): string {
    if (this.configService.config.enableMSAL) {
      const msalService = this.injector.get(MsalService);
      return msalService?.getAllAccounts()?.[0]?.username ?? '';
    } else {
      const adalSrv = this.injector.get(AdalService);
      return adalSrv.isLogged ? adalSrv.user : null;
    }
  }

  getUniqueCode(): string {
    return this.loggedInUser.upi || '';
  }

  private adal_UserDetails(email?: string): Observable<Partial<User>> {
    const adalSrv = this.injector.get(AdalService);
    const configService = this.injector.get(ConfigurationService);
    const apiService = this.injector.get(Api);
    const userEmail = email || adalSrv.user;
    const host = configService.config.adalConfig.tenant;
    return apiService.get(`https://graph.windows.net/${host}/users/${userEmail}?api-version=1.6`);
  }

  private msal_UserDetails(): Observable<Partial<User>> {
    const appService = this.injector.get(AppService);
    const apiService = this.injector.get(Api);

    return appService.isUserLoggedIn$.asObservable().pipe(
      filter(isUserLoggedIn => isUserLoggedIn),
      switchMap(() => {
        return apiService.get(
          `https://graph.microsoft.com/v1.0/me?$select=employeeID,givenName,displayName,jobTitle,officeLocation,city,companyName,department,extension_d1f2c0509aca4d48927c1e519198c9f1_extensionAttribute12`
        );
      })
    );
  }

  getLoggedInUser(): Observable<Partial<User>> {
    if (!this.cacheUser$) {
      const user$ = this.configService.config.enableMSAL ? this.msal_UserDetails() : this.adal_UserDetails();
      this.cacheUser$ = user$.pipe(
        map(user => this.transformUserDetails(user)),
        shareReplay(this.CACHE_SIZE)
      );
    }
    return this.cacheUser$;
  }

  transformUserDetails(user: any): Partial<User> {
    return {
      upi: user?.employeeId,
      name: user?.displayName,
      location: `${user?.city ?? ''} (${user?.companyName ?? ''})`,
      unit: user?.department ?? user?.extension_d1f2c0509aca4d48927c1e519198c9f1_extensionAttribute12 ?? '',
      designation: user?.jobTitle ?? '',
      companyName: user?.companyName ?? '',
      dept: user?.department ?? '',
      vpuUnit: user?.extension_d1f2c0509aca4d48927c1e519198c9f1_extensionAttribute12 ?? '',
      _userObj: user
    };
  }

  setExternalUser(userDetails: User) {
    this.loggedInUser = userDetails;
  }
  getExternalUser(): User {
    return this.loggedInUser;
  }

  getLoggedInUserUpi(): Promise<string> {
    return new Promise(resolve => {
      this.getLoggedInUser()
        .pipe(map(user => user.upi))
        .subscribe((upi: string) => {
          resolve(upi);
        });
    });
  }
}
