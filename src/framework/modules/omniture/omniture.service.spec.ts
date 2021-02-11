import { ConfigurationService } from './../core/services/configuration.service';
import { LoggerService } from './../core/services/logger.service';
import { TestBed } from '@angular/core/testing';

import { OmnitureService } from './omniture.service';
import { inject } from '@angular/core';
import { IOmniturePages, IOmnitureConfig, SiteType } from './omniture.model';

describe('OmnitureService', () => {
  beforeEach(() => {
    const fakeLoggerService = {
      log: (message: string) => {}
    };

    const Pages: IOmniturePages = {
      home: {
        pageName: 'appLanding',
        pageCategory: 'home',
        pageUid: 'coreframeworkhome',
        channel: 'ITS esfhome EXT',
        contentType: 'homepage',
        pageFirstPub: '10-01-2018',
        pageLastMod: '10-01-2018',
        siteSection: 'home',
        bussVPUnit: 'its',
        bussUnit: 'itsoc'
      }
    };

    const Config: IOmnitureConfig = {
      siteLanguage: 'en',
      siteCountry: '',
      siteEnv: 'dev',
      cmsType: 'java',
      bussVPUnit: 'its',
      bussUnit: 'itsoc',
      bussUserGroup: 'external',
      bussAgency: 'ibrd',
      siteType: 'esf search tool'
    };

    const fakeConfigurationService = {
      config: {
        omniture: {
          pageInfo: Pages,
          config: Config,
          siteType: SiteType.Extranet
        }
      }
    };
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        OmnitureService,
        { provide: LoggerService, useValue: fakeLoggerService },
        { provide: ConfigurationService, useValue: fakeConfigurationService }
      ]
    });
  });

  it('should be created', () => {
    const service: OmnitureService = TestBed.inject(OmnitureService);
    expect(service).toBeTruthy();
  });
  it('Test for sendDataToOmniture ', () => {
    const service: OmnitureService = TestBed.inject(OmnitureService);
    service.sendDataToOmniture(
      'home',
      false,
      {
        searchTerm: '',
        tab: '',
        searchType: '',
        searchResults: '',
        searchfilter: '',
        section: '',
        pagination: '',
        sortBy: ''
      },
      {
        upi: '',
        jobTitle: '',
        dept: '',
        coOrigin: '',
        officeLocation: '',
        vpuUnit: '',
        org: ''
      }
    );
    const returnvalue = service.sendDataToOmniture('menu1page1');
    expect(returnvalue).toBeUndefined();
  });
});
