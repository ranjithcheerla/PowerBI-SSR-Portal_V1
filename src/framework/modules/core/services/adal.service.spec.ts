import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { AdalService } from './adal.service';
import { ConfigurationService } from './configuration.service';
import { mockConfigurationService } from './configuration.service.mock';
import { LoggerService } from './logger.service';
import { mockLoggerService } from './logger.service.mock';

declare const AuthenticationContext: any;
describe('AdalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AdalService,
        { provide: LoggerService, useValue: mockLoggerService },
        { provide: ConfigurationService, useValue: mockConfigurationService }
      ]
    });
  });

  it('should be created', inject([AdalService], (service: AdalService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to acquire token for a given resource ', inject([AdalService], (adalService: AdalService) => {
    spyOn(adalService, 'acquireToken').and.callThrough();
    adalService.acquireToken('https://graph.windows.net');
    expect(adalService.acquireToken).toHaveBeenCalledTimes(1);
  }));

  it('should have defined the  AuthenticationContext', inject([AdalService], (adalService: AdalService) => {
    expect(true).toEqual(<any>adalService.context instanceof AuthenticationContext);
  }));

  it('should have MS ADAL configuration defined', inject([AdalService], (adalService: AdalService) => {
    expect(adalService.config.clientId).toEqual('7bb1a976-1e0a-4e37-ae95-7a06a9269577');
    expect(adalService.config).toBeDefined();
  }));

  it('should be able to retrieve the logged in user information', inject([AdalService], (adalService: AdalService) => {
    spyOnProperty(adalService, 'user').and.returnValue('rchinnakampalli@worldbankgroup.org');
    expect(adalService.user).toBeDefined();
    expect(adalService.user).toEqual('rchinnakampalli@worldbankgroup.org');
  }));

  it('should be able to check whether the user is logged in or not', inject([AdalService], (adalService: AdalService) => {
    expect(adalService.isLogged).toBeDefined();
  }));

  it('should allow the user to signout of the logged in application', inject([AdalService], (adalService: AdalService) => {
    expect(adalService.signout).toBeDefined();
  }));
});
