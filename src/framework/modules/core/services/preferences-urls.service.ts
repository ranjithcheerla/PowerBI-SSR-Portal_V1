import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { PreferencesUrls } from '../models/configurations';
import { _ } from './../../../lodash';
import { FWConstants } from './../../../framework.constant';

@Injectable({
  providedIn: 'root'
})
export class PreferencesUrlsService {
  private preferencesUrls: PreferencesUrls;
  constructor(private configService: ConfigurationService) {
    this.preferencesUrls = FWConstants;
    if (!!this.configService.config.sitePreferencesURL) {
      this.preferencesUrls = _.merge(FWConstants, this.configService.config.sitePreferencesURL);
    }
  }

  get FWConstants() {
    return this.preferencesUrls;
  }
}
