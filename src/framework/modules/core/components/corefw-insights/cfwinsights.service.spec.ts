import { TestBed } from '@angular/core/testing';

import { CfwinsightsService } from './cfwinsights.service';
import { SplashscreenService } from './../../services/splashscreen.service';
import { AppService } from './../../services/app.service';
import { ConfigurationService } from './../../services/configuration.service';
import { mockConfigurationService } from './../../services/configuration.service.mock';
import { mockAppService } from './../../services/app.service.mock';
import { mockSplashScreenService } from './../../services/splashscreen.service.mock';

describe('CfwinsightsService', () => {
  let service: CfwinsightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfigurationService,
          useValue: mockConfigurationService
        },
        {
          provide: AppService,
          useValue: mockAppService
        },
        {
          provide: SplashscreenService,
          useValue: mockSplashScreenService
        }
      ]
    });
    service = TestBed.inject(CfwinsightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
