import { KeysPipe } from './../../commonutil/pipes/keys.pipe';

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { _ } from './../../../lodash';
import { HomeComponent } from './home.component';
import { UserPreferenceService } from './../../core/services/userpreference.service';
import { AppService } from './../../core/services/app.service';
import { SitePreferenceService } from './../../core/services/sitepreference.service';
import { FrameworkService } from './../../core/services/framework.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Header } from './../../core/models/header.model';

xdescribe('Capabilities - HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(
    waitForAsync(() => {
      const fakeAppService = {
        setHeader: (header: Header) => {},
        getLeftNavModel: () => {
          const data = {
            key: 'L1',
            route: '/layout1',
            active: true,
            text: 'Productivity',
            page: 'layout1',
            managable: false
          };
          return data;
        },
        setleftNavRoute: (params: Params) => {},
        setLeftNavModel: (model: any) => {}
      };
      const fakeSitePreferenceService = {
        getleftNavPattern: () => {
          return ':section/:projectid';
        },
        getSitePreferenceNavItems: (parent: string) => {
          const mydata = {
            items: {
              L1: {
                active: true,
                text: 'Productivity',
                page: 'layout1',
                managable: false
              }
            }
          };
          return mydata;
        }
      };
      const fakeFrameworkService = {
        apiSetAppData: (key: string, value: any) => {},
        __setleftNavRoute: (params: Params) => {},
        __setWidgetStoreRoute: (params: Params) => {}
      };

      const fakeUserPreferenceService = {
        setGlobalAppSettings: (key: string, value: any, savePreferences: boolean) => {},
        updateLeftNavWithUserPref: (leftNavItems: any) => {},
        setLeftNavSettings: (key: string, value: string, delta: boolean, savePerferences?: boolean) => {}
      };

      TestBed.configureTestingModule({
        declarations: [HomeComponent, KeysPipe],
        imports: [RouterTestingModule, FormsModule, HttpClientTestingModule],
        providers: [
          { provide: AppService, useValue: fakeAppService },
          { provide: SitePreferenceService, useValue: fakeSitePreferenceService },
          { provide: FrameworkService, useValue: fakeFrameworkService },
          { provide: UserPreferenceService, useValue: fakeUserPreferenceService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create addCapability', () => {
    const Capability = {
      key: 'L3',
      route: '/menu3page3',
      text: 'Menu 3',
      page: 'menu3page3',
      active: true,
      managable: true,
      category: 'Production'
    };
    component.RootLeftNav = [];
    component.addCapability(Capability);
    expect(Capability.active).toBeFalsy();
  });
});
