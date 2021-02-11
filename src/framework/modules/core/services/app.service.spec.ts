import { inject, TestBed, waitForAsync } from '@angular/core/testing';

import { LeftNav } from '../models';
import { Header } from '../models/header.model';
import { AppService } from './app.service';
import { ConfigurationService } from './configuration.service';
import { mockConfigurationService } from './configuration.service.mock';
import { UserService } from './user.service';
import { mockUserService } from './user.service.mock';

describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AppService,
        { provide: UserService, useValue: mockUserService },
        { provide: ConfigurationService, useValue: mockConfigurationService }
      ]
    });
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

  it(
    `should contain 'header$' and on subscribe will have default values`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        expect(appService.setHeader).toBeDefined();
        appService.header$.subscribe(header => {
          expect(header.title).toEqual('');
          expect(header.addWidget).toBeTruthy();
          expect(header.breadcrumb).toEqual([]);
          expect(header.adminLink).toEqual(true);
          expect(header.addPages).toEqual(true);
          expect(header.pageConfigComponent).toEqual(null);
          expect(header.pageRefresh).toEqual(true);
          expect(header.userInfo).toEqual(true);
        });
      })
    )
  );

  it(
    `should contain setHeader method`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        appService.setHeader({
          title: 'Operations Portal',
          addWidget: true,
          breadcrumb: [{ label: 'Home', path: '/' }]
        } as Header);

        appService.header$.subscribe(header => {
          expect(header.title).toEqual('Operations Portal');
          expect(header.addWidget).toBeTruthy();
          expect(header.breadcrumb).toEqual([{ label: 'Home', path: '/' }]);
          expect(header.adminLink).toEqual(true);
        });
      })
    )
  );

  it(
    `should contain getHeader method and should be defined`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        expect(appService.getHeader).toBeDefined();
      })
    )
  );

  it(
    `should contain getHeader method and should retrieve the values set via setHeader method`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        appService.setHeader({
          title: 'Operations Portal',
          addWidget: true,
          breadcrumb: [{ label: 'Home', path: '/' }]
        } as Header);

        expect(appService.getHeader).toBeDefined();
        const header = appService.getHeader();

        expect(header.title).toEqual('Operations Portal');
        expect(header.addWidget).toEqual(true);
        expect(header.pageRefresh).toEqual(true);
      })
    )
  );

  it(
    `should return default model values when getHeader method is invoked`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        const headerModel = appService.getHeader();
        expect(headerModel).not.toBeNull();
        expect(headerModel.title).toEqual('');
        expect(headerModel.addWidget).toBeTruthy();
        expect(headerModel.breadcrumb).toEqual([]);
        expect(headerModel.adminLink).toEqual(true);
      })
    )
  );

  it(
    `should return the updated model values when header is changed`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        appService.setHeader({
          title: 'Operations Portal',
          addWidget: true,
          breadcrumb: [{ label: 'Home', path: '/' }]
        } as Header);
        const headerModel = appService.getHeader();
        expect(headerModel.title).toEqual('Operations Portal');
        expect(headerModel.addWidget).toBeTruthy();
        expect(headerModel.breadcrumb).toEqual([{ label: 'Home', path: '/' }]);
        expect(headerModel.adminLink).toEqual(true);
      })
    )
  );

  it(
    `should contain setSiteContext method and to be defined`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        expect(appService.setSiteContext).toBeDefined();
      })
    )
  );

  it(
    `should update the siteContext private variable`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        appService.setSiteContext({ section: 'menu1' });

        let siteContext = appService.getSiteContext('section');
        expect(siteContext).toEqual('menu1');

        // Spec for property which doesn't exist on the siteContext!
        siteContext = appService.getSiteContext('title');
        expect(siteContext).toBeUndefined();

        siteContext = appService.getSiteContext();
        expect(siteContext).toEqual({ section: 'menu1' });

        appService.setSiteContext({ title: 'Core Framework' });
        siteContext = appService.getSiteContext();
        expect(siteContext).toEqual({ section: 'menu1', title: 'Core Framework' });
      })
    )
  );

  it(
    `should contain getSiteContext method`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        expect(appService.getSiteContext).toBeDefined();
      })
    )
  );

  it(
    `should contain setAppData method`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        expect(appService.setAppData).toBeDefined();
      })
    )
  );

  it(
    `should update the internal variable to store the data`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        appService.setAppData('company', 'World Bank');
        const company = appService.getAppData('company');
        expect(company).toEqual('World Bank');
      })
    )
  );

  it(
    `should update the internal variable and emit the data to appDataChanged$ observable`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        appService.setAppData('company', 'World Bank');
        appService.appDataChanged$.subscribe(data => {
          expect(data.company).toEqual('World Bank');
          expect(data.title).toBeUndefined();
        });
      })
    )
  );

  it(
    `should contain getAppData method`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        expect(appService.getAppData).toBeDefined();
        appService.setAppData('unit', 'itsdt');
        const unit = appService.getAppData('unit');
        expect(unit).toEqual('itsdt');
        const appData = appService.getAppData();
        expect(appData).toEqual({ unit: 'itsdt' });
      })
    )
  );

  it(
    `should contain getLeftNavModel method`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        expect(appService.getLeftNavModel).toBeDefined();
      })
    )
  );

  it(
    `should return empty array as default value`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        const leftNavModel = appService.getLeftNavModel();
        expect(leftNavModel).toEqual([]);
      })
    )
  );

  it(
    `should contain setLeftNavModel method`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        expect(appService.setLeftNavModel).toBeDefined();
      })
    )
  );

  it(
    `should update the internal variable with the data`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        const leftNavModel = appService.getLeftNavModel();
        appService.setLeftNavModel(leftNavModel);
        expect(leftNavModel.length).toEqual(0);
      })
    )
  );

  it(
    `should contain setLeftNavModel method`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        expect(appService.setLeftNavModel).toBeDefined();
      })
    )
  );

  it(
    `should contain populateTheLeftNavModel method`,
    waitForAsync(
      inject([AppService], (appService: AppService) => {
        expect(appService.populateTheLeftNavModel).toBeDefined();
        appService.populateTheLeftNavModel([]);
        appService.leftNavUpdated$.subscribe((leftNav: LeftNav[]) => {
          expect(leftNav).toEqual([]);
        });
      })
    )
  );
});
