import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { CfwDebugService } from './cfw-debug.service';
import { WindowToken } from './window.service';

describe('CfwDebugService', () => {
  let service: CfwDebugService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApplicationRef,
        {
          provide: WindowToken,
          useValue: {}
        }
      ]
    });
    service = TestBed.inject(CfwDebugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be initialized', () => {
    spyOn(service, 'init').and.callThrough();
    service.init();
    expect(service.init).toHaveBeenCalledTimes(1);
  });

  it('should set the default Core framework object', () => {
    spyOn(service, 'setCfwWindowObject').and.callThrough();
    service.setCfwWindowObject({});
    expect(service.setCfwWindowObject).toHaveBeenCalledTimes(1);
  });

  it('should able to update the errors', () => {
    spyOn(service, 'updateError').and.callThrough();
    service.updateError('');
    expect(service.updateError).toHaveBeenCalledTimes(1);
  });

  it('should able to update the information relevant for debugging purposes', () => {
    spyOn(service, 'updateInfo').and.callThrough();
    service.updateInfo('');
    expect(service.updateInfo).toHaveBeenCalledTimes(1);
  });
});
