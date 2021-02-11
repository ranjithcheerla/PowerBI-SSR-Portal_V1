import { TestBed } from '@angular/core/testing';

import { RootSiteService } from './root-site.service';

describe('RootSiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RootSiteService = TestBed.inject(RootSiteService);
    expect(service).toBeTruthy();
  });

  it('should have implemented the interface method - getSiteId and return __NONE__', () => {
    const service: RootSiteService = TestBed.inject(RootSiteService);
    service.getSiteId().subscribe(data => {
      expect(data).toEqual('__NONE__');
    });
  });
});
