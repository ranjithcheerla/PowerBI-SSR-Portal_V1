import { TestBed } from '@angular/core/testing';

import { EncoderService } from './encoder.service';

describe('EncoderService', () => {
  let encoderService: EncoderService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    encoderService = TestBed.inject(EncoderService);
  });

  it('should be created', () => {
    expect(encoderService).toBeTruthy();
  });

  it('should encode the string passes as paramter', () => {
    const encodedString = encoderService.encode('000527065');
    expect(encodedString).toEqual('MDAwNTI3MDY1');
  });
});
