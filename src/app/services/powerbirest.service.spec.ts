import { TestBed } from '@angular/core/testing';

import { PowerbirestService } from './powerbirest.service';

describe('PowerbirestService', () => {
  let service: PowerbirestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerbirestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
