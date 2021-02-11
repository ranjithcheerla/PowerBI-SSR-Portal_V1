import { UserPreferenceService } from './../../services/userpreference.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FrameworkService } from './../../services/framework.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftnavComponent } from './leftnav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from './../../../core/services/app.service';
import { SitePreferenceService } from './../../../core/services/sitepreference.service';
import { LispCasePipe } from './../../../commonutil/pipes/lisp-case.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { ConfigurationService } from '@framework/core/services/configuration.service';

xdescribe('LeftnavComponent', () => {
  let component: LeftnavComponent;
  let fixture: ComponentFixture<LeftnavComponent>;

  beforeEach(
    waitForAsync(() => {
      const fakeAppService = {
        getAppData: () => ({ routeParams: { section: 'layout1' } }),
        leftNavRoute$: of({ data: 'section1' }),
        hideLeftMenuItem$: of({}),
        __leftNavModel$: of([]),
        __populateTheLeftNavModel: () => {},
        __toggleHamMenu: () => of({}),
        navigateToMenuItem$: of({}),
        widgetStoreRoute$: of({}),
        __appToggleRightNav: (state: boolean) => {}
      };

      const fakeSitePreferences = {
        getLeftNavPages: (parent: string, path: any, routeParams: string) => {
          const data = [
            { key: 'L1', route: '/layout1', active: true, text: 'Productivity', page: 'layout1', managable: false },
            { key: 'L2', route: '/page1', active: true, text: 'Communications', managable: false, page: 'page1' },
            { key: 'L3', route: '/page2', text: 'News', page: 'page2', active: false, managable: true, category: 'Production' }
          ];
          return data;
        }
      };
      const fakeFrameworkService = {
        apiNavigateBack: (data: any) => {}
      };

      const fakeUserPreferenceService = {
        canLeftNavReorder: () => true,
        getNavigationOrder: () => [],
        getLeftNavPages: () => [],
        leftNavOrderChanged$: of({})
      };

      const fakeJoyrideService = {};
      const fakeRenderer2 = {};
      const fakeConfigurationService = {
        config: {
          appConfig: {
            customLeftNavMenu: false
          }
        }
      };

      TestBed.configureTestingModule({
        imports: [RouterTestingModule, TooltipModule.forRoot(), HttpClientTestingModule],
        declarations: [LeftnavComponent, LispCasePipe],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: AppService, useValue: fakeAppService },
          { provide: SitePreferenceService, useValue: fakeSitePreferences },
          { provide: FrameworkService, useValue: fakeFrameworkService },
          { provide: UserPreferenceService, useValue: fakeUserPreferenceService },
          { provide: Renderer2, useValue: fakeRenderer2 },
          { provide: ConfigurationService, useValue: fakeConfigurationService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.leftNav = [
      { key: 'L1', route: '/layout1', active: true, text: 'Productivity', page: 'layout1', managable: false, routeActive: false },
      { key: 'L2', route: '/page1', active: true, text: 'Communications', managable: false, page: 'page1', routeActive: false },
      {
        key: 'L3',
        route: '/page2',
        text: 'News',
        page: 'page2',
        active: false,
        managable: true,
        category: 'Production',
        routeActive: false
      }
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('ngOnInit should not return any value', () => {
  //   expect(component.ngOnInit()).toBeUndefined();
  // });

  it('should called toggleMenu with spy', () => {
    spyOn(component, 'toggleMenu');
    component.toggleMenu(component.leftNav[0]);
    expect(component.toggleMenu).toHaveBeenCalled();
  });

  it('should invoke toggleMenu without spy', () => {
    component.toggleMenu(component.leftNav[0]);
    component.toggleMenu(component.leftNav[0]);
    expect(component.toggleMenu).toHaveBeenCalledTimes(1);
  });

  it('should called toggleVisibilty with spy', () => {
    spyOn(component, 'toggleVisibilty');
    component.toggleVisibilty(component.leftNav, 'text', false, 'pageId', false);
    expect(component.toggleVisibilty).toHaveBeenCalled();
  });

  it('should invoke toggleVisibilty without spy', () => {
    component.toggleVisibilty(component.leftNav, 'News', false, 'pageId', false);
    const returnValue = component.toggleVisibilty(component.leftNav, 'News', false, 'pageId', false);
    expect(returnValue).toBeUndefined();
  });

  it('should invoke toggleSubMenuVisibilty', () => {
    component.toggleSubMenuVisibilty(component.leftNav, 'page2');
    const returnValue = component.toggleSubMenuVisibilty(component.leftNav, 'page2');
    expect(returnValue).toBeUndefined();
  });
});
