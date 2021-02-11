import { waitForAsync, inject, TestBed } from '@angular/core/testing';
import { Header } from '../models/header.model';
import { FrameworkService } from './framework.service';
import { UserService } from './user.service';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Api } from './api.service';
import { UserPreferenceService } from './userpreference.service';
import { WidgetstoreService } from './widgetstore.service';
import { SitePreferenceService } from './sitepreference.service';
import { ConfigurationService } from './configuration.service';
import { AdalService } from './adal.service';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { mockStorageService as fakeLocalStorageService } from './storage.service.mock';
import { mockUserService as fakeUserService } from './user.service.mock';
import { mockApiService as fakeApi } from './api.service.mock';
import { mockUserPreferenceService as fakeUserPreferenceService } from './userpreference.service.mock';
import { mockWidgetstoreService as fakeWidgetstoreService } from './widgetstoreservices.mock';
import { mockSitePreferencesService as fakeSitePreferencesService } from './sitePreferences.mock';
import { mockConfigurationService as fakeConfigurationService } from './configuration.service.mock';
import { mockAdalService as fakeAdalService } from './adal.service.mock';
import { OmnitureService } from './../../omniture/omniture.service';
import { mockOmnitureService } from './../../omniture/omniture.service.mock';
import { AppInsightsService } from './app-insights.service';
import { mockAppInsightsService } from './app-insights.service.mock';
import { SplashscreenService } from './splashscreen.service';
import { mockSplashScreenService } from './splashscreen.service.mock';
import { filter } from 'rxjs/operators';
import { BreadcrumbItem } from '../models';
import { LeftNav } from '../models/leftNav.model';
import { ICapabilitySelected } from '../models/capability.model';
import { CacheService } from './cache.service';
export type Store = 'local' | 'session';
import { MsalService } from './../../../msal/msal.service';

@Component({ template: '' })
class TestComponent {}

describe('Framework Service', () => {
  const dummyComponent: Component = null;

  const mockMsalService = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'error',
            component: TestComponent
          },
          {
            path: 'page2',
            component: TestComponent
          }
        ]),
        HttpClientModule
      ],
      declarations: [TestComponent],
      providers: [
        FrameworkService,
        AppService,
        CacheService,
        { provide: UserService, useValue: fakeUserService },
        { provide: StorageService, useValue: fakeLocalStorageService },
        { provide: Api, useValue: fakeApi },
        { provide: UserPreferenceService, useValue: fakeUserPreferenceService },
        { provide: WidgetstoreService, useValue: fakeWidgetstoreService },
        {
          provide: SitePreferenceService,
          useValue: fakeSitePreferencesService
        },
        { provide: ConfigurationService, useValue: fakeConfigurationService },
        { provide: AdalService, useValue: fakeAdalService },
        { provide: OmnitureService, useValue: mockOmnitureService },
        { provide: AppInsightsService, useValue: mockAppInsightsService },
        { provide: SplashscreenService, useValue: mockSplashScreenService },
        { provide: MsalService, useValue: mockMsalService }
      ]
    });
  });

  it(
    `should be able to update the route information for left navigation menu`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, '__setleftNavRoute').and.callThrough();
        fwService.__setleftNavRoute({ page: 'menu1' });
        expect(fwService.__setleftNavRoute).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to update the route information for widget store page`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, '__setWidgetStoreRoute').and.callThrough();
        fwService.__setWidgetStoreRoute({ page: 'menu1' });
        expect(fwService.__setWidgetStoreRoute).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to make HTTP Get call`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiHttpGet').and.callThrough();
        fwService.apiHttpGet('https://www.worldbank.org', {});
        expect(fwService.apiHttpGet).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to make HTTP Post call`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiHttpPost').and.callThrough();
        fwService.apiHttpPost('https://www.worldbank.org', {}, {});
        expect(fwService.apiHttpPost).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to make HTTP Delete call`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiHttpDelete').and.callThrough();
        fwService.apiHttpDelete('https://www.worldbank.org', {});
        expect(fwService.apiHttpDelete).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to make HTTP Patch call`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiHttpPatch').and.callThrough();
        fwService.apiHttpPatch('https://www.worldbank.org', {}, {});
        expect(fwService.apiHttpPatch).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to make HTTP Put call`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiHttpPut').and.callThrough();
        fwService.apiHttpPut('https://www.worldbank.org', {}, {});
        expect(fwService.apiHttpPut).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able toggle header`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleHeader').and.callThrough();
        fwService.apiToggleHeader(true);
        fwService.apiToggleHeader(false);
        fwService.apiToggleHeader();
        expect(fwService.apiToggleHeader).toHaveBeenCalledTimes(3);
      })
    )
  );

  it(
    `should be able to set external user`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiSetExternalUser').and.callThrough();
        fwService.apiSetExternalUser({
          designation: '',
          location: '',
          name: '',
          upi: '',
          city: '',
          companyName: '',
          department: '',
          dept: '',
          phone: '',
          unit: '',
          vpuUnit: ''
        });
        expect(fwService.apiSetExternalUser).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to set header information`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiSetHeader');
        fwService.apiSetHeader({
          title: 'Operations Portal',
          addWidget: true,
          breadcrumb: [],
          adminLink: true,
          addPages: true,
          pageRefresh: true,
          resetWidget: true
        } as Header);
        expect(fwService.apiSetHeader).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to toggle site footer`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleFooter').and.callThrough();
        const returnValue = fwService.apiToggleFooter(true);
        expect(fwService.apiToggleFooter).toHaveBeenCalledTimes(1);
        expect(fwService.apiToggleFooter).toHaveBeenCalledWith(true);
        expect(true).toEqual(<any>returnValue instanceof FrameworkService);
      })
    )
  );

  it(
    `should be able to set the widget store route params`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        fwService.__setWidgetStoreRoute({ section: 'layout1' });
        const returnValue = fwService.__setWidgetStoreRoute({
          section: 'layout1'
        });
        expect(returnValue).toBeUndefined();
      })
    )
  );

  it(
    `should be able to retrieve header information`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        fwService.apiSetHeader({
          title: 'Sample Landing'
        });
        spyOn(fwService, 'apiGetHeader').and.callThrough();
        const headerInfo = fwService.apiGetHeader();
        expect(headerInfo.title).toBe('Sample Landing');
        expect(fwService.apiGetHeader).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to toggle left navigation`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleLeftNav').and.callThrough();
        fwService.apiToggleLeftNav(true);
        expect(fwService.apiToggleLeftNav).toHaveBeenCalledWith(true);
        expect(fwService.apiToggleLeftNav).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to set site context information`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        fwService.apiSetSiteContext({ section: 'page1' });
        const returnValue = fwService.apiSetSiteContext({ section: 'page1' });
        expect(true).toEqual(<any>returnValue instanceof FrameworkService);
      })
    )
  );

  it(
    `should be able to get the site context`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        fwService.apiSetSiteContext({ routeParams: 'units' });
        const routeParams = fwService.apiGetSiteContext('routeParams');
        expect(routeParams).toBe('units');
        const siteParams = fwService.apiGetSiteContext();
        expect(siteParams).toEqual({ routeParams: 'units' });
      })
    )
  );

  it(
    `should be able to set App Data`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        fwService.apiSetAppData('section', 'page1');
        const appData = fwService.apiGetAppData('section');
        expect(appData).toBe('page1');
      })
    )
  );

  it(
    `should be able to get App Data`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiGetAppData').and.callThrough();
        fwService.apiSetAppData('pageName', 'Dashboard');
        const returnValue = fwService.apiGetAppData('pageName');
        expect(returnValue).toEqual('Dashboard');
        expect(fwService.apiGetAppData).toHaveBeenCalledTimes(1);
        expect(fwService.apiGetAppData).toHaveBeenCalledWith('pageName');
      })
    )
  );

  it(
    `should be able to get external logged in user details`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiGetExternalUser').and.callThrough();
        fwService.apiGetExternalUser();
        expect(fwService.apiGetExternalUser).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to set data to localStorage`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiStorageSet').and.callThrough();
        fwService.apiStorageSet('userInfo', 'apiLS got it', 'session');
        fwService.apiStorageSet('userInfo', 'apiLS got it', 'local');
        fwService.apiStorageSet('userInfo', 'apiLS got it');
        expect(fwService.apiStorageSet).toHaveBeenCalledTimes(3);
      })
    )
  );

  it(
    `should be able to get data from localStorage`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiStorageGet').and.callThrough();
        fwService.apiStorageGet('page');
        fwService.apiStorageGet('page', 'local');
        fwService.apiStorageGet('page', 'session');
        expect(fwService.apiStorageGet).toHaveBeenCalledTimes(3);
      })
    )
  );

  it(
    `should be able fetch the logged in user email address`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiGetLoggedUserEmail').and.callThrough();
        const loggedInUser = fwService.apiGetLoggedUserEmail();
        expect(loggedInUser).toEqual('rchinnakampalli@worldbankgroup.org');
        expect(fwService.apiGetLoggedUserEmail).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to retrieve users`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiGetLoggedInUser').and.callThrough();
        fwService.apiGetLoggedInUser();
        expect(fwService.apiGetLoggedInUser).toHaveBeenCalledTimes(1);
        expect(fwService.apiGetLoggedInUser).toHaveBeenCalledWith();
      })
    )
  );

  it(
    `should be get a hook for reset page`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiPageResetHook$').and.callThrough();
        fwService.apiPageResetHook$();
        expect(fwService.apiPageResetHook$).toHaveBeenCalledTimes(1);
        expect(fwService.apiPageResetHook$).toHaveBeenCalledWith();
      })
    )
  );

  it(
    `should be able to retrieve the preferences stored for widget Id`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiGetUserWidgetPref').and.callThrough();
        fwService.apiGetUserWidgetPref('WID0011', 'layout1', true, 'CRM');
        expect(fwService.apiGetUserWidgetPref).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to update widget preferences`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiUpdateWidgetPreferences').and.callThrough();
        fwService.apiUpdateWidgetPreferences('WID0011', 'layout1', true, 'CRM');
        fwService.apiUpdateWidgetPreferences('WID0011', 'layout1', true, 'CRM', true);
        expect(fwService.apiUpdateWidgetPreferences).toHaveBeenCalledTimes(2);
      })
    )
  );

  it(
    `should be able to hide widgets`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiHideWidgets').and.callThrough();
        fwService.apiHideWidgets(['WID007']);
        expect(fwService.apiHideWidgets).toHaveBeenCalledTimes(1);
        expect(fwService.apiHideWidgets).toHaveBeenCalledWith(['WID007']);
      })
    )
  );

  it(
    `should be able to toggle left menu item`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleLeftMenuItem').and.callThrough();
        fwService.apiToggleLeftMenuItem('page1');
        fwService.apiToggleLeftMenuItem('menu1', true);
        expect(fwService.apiToggleLeftMenuItem).toHaveBeenCalledTimes(2);
        expect(fwService.apiToggleLeftMenuItem).toHaveBeenCalledWith('menu1', true);
      })
    )
  );

  it(
    `should be able to retrieve the left navigation model`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        fwService.apiSetLeftNavModel([
          {
            active: true,
            key: 'dashboard',
            page: '/dashboard',
            route: '/dashboard',
            text: 'Dashboard',
            managable: false,
            routeActive: false
          }
        ]);
        const returnValue = fwService.apiGetLeftNavModel();
        expect(returnValue[0]['key']).toEqual('dashboard');
        expect(returnValue).not.toBeUndefined();
        expect(returnValue.length).toEqual(1);
      })
    )
  );

  it(
    `should be able to update site title`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiUpdateSiteTitle').and.callThrough();
        fwService.apiUpdateSiteTitle('title');
        fwService.apiUpdateSiteTitle('World Bank', 'https://www.worldbank.org');
        expect(fwService.apiUpdateSiteTitle).toHaveBeenCalledTimes(2);
      })
    )
  );

  it(
    `should be able to navigate between the menu items`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiNavigateBack').and.callThrough();
        fwService.apiNavigateBack('item1');
        expect(fwService.apiNavigateBack).toHaveBeenCalledTimes(1);
        fwService.menuBack$.subscribe(item => {
          expect(item).toEqual('item1');
        });
      })
    )
  );

  it(
    `should be able to load the right trial dynamically`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiLoadRightNavDynamicPage').and.callThrough();
        fwService.apiLoadRightNavDynamicPage('mypage', dummyComponent, true);
        fwService.apiLoadRightNavDynamicPage('mypage', dummyComponent, false, {});
        fwService.apiLoadRightNavDynamicPage('mypage', dummyComponent, undefined, {});
        expect(fwService.apiLoadRightNavDynamicPage).toHaveBeenCalledTimes(3);
      })
    )
  );

  it(
    `should be able to toggle right trial bar`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleRightNav').and.callThrough();
        fwService.apiToggleRightNav();
        fwService.apiToggleRightNav(true);
        fwService.apiToggleRightNav(false);
        expect(fwService.apiToggleRightNav).toHaveBeenCalledTimes(3);
      })
    )
  );

  it(
    `should be able to toggle breadcrumb`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleBreadcrumb').and.callThrough();
        fwService.apiToggleBreadcrumb(false);
        fwService.apiToggleBreadcrumb(true);
        fwService.apiToggleBreadcrumb();
        expect(fwService.apiToggleBreadcrumb).toHaveBeenCalledTimes(3);
      })
    )
  );

  it(
    `should be able to get widget name`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiGetWidgetName').and.callThrough();
        fwService.apiGetWidgetName('WID007');
        expect(fwService.apiGetWidgetName).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to toggle site title`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleSiteTitle').and.callThrough();
        fwService.apiToggleSiteTitle(true);
        fwService.apiToggleSiteTitle(false);
        fwService.apiToggleSiteTitle();
        expect(fwService.apiToggleSiteTitle).toHaveBeenCalledWith(true);
        expect(fwService.apiToggleSiteTitle).toHaveBeenCalledTimes(3);
      })
    )
  );

  it(
    `should be able to redirect the users to no access page`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiRedirectToNoAccessPage').and.callThrough();
        fwService.apiRedirectToNoAccessPage('no access', true);
        expect(fwService.apiRedirectToNoAccessPage).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to retrive global App settings which are saved in preferences`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiGetGlobalAppSettings').and.callThrough();
        const pageName = fwService.apiGetGlobalAppSettings('pageName');
        expect(pageName).toEqual('Page 1');
      })
    )
  );

  it(
    `should be able to set global App setting which will be saved to user preferences`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiSetGlobalAppSettings').and.callThrough();
        fwService.apiSetGlobalAppSettings('page1', { pageName: 'Page 1' });
        fwService.apiSetGlobalAppSettings('page1', { pageName: 'Page 1' }, true);
        fwService.apiSetGlobalAppSettings('page1', { pageName: 'Page 1' }, false);
        expect(fwService.apiSetGlobalAppSettings).toHaveBeenCalledTimes(3);
      })
    )
  );

  it(
    `should be able to retrieve page configuration`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiHasPageLevelConfig').and.callThrough();
        const returnValue = fwService.apiHasPageLevelConfig('page1');
        fwService.apiHasPageLevelConfig(null);
        fwService.apiHasPageLevelConfig(undefined);
        expect(returnValue).toBeTruthy();
        expect(fwService.apiHasPageLevelConfig).toHaveBeenCalledTimes(3);
      })
    )
  );

  it(
    `should be able to toggle content loader`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleContentLoader').and.callThrough();
        fwService.apiToggleContentLoader(true);
        fwService.apiToggleContentLoader(false);
        fwService.apiToggleContentLoader();
        expect(fwService.apiToggleContentLoader).toHaveBeenCalledWith(true);
        expect(fwService.apiToggleContentLoader).toHaveBeenCalledWith(false);
        expect(fwService.apiToggleContentLoader).toHaveBeenCalledTimes(3);
      })
    )
  );

  it(
    `should be able to retrieve widget detials by passing widget Id`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        const widgetdetails = fwService.apiGetWidgetDetails('WID0011');
        expect(widgetdetails.widgetName).toEqual('Issue Log');
        expect(widgetdetails.widgetCategory).toEqual('CRM');
      })
    )
  );

  it(
    `should be able to get framework configuration`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiGetConfiguration').and.callThrough();
        const config = fwService.apiGetConfiguration();
        expect(config.appKey).toEqual('APP0023');
        expect(config).not.toBeUndefined();
        expect(fwService.apiGetConfiguration).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to set user information while EMS login is false`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        fwService.apiSetUserInfo({
          name: 'Sample Landing',
          upi: '540000',
          designation: 'false',
          location: 'false',
          phone: '98784548754'
        });
        const returnValue = fwService.apiSetUserInfo({
          name: 'Sample Landing',
          upi: '540000',
          designation: 'false',
          location: 'false',
          phone: '98784548754'
        });
        expect(true).toEqual(<any>returnValue instanceof FrameworkService);
      })
    )
  );

  it(
    `should be able to retrieve bearer token for a resource`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiAcquireToken').and.callThrough();
        fwService.apiAcquireToken('https://graph.windows.net').subscribe((token: string) => {
          expect(token).toBe('token12345');
          expect(fwService.apiAcquireToken).toHaveBeenCalledTimes(1);
          expect(fwService.apiAcquireToken).toHaveBeenCalledWith('https://graph.windows.net');
          expect(fwService.apiAcquireToken).not.toHaveBeenCalledWith('http://microsoft.com');
        });
      })
    )
  );

  it(
    `should be able to navigate to menu item`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiNavigateToMenuItem').and.callThrough();
        fwService.apiNavigateToMenuItem('page2', '/page2');
        expect(fwService.apiNavigateToMenuItem).toHaveBeenCalledTimes(1);
        expect(fwService.apiNavigateToMenuItem).toHaveBeenCalledWith('page2', '/page2');
      })
    )
  );

  it(
    `should be able to send information to Omniture analytics`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiSendDataToOmniture').and.callThrough();
        fwService.apiSendDataToOmniture('page1', false, {
          pagination: 'true',
          searchResults: '',
          searchTerm: '',
          searchType: '',
          searchfilter: '',
          section: '',
          sortBy: '',
          tab: ''
        });
        fwService.apiSendDataToOmniture('page1', true, {
          pagination: 'true',
          searchResults: '',
          searchTerm: '',
          searchType: '',
          searchfilter: '',
          section: '',
          sortBy: '',
          tab: ''
        });
        expect(fwService.apiSendDataToOmniture).toHaveBeenCalledTimes(2);
      })
    )
  );

  it(
    `should be able to check whether capability is enabled or not for the page`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiIsCapabilityAvailable').and.callThrough();
        fwService.apiIsCapabilityAvailable('page1');
        expect(fwService.apiIsCapabilityAvailable).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to update framework configuration`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiUpdateConfigItems').and.callThrough();
        fwService.apiUpdateConfigItems({ siteName: '', landingPageUrlPattern: '' });
        expect(fwService.apiUpdateConfigItems).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able get an event when platform is ready`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiPlatformReady').and.callThrough();
        fwService.apiPlatformReady();
        expect(fwService.apiPlatformReady).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to track page with App Insights API`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiTrackMyPageWithAppInsights').and.callThrough();
        fwService.apiTrackMyPageWithAppInsights('page1', 'https://www.worldbank.org/page1', '', '000527065');
        expect(fwService.apiTrackMyPageWithAppInsights).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to update the site preferences.. only for Units group!`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, '__apiSetDataToSitePreferences').and.callThrough();
        fwService.apiSetAppData('routeParams', { unit: 'itsdt' });
        fwService.__apiSetDataToSitePreferences('APP001', 'custom', {});
        expect(fwService.__apiSetDataToSitePreferences).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to retrieve the data from site preferences`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, '__apiGetDataFromSitePreferences').and.callThrough();
        fwService.__apiGetDataFromSitePreferences('custom');
        expect(fwService.__apiGetDataFromSitePreferences).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to emit an event after layout render complete`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiLayoutRenderComplete').and.callThrough();
        fwService.apiLayoutRenderComplete();
        expect(fwService.apiLayoutRenderComplete).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to show notification message`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiShowNotificationMessage').and.callThrough();
        fwService.apiShowNotificationMessage('system is down for maitenance');
        expect(fwService.apiShowNotificationMessage).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to log error message with App Insights`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiLogExceptionWithAppInsights').and.callThrough();
        fwService.apiLogExceptionWithAppInsights(new Error(), '00527065', {});
        fwService.apiLogExceptionWithAppInsights(new Error(), '00527065');
        expect(fwService.apiLogExceptionWithAppInsights).toHaveBeenCalledTimes(2);
      })
    )
  );

  it(
    `should be able to log error message with App Insights`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiLogExceptionWithAppInsights').and.callThrough();
        fwService.apiLogExceptionWithAppInsights(new Error(), '00527065', {});
        expect(fwService.apiLogExceptionWithAppInsights).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to set authenticated user context with App Insights`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiSetUserContextForAppInsights').and.callThrough();
        fwService.apiSetUserContextForAppInsights('000527065');
        expect(fwService.apiSetUserContextForAppInsights).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able hide widget with widgetID`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiHideWidget').and.callThrough();
        fwService.apiHideWidget('WID007');
        expect(fwService.apiHideWidget).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able show widget with widgetID`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiShowWidget').and.callThrough();
        fwService.apiShowWidget('WID007');
        expect(fwService.apiShowWidget).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able emit an event while the left menu is expanded or collapsed`,
    waitForAsync(
      inject([FrameworkService, AppService], (fwService: FrameworkService, appService: AppService) => {
        spyOn(fwService, 'apiLeftmenuToggled').and.callThrough();
        const subscription1 = fwService.apiLeftmenuToggled().subscribe((state: 'collapsed' | 'expanded') => {
          expect(fwService.apiLeftmenuToggled).toHaveBeenCalledTimes(1);
          expect(state).toEqual('expanded');
          subscription1.unsubscribe();
        });
        appService.leftNavstate$.next(true);

        appService.leftNavstate$.next(false);
        const subscription2 = fwService.apiLeftmenuToggled().subscribe((state: 'collapsed' | 'expanded') => {
          expect(state).toEqual('collapsed');
          subscription2.unsubscribe();
        });
      })
    )
  );

  it(
    `should be able emit an event when layout is changed`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiLayoutChanged').and.callThrough();
        fwService.apiLayoutChanged();
        expect(fwService.apiLayoutChanged).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able emit an event when layout is changed`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, '__apiGetRootUserSitePreferences').and.callThrough();
        fwService.__apiGetRootUserSitePreferences();
        expect(fwService.__apiGetRootUserSitePreferences).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to track events with App Insights`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiTrackEventWithAppInsights').and.callThrough();
        fwService.apiTrackEventWithAppInsights('Button_Click', {});
        fwService.apiTrackEventWithAppInsights('Button_Click');
        expect(fwService.apiTrackEventWithAppInsights).toHaveBeenCalledTimes(2);
      })
    )
  );
  it(
    `should be able to retrieve custom configuration from site preferences`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiGetCustomPreferences').and.callThrough();
        fwService.apiGetCustomPreferences();
        expect(fwService.apiGetCustomPreferences).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to toggle action menu`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiActionMenuToggle').and.callThrough();
        fwService.apiActionMenuToggle(true);
        fwService.apiActionMenuToggle(false);
        expect(fwService.apiActionMenuToggle).toHaveBeenCalledTimes(2);
      })
    )
  );

  it(
    `should be able emit an even which internal AppData variable is updated`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOnProperty(fwService, 'appDataChanged$').and.callThrough();
        const appData$ = fwService.appDataChanged$;
        fwService.apiSetAppData('routeParams', { unit: 'itsoc' });
        appData$.pipe(filter(data => data?.['routeParams'])).subscribe(data => {
          expect(data).not.toBeUndefined();
          expect(data['routeParams']).not.toBeUndefined();
          expect(data['routeParams']?.unit).toEqual('itsoc');
        });
      })
    )
  );

  it(
    `should be able save custom configuration at application level`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiSaveCustomConfig').and.callThrough();
        fwService.apiSaveCustomConfig({ label: 'Title' });
        expect(fwService.apiSaveCustomConfig).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to toggle header controls`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleHeaderControls').and.callThrough();
        fwService.apiToggleHeaderControls({
          actions: true,
          customIcon1: { class: '', label: '' },
          customIcon2: { class: '', label: '' },
          search: true,
          settings: true,
          user: false
        });
        expect(fwService.apiToggleHeaderControls).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to toggle Admin link on the header`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleAdminLink').and.callThrough();
        fwService.apiToggleAdminLink(true);
        fwService.apiToggleAdminLink(false);
        fwService.apiToggleAdminLink();
        expect(fwService.apiToggleAdminLink).toHaveBeenCalledTimes(3);
      })
    )
  );

  it(
    `should be able to retrieve logged in user email and UPI`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOnProperty(fwService, 'apiWhoIsLoggedIn').and.callThrough();
        const loggedInUser = fwService.apiWhoIsLoggedIn;

        loggedInUser.upi().then(upi => {
          expect(loggedInUser.email).toEqual('rchinnakampalli@worldbankgroup.org');
          expect(upi).toEqual('000527065');
        });
      })
    )
  );

  it(
    `should be able to emit an event on breadcrumb click (depreciated)`,
    waitForAsync(
      inject([FrameworkService, AppService], (fwService: FrameworkService, appService: AppService) => {
        spyOnProperty(fwService, 'breadcrumbClick$').and.callThrough();
        const bClick$ = fwService.breadcrumbClick$;
        bClick$.subscribe((breadcrumb: { item: BreadcrumbItem; queryParams: any; list: Array<BreadcrumbItem> }) => {
          expect(breadcrumb.item.label).toEqual('Home');
        });
        appService.breadCrumbClick$.next({ item: { label: 'Home', path: '/home' }, list: [], queryParams: {} });
      })
    )
  );

  it(
    `should be able to emit an event on breadcrumb click`,
    waitForAsync(
      inject([FrameworkService, AppService], (fwService: FrameworkService, appService: AppService) => {
        spyOnProperty(fwService, 'apiBreadcrumbClick$').and.callThrough();
        const bClick$ = fwService.apiBreadcrumbClick$;
        bClick$.subscribe((breadcrumb: { item: BreadcrumbItem; queryParams: any; list: Array<BreadcrumbItem> }) => {
          expect(breadcrumb.item.label).toEqual('Home');
        });
        appService.breadCrumbClick$.next({ item: { label: 'Home', path: '/home' }, list: [], queryParams: {} });
      })
    )
  );

  it(
    `should be able to emit an event once leftnav model ready`,
    waitForAsync(
      inject([FrameworkService, AppService], (fwService: FrameworkService, appService: AppService) => {
        spyOn(fwService, 'apiLeftNavModelReady').and.callThrough();

        appService.leftNavModelReady$.next([
          {
            active: true,
            key: 'dashboard',
            page: '/dashboard',
            route: '/dashboard',
            text: 'Dashboard',
            managable: false,
            routeActive: false
          }
        ]);
        fwService.apiLeftNavModelReady().subscribe((leftNav: Array<LeftNav>) => {
          expect(leftNav[0].text).toEqual('Dashboard');
        });
      })
    )
  );

  it(
    `should be able to toggle state of the left menu - collpased or expanded`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleLeftMenuState').and.callThrough();
        fwService.apiToggleLeftMenuState(true);
        fwService.apiToggleLeftMenuState(false);
        expect(fwService.apiToggleLeftMenuState).toHaveBeenCalledTimes(2);
      })
    )
  );

  it(
    `should be able to toggle App header`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleAppHeader').and.callThrough();
        fwService.apiToggleAppHeader(true);
        fwService.apiToggleAppHeader(false);
        expect(fwService.apiToggleAppHeader).toHaveBeenCalledTimes(2);
      })
    )
  );

  it(
    `should be able to toggle App header`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleAppHeader').and.callThrough();
        fwService.apiToggleAppHeader(true);
        fwService.apiToggleAppHeader(false);
        expect(fwService.apiToggleAppHeader).toHaveBeenCalledTimes(2);
      })
    )
  );

  it(
    `should be able to emit an event when route params are available`,
    waitForAsync(
      inject([FrameworkService, AppService], (fwService: FrameworkService, appService: AppService) => {
        spyOn(fwService, 'apiRouteParams$').and.callThrough();

        appService.routeParams$.next({
          unit: 'itsoc'
        });
        fwService.apiRouteParams$().subscribe((routeParams: { [key: string]: string }) => {
          expect(routeParams.unit).toEqual('itsoc');
        });
      })
    )
  );

  it(
    `should be able to emit an event when capability (left nav menu item) is selected`,
    waitForAsync(
      inject([FrameworkService, AppService], (fwService: FrameworkService, appService: AppService) => {
        spyOn(fwService, 'apiSelectedCapability$').and.callThrough();

        appService.selectedCapability$.next({
          key: 'dashboard',
          siteId: 'AP001',
          siteName: 'Units'
        });
        fwService.apiSelectedCapability$().subscribe((capability: ICapabilitySelected) => {
          expect(capability.siteName).toEqual('Units');
        });
      })
    )
  );

  it(
    `should be able to toggle splashscreen`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleSplashScreen').and.callThrough();
        fwService.apiToggleSplashScreen(true);
        fwService.apiToggleSplashScreen(false);
        fwService.apiToggleSplashScreen();
        expect(fwService.apiToggleSplashScreen).toHaveBeenCalledTimes(3);
      })
    )
  );

  it(
    `should be able to get the App Insights instance`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiGetAppInsightInstance').and.callThrough();
        const appInsightsInstance = fwService.apiGetAppInsightInstance();
        expect(appInsightsInstance).not.toBeUndefined();
        expect(fwService.apiGetAppInsightInstance).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to emit an event when left nav model is updated`,
    waitForAsync(
      inject([FrameworkService, AppService], (fwService: FrameworkService, appService: AppService) => {
        spyOn(fwService, 'apiLeftNavModelUpdated').and.callThrough();

        appService.leftNavUpdated$.next([
          {
            active: true,
            key: 'dashboard',
            page: '/dashboard',
            route: '/dashboard',
            text: 'Dashboard',
            managable: false,
            routeActive: false
          }
        ]);
        fwService.apiLeftNavModelUpdated().subscribe((leftNav: Array<LeftNav>) => {
          expect(leftNav[0].text).toEqual('Dashboard');
        });
      })
    )
  );

  it(
    `should be able to toggle site info section of the page`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiToggleSiteInfo').and.callThrough();
        fwService.apiToggleSiteInfo(true);
        fwService.apiToggleSiteInfo(false);
        expect(fwService.apiToggleSiteInfo).toHaveBeenCalledTimes(2);
      })
    )
  );

  it(
    `should be able to redirect the users to error page`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiRedirectToErrorPage').and.callThrough();
        fwService.apiRedirectToErrorPage('no access', true);
        expect(fwService.apiRedirectToErrorPage).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to signout of MS ADAL login`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiLogout').and.callThrough();
        fwService.apiLogout();
        expect(fwService.apiLogout).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to get the current state of site, widget & user preferences`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiGetPreferenceState').and.callThrough();
        fwService.apiGetPreferenceState();
        expect(fwService.apiGetPreferenceState).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to emit an event before layout renders starts`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiBeforeStartLayout').and.callThrough();
        fwService.apiBeforeStartLayout();
        expect(fwService.apiBeforeStartLayout).toHaveBeenCalledTimes(1);
      })
    )
  );

  it(
    `should be able to hide an leftnav menu item with ability to animate on show / hide`,
    waitForAsync(
      inject([FrameworkService], (fwService: FrameworkService) => {
        spyOn(fwService, 'apiShowHideMenuItemOnKey').and.callThrough();
        fwService.apiShowHideMenuItemOnKey({
          key: 'page3',
          blink: true,
          state: false
        });
        fwService.apiShowHideMenuItemOnKey({
          key: 'page3'
        });
        expect(fwService.apiShowHideMenuItemOnKey).toHaveBeenCalledTimes(2);
      })
    )
  );

  it(
    `should be able to emit an event on click of custom icons on the header`,
    waitForAsync(
      inject([FrameworkService, AppService], (fwService: FrameworkService, appService: AppService) => {
        spyOn(fwService, 'apiCustomIconClickHandler').and.callThrough();
        fwService.apiCustomIconClickHandler().subscribe((icon: 'ICON1' | 'ICON2') => {
          expect(icon).toEqual('ICON1');
          expect(fwService.apiCustomIconClickHandler).toHaveBeenCalledTimes(1);
        });
        appService.customHeaderIconClick$.next('ICON1');
      })
    )
  );

  it(
    `should be able to emit an event on user preference update`,
    waitForAsync(
      inject([FrameworkService, AppService], (fwService: FrameworkService, appService: AppService) => {
        spyOn(fwService, 'apiWatchUserPref').and.callThrough();
        fwService.apiWatchUserPref().subscribe((pref: { [key: string]: any }) => {
          expect(pref.theme).toEqual('cf-theme1');
          expect(fwService.apiWatchUserPref).toHaveBeenCalledTimes(1);
        });
        appService.userPreferenceUpdated$.next({ theme: 'cf-theme1' });
      })
    )
  );
});
