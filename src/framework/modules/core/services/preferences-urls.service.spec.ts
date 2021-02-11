import { TestBed } from '@angular/core/testing';

import { ConfigurationService } from './configuration.service';
import { mockConfigurationService } from './configuration.service.mock';
import { PreferencesUrlsService } from './preferences-urls.service';

describe('PreferencesUrlsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: ConfigurationService, useValue: mockConfigurationService }]
    })
  );

  it('should be created', () => {
    const service: PreferencesUrlsService = TestBed.inject(PreferencesUrlsService);
    expect(service).toBeTruthy();
  });

  it('should be able to retrieve the merged preference URLs', () => {
    const service: PreferencesUrlsService = TestBed.inject(PreferencesUrlsService);
    const preferenceUrls = service.FWConstants;
    expect(preferenceUrls).not.toBe(null);
    expect(preferenceUrls?.environment?.DEV?.preferencesUrl?.customApps?.url).toEqual(
      'https://coreframeworkdev.worldbank.org/coreframework-api/'
    );
    expect(preferenceUrls?.environment?.DEV?.preferencesUrl?.customApps?.rtokenUrl).toEqual('api://385de6d1-5031-45df-9048-7d6b8317b965');
  });
});
