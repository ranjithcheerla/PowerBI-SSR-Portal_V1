import { TestBed } from '@angular/core/testing';
import { ConfigurationService } from './configuration.service';
import { mockConfigurationService } from './configuration.service.mock';

import { SplashscreenService } from './splashscreen.service';

describe('SplashscreenService', () => {
  let service: SplashscreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: ConfigurationService, useValue: mockConfigurationService }] });
    service = TestBed.inject(SplashscreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to show', () => {
    spyOn(service, 'show').and.returnValue();
    service.show();
    expect(service.show).toHaveBeenCalledTimes(1);
  });

  it('should be able to hide', () => {
    spyOn(service, 'hide').and.returnValue();
    service.hide();
    expect(service.hide).toHaveBeenCalledTimes(1);
  });
});
