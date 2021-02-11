import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Layouts, Themes } from '../models/configurations';
import { ConfigurationService } from './configuration.service';
import { UserPreferenceService } from './userpreference.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public layout$ = new BehaviorSubject<Layouts>(this?.configService?.config?.appConfig?.defaultLayout ?? Layouts.BOXED);
  public theme$ = new BehaviorSubject<Themes>(this?.configService?.config?.appConfig?.theme ?? Themes.THEME1);
  public leftNavStateDefault$ = new BehaviorSubject<boolean>(true);
  constructor(private configService: ConfigurationService, private userPreferenceService: UserPreferenceService) {}

  setTheme(theme: Themes): void {
    this.userPreferenceService.setGlobalAppSettings('theme', theme, true, true);
  }

  setLayout(layout: Layouts) {
    this.userPreferenceService.setGlobalAppSettings('layout', layout, true, true);
  }

  restoreDefaultSettings(): Observable<any> {
    return this.userPreferenceService.savePreferences({});
  }
}
