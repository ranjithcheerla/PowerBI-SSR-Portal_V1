import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { CfwDebugService } from './cfw-debug.service';
import { mockCfwDebugService } from './cfw-debug.service.mock';
import { ConfigurationService } from './configuration.service';
import { mockConfigurationService } from './configuration.service.mock';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        LoggerService,
        { provide: ConfigurationService, useValue: mockConfigurationService },
        { provide: CfwDebugService, useValue: mockCfwDebugService }
      ]
    });
  });

  it('should be created', inject([LoggerService], (service: LoggerService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to log a message', inject([LoggerService], (service: LoggerService) => {
    spyOn(service, 'log').and.returnValue();
    service.log('success');
    expect(service.log).toHaveBeenCalledTimes(1);
  }));

  it('should be able to log an error', inject([LoggerService], (service: LoggerService) => {
    spyOn(service, 'error').and.returnValue();
    service.error('syserror');
    expect(service.error).toHaveBeenCalledTimes(1);
  }));
});
