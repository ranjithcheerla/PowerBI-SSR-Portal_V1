import { AppService } from '@framework/core/services/app.service';
import { UserPreferenceService } from './../../core/services/userpreference.service';
import { FrameworkService } from '@framework/core/services/framework.service';
import { LispCasePipe } from './../../commonutil/pipes/lisp-case.pipe';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

xdescribe('Reorder - HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(
    waitForAsync(() => {
      const fakeFrameworkService = {};
      const fakeUserPreferenceService = {};
      const fakeDragulaService = {
        dropModel: (groupName?: string) => of({}),
        find: () => {},
        createGroup: (name: string) => {}
      };
      const fakeAppService = {
        __getLeftNavModel: () => []
      };

      TestBed.configureTestingModule({
        declarations: [HomeComponent, LispCasePipe],
        imports: [RouterTestingModule, HttpClientTestingModule],
        providers: [
          { provide: FrameworkService, userValue: fakeFrameworkService },
          { provide: UserPreferenceService, useValue: fakeUserPreferenceService },
          { provide: AppService, useValue: fakeAppService }
        ],
        schemas: [NO_ERRORS_SCHEMA]
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
});
