import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

import { AdalService } from './adal.service';
import { mockAdalService } from './adal.service.mock';
import { AppInsightsService } from './app-insights.service';
import { ConfigurationService } from './configuration.service';
import { mockConfigurationService } from './configuration.service.mock';
import { EncoderService } from './encoder.service';
import { LoggerService } from './logger.service';
import { mockLoggerService } from './logger.service.mock';
import { MsalService } from './../../../msal/msal.service';

describe('AppInsightsService', () => {
  const fakeEncoderService = {};
  const mockMsalService = {};
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfigurationService,
          useValue: mockConfigurationService
        },
        {
          provide: EncoderService,
          useValue: fakeEncoderService
        },
        {
          provide: LoggerService,
          useValue: mockLoggerService
        },
        {
          provide: AdalService,
          useValue: mockAdalService
        },
        {
          provide: LocationStrategy,
          useValue: MockLocationStrategy
        },
        { provide: MsalService, useValue: mockMsalService }
      ]
    })
  );

  it('should be created', () => {
    const service: AppInsightsService = TestBed.inject(AppInsightsService);
    expect(service).toBeTruthy();
  });

  it('should initialize', inject([AppInsightsService], (appInsightsService: AppInsightsService) => {
    spyOn(appInsightsService, 'init').and.callThrough();
    appInsightsService.init();
    expect(appInsightsService.init).toHaveBeenCalledTimes(1);
  }));

  it('should be able to retrive App Insights instance', inject([AppInsightsService], (appInsightsService: AppInsightsService) => {
    spyOn(appInsightsService, 'init').and.callThrough();
    appInsightsService.init();
    const appInsightsInstance = appInsightsService.appInsightsInstance;
    expect(true).toEqual(<any>appInsightsInstance instanceof ApplicationInsights);
  }));

  it('should be able to track page views', inject([AppInsightsService], (appInsightsService: AppInsightsService) => {
    spyOn(appInsightsService, 'trackPage').and.returnValue();
    appInsightsService.init();
    appInsightsService.trackPage('Dashboard', 'https://id.worldbank.org', 'home/dashboard', '000527065', {});
    expect(appInsightsService.trackPage).toHaveBeenCalledTimes(1);
  }));

  it('should be able to log execeptions', inject([AppInsightsService], (appInsightsService: AppInsightsService) => {
    spyOn(appInsightsService, 'logException').and.returnValue();
    appInsightsService.init();
    appInsightsService.logException(new Error(), '000527065', {});
    expect(appInsightsService.logException).toHaveBeenCalledTimes(1);
  }));

  it('should be able set the authentication user context for the current session', inject(
    [AppInsightsService],
    (appInsightsService: AppInsightsService) => {
      spyOn(appInsightsService, 'setUserContext').and.returnValue();
      appInsightsService.init();
      appInsightsService.setUserContext('000527065');
      expect(appInsightsService.setUserContext).toHaveBeenCalledTimes(1);
    }
  ));

  it('should be able to track event like - click, download etc.,', inject(
    [AppInsightsService],
    (appInsightsService: AppInsightsService) => {
      spyOn(appInsightsService, 'trackEvent').and.returnValue();
      appInsightsService.init();
      appInsightsService.trackEvent('Dashboard', { type: 'download' });
      expect(appInsightsService.trackEvent).toHaveBeenCalledTimes(1);
    }
  ));

  it('should be able start the page tracking', inject([AppInsightsService], (appInsightsService: AppInsightsService) => {
    spyOn(appInsightsService, 'startTrackPage').and.returnValue();
    appInsightsService.init();
    appInsightsService.startTrackPage('Dashboard');
    expect(appInsightsService.startTrackPage).toHaveBeenCalledTimes(1);
  }));

  it('should be able stop the page tracking', inject([AppInsightsService], (appInsightsService: AppInsightsService) => {
    spyOn(appInsightsService, 'stopTrackPage').and.returnValue();
    appInsightsService.init();
    appInsightsService.stopTrackPage('Dashboard', 'http://id.worldbank.org/dashboard', {});
    expect(appInsightsService.stopTrackPage).toHaveBeenCalledTimes(1);
  }));
});
