import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppService } from '@framework/core/services/app.service';
import { HomeComponent } from './home.component';
import { Header } from '@framework/core/models/header.model';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from '@framework/core/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Configurations, PrefMode, appGroups } from '@framework/core/models/configurations';
import { FrameworkModule } from '@framework/framework.module';
import { AdalService } from '@framework/core/services/adal.service';
import { APP_BASE_HREF } from '@angular/common';
import { FrameworkService } from '@framework/core/services/framework.service';

xdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const fakeAppService = {
    toggleLeftNav: (toggle: boolean) => {},
    setHeader: (header: Header) => {},
    toggleSearchInHeader: (toggle: boolean) => {},
    toggleControlSettings: (toggle: boolean) => {},
    hideThisLeftMenuItem: (toggle: boolean) => {}
  };

  const fakeFrameworkService = {
    apiSetHeader: (header: Header) => {},
    apiToggleSearchInHeader: (toggle: boolean) => {},
    apiToggleControlSettings: (toggle: boolean) => {},
    apiToggleLeftMenuItem: (toggle: boolean) => {},
    apiToggleLeftNav: (toggle: boolean) => {},
    apiGetLoggedInUser: () => {
      return of({});
    },
    apiPageRefreshHook$: () => {
      return of({});
    },
    apiGetLoggedUserEmail: () => {},
    apiSetAppData: () => {}
  };

  const fakeUserSerice = {
    getLoggedInUser: () => of({}),
    getLoggedUserEmail: () => 'rchinnakampalli@worldbankgroup.org'
  };

  const config: Configurations = {
    appKey: '',
    siteName: '',
    preferencesMode: PrefMode.local,
    appGroup: appGroups.units
  };

  const fakeAdalService = {
    isLogged: false,
    context: {
      login: () => {
        return 'login success';
      }
    }
  };

  @Component({ selector: 'app-form', template: '' })
  class AppFormStubComponent {}

  @Component({ selector: 'app-validator', template: '' })
  class AppValidatorStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FrameworkModule.configurations(config)],
      declarations: [HomeComponent, AppFormStubComponent, AppValidatorStubComponent],
      providers: [
        { provide: AppService, useValue: fakeAppService },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: UserService, useValue: fakeUserSerice },
        { provide: AdalService, useValue: fakeAdalService },
        { provide: FrameworkService, useValue: fakeFrameworkService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
