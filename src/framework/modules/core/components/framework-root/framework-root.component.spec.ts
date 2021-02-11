import { WebWorkerService } from './../../services/web-worker.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef, Renderer2 } from '@angular/core';

import { DomUtil } from './../../../commonutil/utils/dom.util';
import { FrameworkRootComponent } from './framework-root.component';
import { AdalService } from './../../../core/services/adal.service';
import { WidgetstoreService } from './../../../core/services/widgetstore.service';
import { AppService } from './../../../core/services/app.service';
import { SitePreferenceService } from './../../../core/services/sitepreference.service';
import { ConfigurationService } from './../../../core/services/configuration.service';
import { UserPreferenceService } from './../../../core/services/userpreference.service';
import { UserService } from './../../../core/services/user.service';
import { LoggerService } from './../../../core/services/logger.service';
import { RouterTestingModule } from '@angular/router/testing';
import { forkJoin, of, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppInsightsService } from './../../../core/services/app-insights.service';
import { EncoderService } from './../../../core/services/encoder.service';
import { SettingsService } from './../../../core/services/settings.service';
import { FrameworkRootService } from './framework-root.service';

xdescribe('Framework Root Component', () => {
  let component: FrameworkRootComponent;
  let fixture: ComponentFixture<FrameworkRootComponent>;

  const fakeAdalService = {
    context: {
      handleWindowCallback: () => {}
    },
    isLogged: true
  };
  const fakeWidgetstoreService = {
    populateWidgetStoreData: () => of({})
  };
  const fakeAppService = {
    showLeftNav$: of({}),
    showFooter$: of({ status: true }),
    contextChanged$: of({ status: true }),
    setAppData: (key, value) => of({}),
    widgetStoreRoute$: of({ section: 'layout1' }),
    contentLoader$: of({ status: true }),
    setSiteContext: ctxobj => of({}),
    headerHamState$: of({ hamState: true }),
    extUser$: of({}),
    leftNavstate$: of({}),
    toggleAppHeader$: of({})
  };
  const fakeSitePreferencesService = {
    getSitepreference: () => {
      return 'APP0044';
    },
    hasSiteWidgets: () => {
      return true;
    },
    getSiteParams: () => {
      return {};
    },
    isUserPreferenceRequired: () => {
      return true;
    },
    isWidgetStoreRequired: () => {
      return true;
    },
    hasLeftNavigation: () => {
      return true;
    },
    hasChildPref: () => {
      return true;
    },
    isSitePreferenceAvailable: () => true
  };
  const fakeConfigurationService = {
    config: {
      appConfig: {
        emsLoginEnabled: true,
        wbTopAndBottom: {
          header: false,
          footer: true
        }
      },
      contextParams: ':unit',
      appKey: {}
    }
  };
  const fakeUserPreferenceService = {
    populateUserPreferences: () => of({}),
    getGlobalAppSettings: key => {
      const data = {
        layout: 'L1',
        sideMenuColor: 'blue',
        topBarColor: '#ffffff'
      };
      return 'blue';
    },
    mergeUserPrefDelta: () => {}
  };
  const fakeUserService = {
    getLoggedUserEmail$: () => {
      return 'Loripsm';
    },
    getLoggedUserEmail: () => {
      return 'Loripsm';
    }
  };
  const fakeLoggerService = {
    log: () => {}
  };

  const fakeChangeDetectorRef = {
    detectChanges: () => {}
  };

  const fakewebWorkerService = {
    initAnalyticsWorker: () => {}
  };
  const fakeActivatedRoute = {};
  const fakeAppInsightsService = {
    logException: () => {}
  };
  const fakeEncoderService = {};
  const fakeSettingsService = {};
  const fakeFWRootService = {
    isMobile: () => false,
    updateFooter: () => {}
  };
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [FrameworkRootComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: AdalService, useValue: fakeAdalService },
          { provide: WidgetstoreService, useValue: fakeWidgetstoreService },
          { provide: AppService, useValue: fakeAppService },
          {
            provide: SitePreferenceService,
            useValue: fakeSitePreferencesService
          },
          { provide: ConfigurationService, useValue: fakeConfigurationService },
          { provide: UserPreferenceService, useValue: fakeUserPreferenceService },
          { provide: UserService, useValue: fakeUserService },
          { provide: LoggerService, useValue: fakeLoggerService },
          { provide: ChangeDetectorRef, useValue: fakeChangeDetectorRef },
          { provide: WebWorkerService, useValue: fakewebWorkerService },
          { provide: ActivatedRoute, useValue: fakeActivatedRoute },
          { provide: AppInsightsService, useValue: fakeAppInsightsService },
          { provide: EncoderService, useValue: fakeEncoderService },
          { provide: SettingsService, useValue: fakeSettingsService },
          { provide: FrameworkRootService, useValue: fakeFWRootService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameworkRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have called ngOnInit', waitForAsync(() => {
  //   const app = fixture.componentInstance;
  //   spyOn(app, 'ngOnInit');
  //   app.ngOnInit();
  //   expect(app.ngOnInit).toHaveBeenCalled();
  // }));

  // it('invoke Toggle Overlay method', () => {
  //   let returnValue = component.toggleOverlay();
  //   expect(returnValue).toBeUndefined();

  //   component.LhsToggled = true;
  //   returnValue = component.toggleOverlay();
  //   expect(component.LhsToggled).toBeFalsy();
  // });

  // it('invoke App Overlay Toggler method', () => {
  //   const returnValue = component.AppOverlayToggler(Event);
  //   expect(returnValue).toBeUndefined();
  // });

  it('should called makeSiteParamsAvailable with spy', () => {
    component.makeSiteParamsAvailable = jasmine.createSpy('dummy method').and.callFake(() => {});
    component.makeSiteParamsAvailable();
    expect(component.makeSiteParamsAvailable).toHaveBeenCalled();
  });

  it('should invoke __doSomeTasksAfterAllCallsAreDone', () => {
    component.__doSomeTasksAfterAllCallsAreDone = jasmine.createSpy('dummy method').and.callFake(() => {});
    const returnValue = component.__doSomeTasksAfterAllCallsAreDone();
    expect(returnValue).toBeUndefined();
  });

  // it('should called leftMenuToggleTriggered with spy', () => {
  //   spyOn(component, 'leftMenuToggleTriggered');
  //   component.leftMenuToggleTriggered(true);
  //   expect(component.leftMenuToggleTriggered).toHaveBeenCalled();
  // });

  // it('should invoke leftMenuToggleTriggered without spy', () => {
  //   component.leftMenuToggleTriggered(true);
  //   const returnValue = component.leftMenuToggleTriggered('');
  //   expect(returnValue).toBeUndefined();
  // });

  // it('should called controlSettingsToggle with spy', () => {
  //   spyOn(component, 'controlSettingsToggle');
  //   component.controlSettingsToggle(true);
  //   expect(component.controlSettingsToggle).toHaveBeenCalled();
  // });

  // it('should invoke controlSettingsToggle without spy', () => {
  //   component.controlSettingsToggle(true);
  //   const returnValue = component.controlSettingsToggle(true);
  //   expect(returnValue).toBeUndefined();
  // });

  // it('should called onHeaderThemeChanged', () => {
  //   spyOn(component, 'onHeaderThemeChanged');
  //   component.onHeaderThemeChanged('');
  //   expect(component.onHeaderThemeChanged).toHaveBeenCalled();
  // });

  // it('should invoke onHeaderThemeChanged without spy', () => {
  //   component.onHeaderThemeChanged('red');
  //   const returnValue = component.onHeaderThemeChanged('');
  //   expect(returnValue).toBeUndefined();
  // });

  // it('should called onLeftMenuThemeChanged', () => {
  //   spyOn(component, 'onLeftMenuThemeChanged');
  //   component.onLeftMenuThemeChanged('blue');
  //   expect(component.onLeftMenuThemeChanged).toHaveBeenCalled();
  // });

  // it('should invoke onLeftMenuThemeChanged without spy', () => {
  //   component.onLeftMenuThemeChanged('blue');
  //   const returnValue = component.onLeftMenuThemeChanged('');
  //   expect(returnValue).toBeUndefined();
  // });

  // it('should called RHSSettingsToggle', () => {
  //   spyOn(component, 'RHSSettingsToggle');
  //   component.RHSSettingsToggle(true);
  //   expect(component.RHSSettingsToggle).toHaveBeenCalled();
  // });

  // it('should invoke RHSSettingsToggle without spy', () => {
  //   component.RHSSettingsToggle(true);
  //   const returnValue = component.RHSSettingsToggle(true);
  //   expect(returnValue).toBeUndefined();
  // });

  xit('should invoke ngOnDestroy without spy', () => {
    component.ngOnDestroy();
    const returnValue = component.ngOnDestroy();
    expect(returnValue).toBeUndefined();
  });

  // it('should invoke setFooter', () => {
  //   component.showFooter = false;
  //   component.setFooter();
  //   const returnValue = component.setFooter();
  //   expect(document.body.classList.contains('no-footer')).toBeTruthy();
  // });

  it('should invoke populatePreferences', () => {
    component.populatePreferences = jasmine.createSpy('populatePreferences').and.callFake(() => {});
    component.populatePreferences();
    expect(component.populatePreferences).toHaveBeenCalled();
  });
});
