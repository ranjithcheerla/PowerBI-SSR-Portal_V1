import { Injectable, VERSION } from '@angular/core';
import { ConfigurationService } from './../../services/configuration.service';
import { CFW_INTERNAL } from '../../../../framework.constant';
import { SplashscreenService } from './../../services/splashscreen.service';
import { AppService } from './../../services/app.service';
import { ILabelValue } from './../../models/corefw-insights.model';

@Injectable({
  providedIn: 'root'
})
export class CfwinsightsService {
  private coreFwInsights: Array<ILabelValue> = [
    {
      label: 'Angular Version',
      value: VERSION?.full ?? 'N/A'
    },
    {
      label: 'Core Framework Version',
      value: CFW_INTERNAL?.version ?? 'N/A'
    },
    {
      label: 'Application Version',
      value: this?.configService?.config?.appConfig?.appInfo?.version ?? 'N/A'
    },
    {
      label: 'Application Build Date',
      value: this?.configService?.config?.appConfig?.appInfo?.buildDate ?? 'N/A'
    },
    {
      label: 'CRM License check',
      value: this?.configService?.config?.appConfig?.authorizations?.crmLicenseCheck ?? false
    },
    {
      label: 'Preference Mode',
      value: this?.configService?.config?.preferencesMode ?? 'N/A'
    }
  ];
  constructor(
    private configService: ConfigurationService,
    private splashScreenService: SplashscreenService,
    private appService: AppService
  ) {}

  getAppDetails(): Array<ILabelValue> {
    this.splashScreenService.hide();
    this.appService.showLeftNav$.next(false);

    return this.coreFwInsights;
  }
}
