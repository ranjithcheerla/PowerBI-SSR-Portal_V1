import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { KeysPipe } from '../../../commonutil/pipes/keys.pipe';

import { UserService } from '../../services/user.service';
import { WidgetstoreService } from '../../services/widgetstore.service';
import { Api } from '../../services/api.service';
import { AppService } from '../../services/app.service';
import { ConfigurationService } from '../../services/configuration.service';
import { LoggerService } from '../../services/logger.service';
import { SitePreferenceService } from '../../services/sitepreference.service';
import { UserPreferenceService } from '../../services/userpreference.service';
import { InPageStoreComponent } from './in-page-store.component';

import { Header } from '../../models/header.model';
import { Params, ActivatedRoute } from '@angular/router';
import { FrameworkService } from '../../services/framework.service';
import { ToastrService } from 'ngx-toastr';
import { DynamicIoModule } from 'ng-dynamic-component';

xdescribe('InPageStoreComponent', () => {
  let component: InPageStoreComponent;
  let fixture: ComponentFixture<InPageStoreComponent>;

  beforeEach(
    waitForAsync(() => {
      const fakeConfigurationService = {
        config: {
          widgetCategories: {}
        }
      };
      const fakeAppService = {
        setHeader: (header: Header) => {},
        setAppData: (key: string, value: any) => {},
        setleftNavRoute: (params: Params) => {},
        setWidgetStoreRoute: (params: Params) => {}
      };
      const fakeWidgetstoreService = {
        getWidgetDefaultPosition: (widgetKey, activeSection) => {},
        getwidgetdetails: WID007 => {
          return { isWidMultiple: true };
        }
      };
      const fakeApi = {};
      const fakeUserService = {};
      const fakeUserPreferenceService = {
        getPageWidgets: (page: string, panel?: string) => {},
        addWidget: (activeSection, wkey, widgetPosition) => {
          return 'data';
        }
      };
      const fakeSitePreferenceService = {
        getleftNavPattern: () => {
          return ':section/:projectid';
        },
        getPageName: () => {
          return 'page 1';
        },
        getLayout: activeSection => {}
      };
      const fakeLoggerService = {
        log: (message: string) => {}
      };
      const fakeFrameworkService = {
        apiSetAppData: (key: string, value: any) => {},
        __setleftNavRoute: (params: Params) => {},
        __setWidgetStoreRoute: (params: Params) => {}
      };

      const fakeActivatedRoute = {
        queryParams: of({})
      };

      class RouteURL {
        static getUrlPostFixParams(urlPattern, routeParams) {
          return '';
        }
      }

      const fakeToastrService = {
        warning: () => {}
      };

      TestBed.configureTestingModule({
        declarations: [InPageStoreComponent, KeysPipe],
        imports: [RouterTestingModule, FormsModule, HttpClientTestingModule, DynamicIoModule],
        providers: [
          { provide: AppService, useValue: fakeAppService },
          { provide: WidgetstoreService, useValue: fakeWidgetstoreService },
          { provide: Api, useValue: fakeApi },
          { provide: UserService, useValue: fakeUserService },
          { provide: UserPreferenceService, useValue: fakeUserPreferenceService },
          { provide: SitePreferenceService, useValue: fakeSitePreferenceService },
          { provide: LoggerService, useValue: fakeLoggerService },
          { provide: ConfigurationService, useValue: fakeConfigurationService },
          { provide: FrameworkService, useValue: fakeFrameworkService },
          { provide: ActivatedRoute, useValue: fakeActivatedRoute },
          { provide: FrameworkService, useValue: fakeFrameworkService },
          { provdide: ToastrService, useValue: fakeToastrService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(
    waitForAsync(() => {
      fixture = TestBed.createComponent(InPageStoreComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it(
    'should create',
    waitForAsync(() => {
      expect(component).toBeTruthy();
    })
  );

  xit(
    'ngOnInit should have been called',
    waitForAsync(() => {
      // const ngOnInitSpy = spyOn(component, 'ngOnInit');
    })
  );

  // it('should invoke addwidget without spy', () => {
  //   component.addwidget('WID007');
  //   expect(component.addwidget).toHaveBeenCalled();
  // });

  // it('should called addwidget with spy', () => {
  //   spyOn(component, 'addwidget');
  //   component.addwidget('WID007');
  //   expect(component.addwidget).toHaveBeenCalled();
  // });

  // it('should invoke onKey without spy', () => {
  //   component.onKey();
  //   expect(component.onKey).toHaveBeenCalled();
  // });

  // it('should called onKey with spy', () => {
  //   spyOn(component, 'onKey');
  //   component.onKey();
  //   expect(component.onKey).toHaveBeenCalled();
  // });

  // it('should invoke searchWidgetStore without spy', () => {
  //   component.searchWidgetStore();
  //   expect(component.searchWidgetStore).toHaveBeenCalledTimes(1);
  // });

  // it('should called searchWidgetStore with spy', () => {
  //   spyOn(component, 'searchWidgetStore');
  //   component.searchWidgetStore();
  //   expect(component.searchWidgetStore).toHaveBeenCalled();
  // });

  // it('should invoke clearSearch without spy', () => {
  //   component.clearSearch();
  //   expect(component.clearSearch).toHaveBeenCalledTimes(1);
  // });

  // it('should called clearSearch with spy', () => {
  //   spyOn(component, 'clearSearch');
  //   component.clearSearch();
  //   expect(component.clearSearch).toHaveBeenCalled();
  // });

  it('should invoke selectCategory without spy', () => {
    component.selectCategory('category');
    expect(component.selectCategory).toHaveBeenCalledTimes(1);
  });

  it('should called selectCategory with spy', () => {
    spyOn(component, 'selectCategory');
    component.selectCategory('category');
    expect(component.selectCategory).toHaveBeenCalled();
  });
});
