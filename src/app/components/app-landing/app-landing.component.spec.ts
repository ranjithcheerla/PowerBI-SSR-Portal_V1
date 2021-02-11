import { FrameworkService } from '@framework/core/services/framework.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppLandingComponent } from './app-landing.component';
import { Header, HeaderControls } from '@framework/core/models/header.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Configurations, PrefMode, appGroups } from '@framework/core/models/configurations';
import { FrameworkModule } from '@framework/framework.module';
import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AdalService } from '@framework/core/services/adal.service';
import { Params } from '@angular/router';

describe('AppLandingComponent', () => {
  let component: AppLandingComponent;
  let fixture: ComponentFixture<AppLandingComponent>;

  const config: Configurations = {
    appKey: '',
    siteName: '',
    preferencesMode: PrefMode.local,
    appGroup: appGroups.units
  };

  const fakeFrameworkService = {
    apiSetHeader: () => {},
    apiToggleLeftNav: (header: Header) => {},
    apiToggleHeaderControls: (headerControls: HeaderControls) => {},
    apiSetAppData: (key: string, value: any) => {},
    __setleftNavRoute: (params: Params) => {},
    __setWidgetStoreRoute: (params: Params) => {}
  };

  const fakeAdalService = {
    isLogged: false,
    context: {
      login: () => {
        return 'login success';
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FrameworkModule.configurations(config), HttpClientTestingModule, RouterTestingModule],
      declarations: [AppLandingComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: FrameworkService, useValue: fakeFrameworkService },
        { provide: AdalService, useValue: fakeAdalService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
