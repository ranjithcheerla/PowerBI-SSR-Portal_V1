import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { ConfigurationService } from './../services/configuration.service';
import { AdalService } from './adal.service';
import { mockAdalService } from './adal.service.mock';
import { Api } from './api.service';
import { mockApiService } from './api.service.mock';
import { mockConfigurationService } from './configuration.service.mock';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: ConfigurationService, useValue: mockConfigurationService },
        { provide: AdalService, useValue: mockAdalService },
        { provide: Api, useValue: mockApiService }
      ]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it(
    'should be able to retrieve the logged in user email as observable',
    waitForAsync(
      inject([UserService], (service: UserService) => {
        spyOn(service, 'getLoggedUserEmail$').and.callThrough();
        service.getLoggedUserEmail$().subscribe(data => {
          expect(data).toBe('rchinnakampalli@worldbankgroup.org');
        });
        expect(service.getLoggedUserEmail$).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    'should be able to retrieve the logged in user email',
    waitForAsync(
      inject([UserService], (service: UserService) => {
        expect(service.getLoggedUserEmail()).toBe('rchinnakampalli@worldbankgroup.org');
      })
    )
  );

  it(
    'should be able to retrieve unique Id, if external user is set instead of MS ADAL',
    waitForAsync(
      inject([UserService], (service: UserService) => {
        service.setExternalUser({
          upi: '000527065',
          name: 'Roopesh Chinnakampalli',
          location: 'Washington DC',
          unit: 'ITSDT',
          designation: 'ET Consultant'
        });

        const uniqueId = service.getUniqueCode();

        expect(uniqueId).toEqual('000527065');
      })
    )
  );

  it(
    'should be able to retrieve the logged in user details',
    waitForAsync(
      inject([UserService], (service: UserService) => {
        spyOn(service, 'getLoggedInUser').and.returnValue(
          of({
            upi: '000527065',
            name: 'Roopesh Chinnakampalli',
            location: 'Washington DC',
            unit: 'ITSDT',
            designation: 'ET Consultant'
          })
        );
        service.getLoggedInUser().subscribe(data => {
          expect(data.upi).toBe('000527065');
        });

        expect(service.getLoggedInUser).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    'should be able to set external user',
    waitForAsync(
      inject([UserService], (service: UserService) => {
        spyOn(service, 'setExternalUser').and.callThrough();
        service.setExternalUser({
          upi: '000527065',
          name: 'Roopesh Chinnakampalli',
          location: 'Washington DC',
          unit: 'ITSDT',
          designation: 'ET Consultant'
        });
        expect(service.setExternalUser).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    'should be able to get external user',
    waitForAsync(
      inject([UserService], (service: UserService) => {
        spyOn(service, 'getExternalUser').and.callThrough();
        service.setExternalUser({
          upi: '000527065',
          name: 'Roopesh Chinnakampalli',
          location: 'Washington DC',
          unit: 'ITSDT',
          designation: 'IT Analyst'
        });

        const externalUser = service.getExternalUser();
        expect(service.getExternalUser).toHaveBeenCalledTimes(1);
        expect(externalUser.upi).toEqual('000527065');
      })
    )
  );

  it(
    'should be able to get logged in user UPI',
    waitForAsync(
      inject([UserService], (service: UserService) => {
        spyOn(service, 'getLoggedInUser').and.returnValue(
          of({
            upi: '000527065',
            name: 'Roopesh Chinnakampalli',
            location: 'Washington DC',
            unit: 'ITSDT',
            designation: 'IT Analyst'
          })
        );

        service.getLoggedInUserUpi().then(upi => {
          expect(upi).toEqual('000527065');
        });
      })
    )
  );
});
