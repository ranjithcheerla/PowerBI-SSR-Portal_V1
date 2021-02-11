import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { StorageService } from './storage.service';
import { WindowToken } from './window.service';

describe('Storage Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        StorageService,
        {
          provide: WindowToken,
          useValue: {
            localStorage: {
              getItem: () => {},
              setItem: () => {}
            },
            sessionStorage: {
              getItem: () => {},
              setItem: () => {}
            }
          }
        }
      ]
    });
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));

  it(
    `should be able to set to local storage`,
    waitForAsync(
      inject([StorageService], (storageService: StorageService) => {
        spyOn(storageService, 'set').and.returnValue(of('success'));
        storageService.set('name', 'core fw').subscribe(result => {
          expect(result).toEqual('success');
        });
        expect(storageService.set).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to get the data stored in local Storage`,
    waitForAsync(
      inject([StorageService], (storageService: StorageService) => {
        spyOn(storageService, 'get').and.returnValue(of('core fw'));

        storageService.get('name').subscribe(data => {
          expect(data).toEqual('core fw');
        });
      })
    )
  );

  it(
    `should be able to set to session storage`,
    waitForAsync(
      inject([StorageService], (storageService: StorageService) => {
        spyOn(storageService, 'set').and.returnValue(of('success'));
        storageService.set('name', 'core fw', 'session').subscribe(result => {
          expect(result).toEqual('success');
        });
        expect(storageService.set).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to get the data stored in session Storage`,
    waitForAsync(
      inject([StorageService], (storageService: StorageService) => {
        spyOn(storageService, 'get').and.returnValue(of('core fw'));

        storageService.get('name', 'session').subscribe(data => {
          expect(data).toEqual('core fw');
        });
      })
    )
  );
});
