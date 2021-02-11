import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Component, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { of } from 'rxjs';
import { AppService } from './../../../core/services/app.service';
import { ConfigurationService } from './../../services/configuration.service';

xdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(
    waitForAsync(() => {
      @Component({ selector: 'app-tophat', template: '' })
      class TopHatStubComponent {}

      @Component({ selector: 'app-site-info', template: '' })
      class SiteInfoStubComponent {}

      const fakeAppService = {
        showHeader$: of({})
      };

      const fakeConfigService = {
        config: {
          appConfig: {
            wbTopAndBottom: {
              header: false,
              footer: true
            }
          }
        }
      };

      const fakeRenderer2 = {
        addClass: () => {},
        removeClass: () => {}
      };

      TestBed.configureTestingModule({
        declarations: [HeaderComponent, TopHatStubComponent, SiteInfoStubComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: AppService, useValue: fakeAppService },
          { provide: ConfigurationService, useValue: fakeConfigService },
          { provide: Renderer2, useValue: fakeRenderer2 }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should invoke ngOnInit',
    waitForAsync(() => {
      const returnValue = component.ngOnInit();
      expect(returnValue).toBeUndefined();
    })
  );

  // it('should called leftMenuToggleTrigger with spy', () => {
  //   spyOn(component, 'leftMenuToggleTrigger');
  //   component.leftMenuToggleTrigger(true);
  //   expect(component.leftMenuToggleTrigger).toHaveBeenCalled();
  // });

  // it('should invoke leftMenuToggleTrigger without spy', () => {
  //   component.leftMenuToggleTrigger(true);
  //   const returnValue = component.leftMenuToggleTrigger(true);
  //   expect(returnValue).toBeUndefined();
  // });

  // it('should called RHSToggle with spy', () => {
  //   spyOn(component, 'RHSToggle');
  //   component.RHSToggle(true);
  //   expect(component.RHSToggle).toHaveBeenCalled();
  // });

  // it('should invoke RHSToggle without spy', () => {
  //   component.RHSToggle(true);
  //   const returnValue = component.RHSToggle(true);
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

  // it('should invoke updateDOMForTopHatChange', () => {
  //   component.updateDOMForTopHatChange(false);
  //   const returnValue = document.body.classList.contains('no-tophat');
  //   expect(returnValue).toBeTruthy();
  // });
});
