import { FrameworkService } from './../../../core/services/framework.service';
import { UserService } from './../../../core/services/user.service';
import { NO_ERRORS_SCHEMA, Component, inject } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from './../../../core/services/app.service';
import { ConfigurationService } from './../../../core/services/configuration.service';
import { LoggerService } from './../../../core/services/logger.service';
import { SitePreferenceService } from './../../../core/services/sitepreference.service';
import { UserPreferenceService } from './../../../core/services/userpreference.service';
import { WidgetstoreService } from './../../../core/services/widgetstore.service';
import { LayoutComponent } from './layout.component';
import { ActivatedRoute } from '@angular/router';
import { ShowHeader } from './../../../core/models/header.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { _ } from './../../../../lodash';

xdescribe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let userService: UserPreferenceService;

  beforeEach(
    waitForAsync(() => {
      const fakeAppService = {
        toggleLeftNav: (toggle: boolean) => of({}),
        toggleHeader: (sHeader: ShowHeader) => of({}),
        setAppData: (key, value) => of({}),
        setWidgetStoreRoute: value => of({}),
        toggleSearchInHeader: (status: boolean) => of({}),
        toggleControlSettings: (status: boolean) => of({}),
        hideWidgets$: of(['WID007', 'WID0011']),
        pageRefresh$: of({}),
        setHeader: () => of({}),
        __getLeftNavModel: () => {
          const data = [
            {
              key: 'L1',
              route: '/layout1',
              active: true,
              text: 'Productivity',
              page: 'layout1',
              managable: false
            },
            {
              key: 'L2',
              route: '/page1',
              active: true,
              text: 'Communications',
              managable: false,
              page: 'page1'
            },
            {
              key: 'L3',
              route: '/page2',
              text: 'News',
              page: 'page2',
              active: false,
              managable: true,
              category: 'Production'
            }
          ];
          return data;
        }
      };
      const dragaData = {};
      dragaData['source'] = { dataset: { panel: 'L1P1' } };
      dragaData['target'] = { dataset: { panel: 'L1P1' } };
      dragaData['sourceModel'] = ['WID0011'];
      dragaData['targetModel'] = ['WID007'];
      const fakeDragulaService = {
        dropModel: () => of(dragaData),
        createGroup: () => {},
        destroy: () => {}
      };
      const fakeWidgetstoreService = {
        resetLayout$: of({}),
        getwidgetdetails: key => {
          return {
            wsmsqlid: 7,
            widgetCategory: 'Graph API',
            isWidDisable: false,
            ismobiledisabled: true,
            widgetKey: 'WID007',
            widgetName: 'Teams'
          };
        }
      };
      const fakeSitePreferenceService = {
        hasBanner: (section: string) => {
          return true;
        },
        isLayoutDraggable: (section: string) => {},
        getLayout: (tab: string) => {
          return 'L1';
        },
        getPageWidgets: (page: string, panel?: string) => {
          return ['WID006'];
        },
        getPanelConfig: (tab: string) => {
          return {};
        },
        getPageName: (tab: string) => {
          return 'page1';
        },
        hasManagePage: () => {
          return true;
        },
        isWidgetStoreRequired: () => {
          return true;
        },
        isUserPreferenceRequired: () => {
          return true;
        },
        hasPageRefreshEnabledForThisPage: () => {}
      };
      const fakeUserPreferenceService = {
        getPageWidgets: (page: string, panel?: string) => {
          return ['WID006'];
        },
        setPageWidgets: () => {},
        widgetRemoved$: of({ panel: 'L1P1', widgetPos: 0 }),
        savePreferences: of({}),
        setPageDefaults: (page: string, save?: boolean) => {}
      };
      const fakeConfigurationService = {
        config: {
          adalConfig: {
            clientId: '12345'
          },
          pageBanners: { page1: 'banner' },
          widgets: {
            WID0011: {
              COMPONENT: {}
            }
          },
          appConfig: {
            emsLoginEnabled: true
          },
          eumAppId: 'CoreFramework'
        }
      };
      const fakeUserService = {
        getLoggedUserEmail: () => {},
        getLoggedInUser: () => of({})
      };
      const fakeFrameworkService = {
        apiPageRefreshHook: of({}),
        apiGetExternalUser: () => {
          return '000527065';
        }
      };

      const fakeLoggerService = {
        log: () => {}
      };
      const fakeActivatedRoute = {
        snapshot: {
          params: { section: 'page1' }
        },
        params: () => of({}),
        data: () => of({})
      };

      TestBed.configureTestingModule({
        imports: [RouterTestingModule, HttpClientTestingModule],
        declarations: [LayoutComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: AppService, useValue: fakeAppService },
          { provide: WidgetstoreService, useValue: fakeWidgetstoreService },
          { provide: SitePreferenceService, useValue: fakeSitePreferenceService },
          { provide: UserPreferenceService, useValue: fakeUserPreferenceService },
          { provide: ConfigurationService, useValue: fakeConfigurationService },
          { provide: LoggerService, useValue: fakeLoggerService },
          { provide: ActivatedRoute, useValue: fakeActivatedRoute },
          { provide: UserService, useValue: fakeUserService },
          { provide: FrameworkService, useValue: fakeFrameworkService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(
    waitForAsync(() => {
      fixture = TestBed.createComponent(LayoutComponent);
      component = fixture.componentInstance;
      component.pageConfig = {
        panels: ['L1P1', 'L1P2'],
        panelConfig: {
          L1P1: { css: 'col-md', widgets: ['WID0011'] },
          L1P2: { css: 'col-md-auto' }
        }
      };
      component.currentTab = 'page1';
      fixture.detectChanges();
      userService = TestBed.inject(UserPreferenceService);
    })
  );

  it(
    'should create',
    waitForAsync(() => {
      expect(component).toBeTruthy();
    })
  );

  it('ngOnInit should not return any value', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });

  it(
    'should invoke addToWidgetIdContainer',
    waitForAsync(() => {
      const widgets: Array<string> = ['WID0011'];
      component.addToWidgetIdContainer(widgets);
      expect(component.widgetIds.length).toBe(1);
    })
  );

  it('should invoke _updatePageConfig without spy', () => {
    component._updatePageConfig(component.pageConfig);
    const returnValue = component._updatePageConfig(component.pageConfig);
    expect(returnValue).toBeUndefined();
  });

  it('should called _updatePageConfig with spy', () => {
    spyOn(component, '_updatePageConfig');
    component._updatePageConfig(component.pageConfig);
    expect(component._updatePageConfig).toHaveBeenCalled();
  });

  xit('should invoke filterHiddenWidgetsFromPanels without spy', () => {
    component.filterHiddenWidgetsFromPanels([], component.pageConfig);
    component.filterHiddenWidgetsFromPanels([], component.pageConfig);
    // expect(returnValue).toBeUndefined();
  });

  it('should called filterHiddenWidgetsFromPanels with spy', () => {
    spyOn(component, 'filterHiddenWidgetsFromPanels');
    component.filterHiddenWidgetsFromPanels([], component.pageConfig);
    expect(component.filterHiddenWidgetsFromPanels).toHaveBeenCalled();
  });

  it('should invoke addToWidgetIdContainer without spy', () => {
    component.addToWidgetIdContainer([]);
    const returnValue = component.addToWidgetIdContainer([]);
    expect(returnValue).toBeUndefined();
  });

  it('should called addToWidgetIdContainer with spy', () => {
    spyOn(component, 'addToWidgetIdContainer');
    component.addToWidgetIdContainer([]);
    expect(component.addToWidgetIdContainer).toHaveBeenCalled();
  });

  it('should called filterValidWidgets', () => {
    component.filterValidWidgets(['WID0011']);
    const returnvalue = component.filterValidWidgets(['WID0011']);
    expect(returnvalue.length).toEqual(1);
  });

  it('should called addToWidgetIdContainer', () => {
    component.addToWidgetIdContainer(['WID0011']);
    expect(component.addToWidgetIdContainer(['WID0011'])).toBeUndefined();
  });

  it('should called setHeader', () => {
    component.header = undefined;
    component.setHeader();
    expect(component.setHeader()).toBeUndefined();
  });

  it('should called updatePageWidgets', () => {
    component.updatePageWidgets();
    expect(component.updatePageWidgets()).toBeUndefined();
  });

  it('should called widgetRendered', () => {
    component.widgetRendered('WID0011');
    expect(component.widgetRendered('WID0011')).toBeUndefined();
  });

  it('should called initWidgetSubscriptions', () => {
    component.initWidgetSubscriptions();
    expect(component.initWidgetSubscriptions()).toBeUndefined();
  });

  it('should called resetLayoutSubscription', () => {
    spyOn(component, 'resetLayoutSubscription');
    component.resetLayoutSubscription();
    expect(component.resetLayoutSubscription).toHaveBeenCalled();
  });

  it('should called removeWidgetSubscription', () => {
    component.removeWidgetSubscription();
    expect(component.removeWidgetSubscription()).toBeUndefined();
  });
});
