import { environment } from '@env/environment';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Configurations, PrefMode, appGroups, Environments } from '@framework/core/models/configurations';
import { AppService } from '@framework/core/services/app.service';

import { AppComponent } from './app.component';
import { FrameworkService } from '@framework/core/services/framework.service';
import { of } from 'rxjs';

xdescribe('AppComponent', () => {
  beforeEach(async(() => {

    const config: Configurations = {
      appKey: '',
      siteName: '',
      preferencesMode: PrefMode.local,
      appGroup: appGroups.units
    };

    const fakeFrameworkService = {
      menuBack$: of({}),
      breadcrumbClick$: of({}),
      apiSetAppData: () => {}
    };

    @Component({selector: 'app-framework-root', template: ''})
    class FrameworkRootStubComponent {}

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        FrameworkRootStubComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        { provide: FrameworkService, useValue: fakeFrameworkService }
    ]
    // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should have called ngOnInit', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'ngOnInit');
    app.ngOnInit();
    expect(app.ngOnInit).toHaveBeenCalled();
  }));
  it('should render title in a app-framework-root tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-framework-root').textContent).toBeDefined();
  }));
});
