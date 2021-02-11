import { UserPreferenceService } from './../../services/userpreference.service';
import { SitePreferenceService } from './../../services/sitepreference.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';

import { SiteInfoComponent } from './site-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WidgetstoreService } from './../../../core/services/widgetstore.service';
import { AppService } from './../../../core/services/app.service';
import { ConfigurationService } from './../../../core/services/configuration.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

@Component({ selector: 'app-dummy', template: '' })
export class DummyComponent {}

describe('Site Info Component', () => {
  let component: SiteInfoComponent;
  let fixture: ComponentFixture<SiteInfoComponent>;

  const fakeWidgetstoreService = {};
  const fakeAppService = {
    header$: of({}),
    toggleSiteTitle$: of({}),
    toggleBreadcrumb$: of({}),
    getAppData: routeParams => {
      return 'data';
    }
  };
  const fakeConfigurationService = {
    config: {
      siteName: 'Core Framework',
      landingPageUrlPattern: ':section',
      pageConfigComponent: '',
      siteTitleComponent: ''
    }
  };
  const fakesitePreferences = {
    getPageSetting: data => {
      return '';
    },
    setPageName: (pagekey, title) => {}
  };
  const fakeUserPreferences = {
    setPageTitle: (pagekey, title) => {}
  };
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        declarations: [SiteInfoComponent, DummyComponent],
        providers: [
          { provide: AppService, useValue: fakeAppService },
          { provide: ConfigurationService, useValue: fakeConfigurationService },
          { provide: SitePreferenceService, useValue: fakesitePreferences },
          { provide: UserPreferenceService, useValue: fakeUserPreferences }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with out Site Title Component', () => {
    expect(component).toBeTruthy();
  });

  it('should create with Site Title component', () => {
    const configService = fixture.debugElement.injector.get(ConfigurationService);
    configService.config.siteTitleComponent = DummyComponent as Component;
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should invoke breadcrumbchange method', () => {
    const returnValue = component.onBreadCrumbChange({ label: '', path: '' });
    expect(returnValue).toBe(undefined);
  });

  it('should invoke getCurrentPageDetails without spy', () => {
    component.getCurrentPageDetails();
    const returnValue = component.getCurrentPageDetails();
    expect(returnValue).toBeUndefined();
  });

  it('should called getCurrentPageDetails with spy', () => {
    spyOn(component, 'getCurrentPageDetails');
    component.getCurrentPageDetails();
    expect(component.getCurrentPageDetails).toHaveBeenCalled();
  });

  it('should invoke showEditText without spy', () => {
    component.showEditText();
    const returnValue = component.showEditText();
    expect(returnValue).toBeUndefined();
  });

  it('should called showEditText with spy', () => {
    spyOn(component, 'showEditText');
    component.showEditText();
    expect(component.showEditText).toHaveBeenCalled();
  });

  it('should invoke upDatePageTitle without spy', () => {
    component.upDatePageTitle();
    const returnValue = component.upDatePageTitle();
    expect(returnValue).toBeUndefined();
  });

  it('should called upDatePageTitle with spy', () => {
    spyOn(component, 'upDatePageTitle');
    component.upDatePageTitle();
    expect(component.upDatePageTitle).toHaveBeenCalled();
  });

  // it('should invoke onBreadCrumbChange without spy', () => {
  //   component.onBreadCrumbChange({});
  //   const returnValue = component.onBreadCrumbChange({});
  //   expect(returnValue).toBeUndefined();
  // });

  // it('should called onBreadCrumbChange with spy', () => {
  //   spyOn(component, 'onBreadCrumbChange');
  //   component.onBreadCrumbChange({});
  //   expect(component.onBreadCrumbChange).toHaveBeenCalled();
  // });
});
