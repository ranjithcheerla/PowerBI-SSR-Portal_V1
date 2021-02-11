import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdalService } from '../../services/adal.service';
import { LoginComponent } from './login.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigurationService } from '../../services/configuration.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(
    waitForAsync(() => {
      const fakeActivatedRoute = {
        snapshot: { data: {}, queryParams: {} }
      } as ActivatedRoute;

      const fakeConfigService = {
        config: {
          appConfig: {
            emsLoginEnabled: true
          }
        }
      };

      const fakeAdalService = {
        isLogged: false,
        context: {
          login: () => {
            return 'login success';
          }
        }
      };

      const fakeRouter = {
        navigateByUrl: returnUrl => {
          return '';
        }
      };

      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [LoginComponent],
        providers: [
          { provide: ActivatedRoute, useValue: fakeActivatedRoute },
          { provide: ConfigurationService, useValue: fakeConfigService },
          { provide: AdalService, useValue: fakeAdalService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit should not return any value', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });
});
