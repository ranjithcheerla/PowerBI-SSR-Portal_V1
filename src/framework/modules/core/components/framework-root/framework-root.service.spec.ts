import { TestBed } from '@angular/core/testing';

import { FrameworkRootService } from './framework-root.service';

xdescribe('FrameworkRootService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FrameworkRootService = TestBed.inject(FrameworkRootService);
    expect(service).toBeTruthy();
  });
});
