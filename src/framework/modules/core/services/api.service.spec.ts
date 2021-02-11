import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';

import { Api } from './api.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [Api]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([Api], (service: Api) => {
    expect(service).toBeTruthy();
  }));

  it(
    `should be able to do HTTP Get`,
    waitForAsync(
      inject([Api, HttpTestingController], (api: Api, backend: HttpTestingController) => {
        api.get('https://searchfeeds.worldbank.org/people/bank?format=json&qterm=jim', {}).subscribe(data => {
          expect(data.count).toEqual(10);
        });

        const request = backend.expectOne('https://searchfeeds.worldbank.org/people/bank?format=json&qterm=jim');
        request.flush({ count: 10 });
        backend.verify();
      })
    )
  );

  it(
    `should be able to do HTTP Post`,
    waitForAsync(
      inject([Api, HttpTestingController], (api: Api, backend: HttpTestingController) => {
        api.post('https://3ociscyl67.execute-api.us-east-1.amazonaws.com/dev/postenum?v=2', { custom: false }).subscribe(data => {
          expect(data.success).toEqual(true);
        });

        const request = backend.expectOne('https://3ociscyl67.execute-api.us-east-1.amazonaws.com/dev/postenum?v=2');
        request.flush({ success: true });
        backend.verify();
      })
    )
  );

  it(
    `should be able to do HTTP Delete`,
    waitForAsync(
      inject([Api, HttpTestingController], (api: Api, backend: HttpTestingController) => {
        api.delete('https://myid.worldbank.org/12345', {}).subscribe(data => {
          expect(data.success).toEqual(true);
        });

        const request = backend.expectOne('https://myid.worldbank.org/12345');
        request.flush({ success: true });
        backend.verify();
      })
    )
  );

  it(
    `should be able to do HTTP Patch`,
    waitForAsync(
      inject([Api, HttpTestingController], (api: Api, backend: HttpTestingController) => {
        const obj$ = api.patch('https://myid.worldbank.org/update', { update: true }).subscribe(data => {
          expect(data.success).toEqual(true);
        });

        const request = backend.expectOne('https://myid.worldbank.org/update');
        request.flush({ success: true });
        backend.verify();
      })
    )
  );
});
