import { AdalService } from './../services/adal.service';
import { Api } from './../services/api.service';
import { UserPreferenceService } from './../services/userpreference.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Injectable, Injector, NgZone, enableProdMode } from '@angular/core';
import { MessageService } from './../services/message.service';

import { TokenInterceptor } from './tokenInterceptor';
import { ConfigurationService } from './../services/configuration.service';
import { waitForAsync } from '@angular/core/testing';
import { HttpParams } from '@angular/common/http';

describe('TokenInterceptor', () => {
  const ROOT_URL = `https://searchfeeds.worldbank.org/people/bank?format=json&qterm=jim`;
  beforeEach(() => {
    const fakeConfigurationService = {
      config: {
        appConfig: {
          enableInterceptor: true
        },
        eumUrl: '',
        resources: [],
        appKey: 'APP001'
      }
    };

    const fakeAdalService = {
      acquireToken() {
        return true;
      }
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Api,
        UserPreferenceService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: MessageService },
        { provide: ConfigurationService, useValue: fakeConfigurationService },
        { provide: AdalService, useValue: fakeAdalService }
      ]
    });
  });
  it('response should be created', inject([Api], (apiService: Api) => {
    const widparams: HttpParams = new HttpParams()
      .set('widgetId', 'WID007')
      .set('userAction', 'test')
      .set('pageId', 'test')
      .set('siteId', 'test');
    apiService
      .post(`${ROOT_URL}`, { siteId: 'APP0023', upi: 'spattery@tstad.worldbank.org' }, { params: widparams })
      .subscribe(response => {
        expect(response).not.toBeUndefined();
      });
  }));
});
