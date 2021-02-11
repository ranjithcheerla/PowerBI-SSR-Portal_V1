import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggerService } from './../../../core/services/logger.service';
import { AppService } from './../../../core/services/app.service';
import { ConfigurationService } from './../../../core/services/configuration.service';
import { RightTrialComponent } from './right-trial.component';
import { of } from 'rxjs';

xdescribe('RightTrialComponent', () => {
  let component: RightTrialComponent;
  let fixture: ComponentFixture<RightTrialComponent>;

  beforeEach(
    waitForAsync(() => {
      const fakeAppService = {
        loadRightNavPage$: of({}),
        toggleRightNav$: of({})
      };

      const fakeConfigurationService = {};
      const fakeLoggerService = {};
      TestBed.configureTestingModule({
        declarations: [RightTrialComponent],
        imports: [],
        providers: [
          { provide: AppService, useValue: fakeAppService },
          { provide: LoggerService, useValue: fakeLoggerService },
          { provide: ConfigurationService, useValue: fakeConfigurationService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RightTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
