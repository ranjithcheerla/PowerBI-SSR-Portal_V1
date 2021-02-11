import { inject, TestBed } from '@angular/core/testing';

import { ConfigurationService } from './configuration.service';
import { mockConfigurationService } from './configuration.service.mock';
import { ConfigurationsInjectionService } from './tokens';

describe('ConfigurationService', () => {
  let configService: ConfigurationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfigurationsInjectionService,
          useValue: mockConfigurationService.config
        }
      ]
    });
    configService = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(configService).toBeTruthy();
  });

  it('should be able to retrieve configurations', () => {
    const fwConfig = configService.config;
    expect(fwConfig.siteName).toEqual('page1');
  });
});
