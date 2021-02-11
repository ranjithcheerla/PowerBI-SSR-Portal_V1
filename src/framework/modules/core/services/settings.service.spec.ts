import { TestBed } from '@angular/core/testing';

import { Layouts, Themes } from '../models';
import { ConfigurationService } from './configuration.service';
import { mockConfigurationService } from './configuration.service.mock';
import { SettingsService } from './settings.service';
import { UserPreferenceService } from './userpreference.service';
import { mockUserPreferenceService } from './userpreference.service.mock';

describe('SettingsService', () => {
  let service: SettingsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigurationService, useValue: mockConfigurationService },
        { provide: UserPreferenceService, useValue: mockUserPreferenceService }
      ]
    });
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to set the theme', () => {
    spyOn(service, 'setTheme').and.callThrough();
    service.setTheme(Themes.THEME1);
    expect(service.setTheme).toHaveBeenCalledTimes(1);
  });

  it('should be able to set the layout', () => {
    spyOn(service, 'setLayout').and.callThrough();
    service.setLayout(Layouts.BOXED);
    expect(service.setLayout).toHaveBeenCalledTimes(1);
  });

  it('should be able restore to default preferences', () => {
    spyOn(service, 'restoreDefaultSettings').and.callThrough();
    service.restoreDefaultSettings();
    expect(service.restoreDefaultSettings).toHaveBeenCalledTimes(1);
  });

  it('should be able get the default layout via observable', () => {
    service.layout$.subscribe((layout: Layouts) => {
      expect(layout).toEqual(Layouts.BOXED);
    });
  });

  it('should be able get the default theme via observable', () => {
    service.theme$.subscribe((theme: Themes) => {
      expect(theme).toEqual(Themes.THEME1);
    });
  });

  it('should be able get the default left nav state', () => {
    service.leftNavStateDefault$.subscribe((state: boolean) => {
      expect(state).toEqual(true);
    });
  });
});
