import { FrameworkService } from './../../../core/services/framework.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BreadcrumbComponent } from './breadcrumb.component';
import { mockFrameworkService } from './../../../core/services/framework.service.mock';
import { AppService } from './../../../core/services/app.service';
import { mockAppService } from './../../../core/services/app.service.mock';
import { BreadcrumbItem } from './../../models/breadcrumb.model';
import { WindowToken } from '@framework/core/services/window.service';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(
    waitForAsync(() => {
      const MockWindow = {
        // location: {
        //   _href: '',
        //   set href(url: string) {
        //     this._href = url;
        //   },
        //   get href() {
        //     return this._href;
        //   }
        // }
      };
      TestBed.configureTestingModule({
        declarations: [BreadcrumbComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [
          { provide: FrameworkService, useValue: mockFrameworkService },
          { provide: AppService, useValue: mockAppService },
          { provide: WindowToken, useValue: MockWindow }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('contain getter breadcrumbItem method', () => {
    expect(component.breadcrumbItem).toBeUndefined();
  });

  it('update breadcrumbItem via setter method', () => {
    component.breadcrumbItem = [
      {
        label: 'Home',
        path: '/home',
        disableLink: false,
        external: false
      }
    ];

    const breadcrumb = component.breadcrumbItem;
    expect(breadcrumb.length).toBeGreaterThan(0);
    expect(breadcrumb[0].label).toEqual('Home');
    expect(breadcrumb[0].disableLink).toBeFalsy();
    expect(breadcrumb[0].external).toBeFalsy();
  });

  it('contain emitPath method', () => {
    expect(component.emitPath).toBeDefined();
  });

  it('emitPath method returns undefined', () => {
    const breadcrumbItem: BreadcrumbItem = {
      label: 'Home',
      path: '/home',
      disableLink: false,
      external: false
    };

    spyOn(component, 'emitPath');
    component.emitPath(breadcrumbItem, false);
    expect(component.emitPath).toHaveBeenCalledTimes(1);
  });

  xit('emitPath method invoked via direct function call - internal link', () => {
    const breadcrumbItem: BreadcrumbItem = {
      label: 'Home',
      path: '/home',
      disableLink: false,
      external: false
    };
    const frameworkService = fixture.debugElement.injector.get(FrameworkService);
    const fServiceSpy = spyOnProperty(frameworkService, 'breadcrumbClick$', 'get');

    component.breadCrumbClick.subscribe((breadCrumbItem: BreadcrumbItem) => {
      expect(breadCrumbItem.label).toEqual('Home');
      expect(breadCrumbItem.disableLink).toBeFalsy();
    });

    component.disableLastChildClick = false;
    component.emitPath(breadcrumbItem, false);
    expect(fServiceSpy).toHaveBeenCalled();

    frameworkService.apiBreadcrumbClick$.subscribe(data => {
      expect(data.item.label).toEqual('Home');
    });
  });

  xit('emitPath method invoked via direct function call - external link', () => {
    const breadcrumbItem: BreadcrumbItem = {
      label: 'Home',
      path: 'https://intranet.worldbank.org',
      disableLink: false,
      external: true
    };
    const frameworkService = fixture.debugElement.injector.get(FrameworkService);
    const fServiceSpy = spyOnProperty(frameworkService, 'breadcrumbClick$', 'get');

    // const windowToken = fixture.debugElement.injector.get(WindowToken);

    component.emitPath(breadcrumbItem, false);
    // expect(windowToken.location.href).toEqual('https://intranet.worldbank.org');
    expect(fServiceSpy).toHaveBeenCalledTimes(0);
  });
});
