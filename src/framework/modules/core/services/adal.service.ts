import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { ConfigurationService } from './../services/configuration.service';
import { LoggerService } from './../services/logger.service';

declare const AuthenticationContext: any;

@Injectable({
  providedIn: 'root'
})
export class AdalService {
  private _config;
  private _context;
  constructor(private configService: ConfigurationService, private loggerService: LoggerService) {
    if (!this.configService.config.enableMSAL) {
      this._config = this.configService.config.adalConfig;
      this._context = new AuthenticationContext(this._config);
    }
  }

  get config() {
    return this._config;
  }

  get context() {
    return this._context;
  }

  get user(): string {
    return this._context.getCachedUser().userName;
  }

  get isLogged(): boolean {
    const user = this._context.getCachedUser();
    return !!user;
    // const token = this._context.getCachedToken(this._config.clientId);
    // return !!user && !!token;
  }

  public acquireToken(resource: string): Observable<string> {
    return new Observable<string>((subscriber: Subscriber<string>) =>
      this._context.acquireToken(resource, (errorDesc: string, token: string, error: string) => {
        if (error !== null && error !== undefined) {
          this.loggerService.log(`Aquiring Token for the resource : ${resource} has thrown this error: ${error}`);
          this.loggerService.log(errorDesc);
        }
        // There is a chance that during acquire token, we may recieve the below error codes, if the browser session was
        // opened for long time. Hence we're checking for the below error codes and triggering login if it needs!
        if (error === 'interaction_required' || error === 'login_required') {
          // this._context.login();
          this._context.acquireTokenRedirect(resource, null, null);
        }
        subscriber.next(token);
        subscriber.complete();
      })
    );
  }
  signout() {
    this._context.logOut();
  }
}
