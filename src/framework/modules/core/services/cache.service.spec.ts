import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheService]
    });
  });

  it('should be created', inject([CacheService], (cacheService: CacheService) => {
    expect(cacheService).toBeTruthy();
  }));
});
