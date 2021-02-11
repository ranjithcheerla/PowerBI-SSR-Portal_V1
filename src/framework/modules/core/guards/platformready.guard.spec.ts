import { TestBed, waitForAsync, inject } from '@angular/core/testing';

import { PlatformreadyGuard } from './platformready.guard';
import { AppService } from '../services/app.service';
import { Subject } from 'rxjs';

xdescribe('PlatformreadyGuard', () => {
  const fakeAppService = {
    routeParams$: new Subject()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlatformreadyGuard, { provide: AppService, useValue: fakeAppService }]
    });
  });

  it('should ...', inject([PlatformreadyGuard], (guard: PlatformreadyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
