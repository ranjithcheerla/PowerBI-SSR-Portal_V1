import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { MsalService } from './../../../msal/msal.service';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

import { _ } from './../../../lodash';
import { ConfigurationService } from './configuration.service';
import { EncoderService } from './encoder.service';
import { LoggerService } from './logger.service';
import { AdalService } from './adal.service';

@Injectable({
  providedIn: 'root'
})
export class AppInsightsService {
  isWarningThrown = false;
  private appInsights: ApplicationInsights;
  constructor(
    private configService: ConfigurationService,
    private encoderService: EncoderService,
    private loggerService: LoggerService,
    private msalservice: MsalService,
    private adalService: AdalService,
    private location: LocationStrategy
  ) {}

  init() {
    if (!this?.configService?.config?.appConfig?.appInsightsKey || /#{/.test(this?.configService?.config?.appConfig?.appInsightsKey)) {
      return;
    }
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: this?.configService?.config?.appConfig?.appInsightsKey,
        enableAutoRouteTracking: true
      }
    });
    this.appInsights.loadAppInsights();
  }

  get appInsightsInstance() {
    return this.appInsights;
  }

  public trackPage(
    pageName: string,
    url: string = this.location.path(),
    breadcrumb: string,
    upi: string,
    extraInfo: { [key: string]: string } = {}
  ) {
    const config = {
      breadcrumb: breadcrumb,
      uid: this.encoderService.encode(upi),
      env: this.configService.config.appConfig.appEnv
    };
    const properties = _.merge({}, config, extraInfo);

    if (this.appInsights) {
      this.warnIfCFwKeyIsUsed(this.appInsights.config.instrumentationKey);
      const isUserLoggedIn = !!this?.configService?.config?.enableMSAL
        ? this?.msalservice?.getAllAccounts()?.length > 0
        : this.adalService.isLogged;
      this.appInsights.trackPageView({ name: pageName, uri: url, isLoggedIn: isUserLoggedIn, properties: properties });
    }
  }

  public logException(error: Error, upi: string, extraInfo: { [key: string]: string | number } = {}, severityLevel = 0) {
    if (this.appInsights) {
      this.warnIfCFwKeyIsUsed(this.appInsights.config.instrumentationKey);
      const properties = _.merge({}, { upi: this.encoderService.encode(upi) }, extraInfo);
      this.appInsights.trackException({
        error: error,
        properties: properties,
        severityLevel: severityLevel
      });
    }
  }

  public setUserContext(upiOrEmail: string) {
    if (this.appInsights) {
      this.warnIfCFwKeyIsUsed(this.appInsights.config.instrumentationKey);
      const encryptedUpiOrEmail = this.encoderService.encode(upiOrEmail);
      this.appInsights.setAuthenticatedUserContext(encryptedUpiOrEmail, '', true);
    }
  }

  public trackEvent(type: string, properties: { [key: string]: string | number } = {}) {
    if (this.appInsights) {
      this.warnIfCFwKeyIsUsed(this.appInsights.config.instrumentationKey);
      if (properties['upi']) {
        properties['upi'] = this.encoderService.encode(properties['upi'].toString());
      }
      this.appInsights.trackEvent({ name: type }, properties);
    }
  }

  private warnIfCFwKeyIsUsed(appInsightsKey: string): void {
    if (appInsightsKey === '1b6d0912-f78d-408d-856e-f778f8e7f409' && !this.isWarningThrown) {
      this.isWarningThrown = true;
      this.loggerService.log(
        `Looks like you haven't registered your application with Azure App Insights.
      ${appInsightsKey} key is intended for demoing Core Framework and shouldn't be used in applications!`,
        true
      );
    }
  }

  public startTrackPage(pageName: string) {
    this.appInsights.startTrackPage(pageName);
  }

  public stopTrackPage(pageName: string, url: string, properties: { [key: string]: any }) {
    this.appInsights.stopTrackPage(pageName, url, properties);
  }
}
