import { FrameworkService } from './../../../core/services/framework.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyContainerComponent } from './empty-container.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

xdescribe('EmptyContainerComponent', () => {
  let component: EmptyContainerComponent;
  let fixture: ComponentFixture<EmptyContainerComponent>;

  beforeEach(
    waitForAsync(() => {
      const fakeFrameworkService = {
        apiGetAppData: data => {}
      };
      const fakeAppService = {
        widgetStoreRoute$: of('')
      };

      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [EmptyContainerComponent],
        providers: [{ provide: FrameworkService, useValue: fakeFrameworkService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
