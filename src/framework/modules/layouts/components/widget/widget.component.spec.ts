import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { WidgetComponent } from './widget.component';
import {
  NO_ERRORS_SCHEMA,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { AppService } from './../../../core/services/app.service';
import { WidgetstoreService } from './../../../core/services/widgetstore.service';
import { UserPreferenceService } from './../../../core/services/userpreference.service';
import { ConfigurationService } from './../../../core/services/configuration.service';
import { SitePreferenceService } from './../../../core/services/sitepreference.service';
import { _ } from './../../../../lodash';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { of } from 'rxjs';
// import swal from 'sweetalert2';
@Component({ selector: 'app-dummy', template: '' })
export class DummyComponent {}

xdescribe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;
  // const dummyComponent: Component;

  beforeEach(
    waitForAsync(() => {
      const fakeAppService = {
        getAppData: (key: string) => {
          return { section: '' };
        }
      };
      const fakeWidgetstoreService = {
        getwidgetdetails: (widgetId: string) => {
          const data = {
            wsmsqlid: 22,
            widgetCategory: 'CRM',
            isWidDisable: false,
            ismobiledisabled: true,
            enableforupis: null,
            widJson: '{}',
            isWidMultiple: false,
            createddate: 'Jun 7, 2018 6:23:55 PM',
            modifieddate: 'Jun 8, 2018 12:10:27 PM',
            widgetPosition: `{'L1': 'L1P1', 'L2':'L2P1'}`,
            siteappid: {
              sitesqlid: 45,
              siteappid: 'APP0044',
              sitename: 'Core Framework',
              jsonversion: '1.0.0',
              defaultjson: '{}',
              ispublished: true,
              createddate: 'May 31, 2018 5:35:49 PM',
              modifieddate: 'Aug 30, 2018 2:26:09 PM',
              lastmodifiedby: null,
              isgroupind: false,
              parentappid: 'APP0098',
              routeparamtext: null,
              appdisplaycode: null
            },
            widgetKey: 'WID0011',
            widgetName: 'Issue Log'
          };
          return data;
        },
        getwidgetConfig: (widgetId: string, isFields?: boolean) => {
          return {};
        }
      };
      const fakeUserPreferenceService = {
        getWidgetConfig: (page: string, wId: string, configKey?: string) => {
          return {
            WID006: {
              removable: false
            },
            WID0012: {
              hasHeader: false
            }
          };
        },
        setWidgetConfig: () => {},
        removeWidget: () => of({})
      };
      const fakeConfigurationService = {
        config: {
          widgets: {
            WID0011: {
              COMPONENT: '',
              CONFIG: '{}'
            }
          }
        }
      };
      const fakeSitePreferenceService = {
        getPageWidgetConfig: (page: string, widget?: string) => {
          return {};
        },
        isWidgetStoreRequired: (pageName: string) => {
          return true;
        }
      };

      const fakeChangeDetectorRef = {
        detectChanges: () => {}
      };

      TestBed.configureTestingModule({
        declarations: [WidgetComponent, DummyComponent],
        imports: [BsDropdownModule.forRoot()],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: AppService, useValue: fakeAppService },
          { provide: WidgetstoreService, useValue: fakeWidgetstoreService },
          { provide: UserPreferenceService, useValue: fakeUserPreferenceService },
          { provide: ConfigurationService, useValue: fakeConfigurationService },
          { provide: SitePreferenceService, useValue: fakeSitePreferenceService },
          { provide: ChangeDetectorRef, useValue: fakeChangeDetectorRef }
        ]
      }).compileComponents();

      TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DummyComponent]
        }
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    component.compName = 'WID0011';
    component.pageName = 'page1';
    component.activeTab = 'page1';
    component.panel = 'L1P1';
    fixture.detectChanges();
  });

  it('should create', () => {
    // dummyComponent = TestBed.createComponent(DummyComponent) as Component;
    expect(component).toBeTruthy();
  });

  it('test case for setInitialConfig', () => {
    component.setInitialConfig();
    expect(component.setInitialConfig()).toBeUndefined();
  });

  // it('test case for updateConfig', () => {
  //   component.updateConfig({ handlewidgetEvent: 'true' });
  //   expect(
  //     component.updateConfig({ handlewidgetEvent: 'true' })
  //   ).toBeUndefined();
  // });

  it('test case for toggleCollapse', () => {
    component.toggleCollapse();
    expect(component.toggleCollapse()).toBeUndefined();
  });

  it('test case for toggleCollapse', () => {
    component.removeWidget();
    expect(component.removeWidget()).toBeUndefined();
  });

  it('test case for toggleCollapse', () => {
    component.removeWidget();
    expect(component.removeWidget()).toBeUndefined();
  });

  it('test case for customHelpIconClick', () => {
    component.customHelpIconClick();
    expect(component.customHelpIconClick()).toBeUndefined();
  });

  it('test case for handlewidgetEvent removeWidget', () => {
    component.handlewidgetEvent({ action: 'removeWidget' });
    expect(component.handlewidgetEvent).toHaveBeenCalledTimes(1);
  });

  it('test case for handlewidgetEvent collapsed', () => {
    component.handlewidgetEvent({ action: 'collapsed' });
    expect(component.handlewidgetEvent).toHaveBeenCalledTimes(1);
  });

  it('test case for hideLoader collapsed', () => {
    component.outputData.hideLoader(true);
    expect(component.outputData.hideLoader(true)).toBeUndefined();
  });
  it('test case for widgetOutput collapsed', () => {
    const data = { header: { count: '1', icon: 'icon', title: 'mytitle' } };
    component.outputData.widgetOutput(data);
    expect(component.outputData.widgetOutput(true)).toBeUndefined();
  });
  it('test case for showHelpIcon collapsed', () => {
    component.outputData.showHelpIcon(true);
    expect(component.showCustomHelpIcon).toBeTruthy();
  });
  // it('test case for helpIconWithMesssage collapsed', () => {
  //   component.outputData.helpIconWithMesssage('message');
  //   expect(component.helpText).toEqual('message');
  // });
  // it('test case for showErrorMessage collapsed', () => {
  //   component.outputData.showErrorMessage(true);
  //   expect(component.outputData.showErrorMessage(true)).toBeUndefined();
  // });
});
