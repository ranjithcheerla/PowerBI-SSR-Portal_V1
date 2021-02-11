import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EMSGuard } from './ems.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AdalService } from '../services/adal.service';
import { ConfigurationService } from './../services/configuration.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('Logged in guard should', () => {
  let EMSguard: EMSGuard;
  let configService: ConfigurationService;
  let adalService: AdalService;
  const mockSnapshot = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);
  const fakeConfigurationService = {
    config: {
      appConfig: {
        emsLoginEnabled: ''
      }
    }
  };
  const fakeAdalService = {
    isLogged: () => {
      return true;
    }
  };
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  // waitForAsync beforeEach
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, RouterTestingModule, CommonModule],
        providers: [
          { provide: ConfigurationService, useValue: fakeConfigurationService },
          { provide: AdalService, useValue: fakeAdalService },
          { provide: Router, useValue: router },
          { provide: RouterStateSnapshot, useValue: mockSnapshot }
        ]
      }).compileComponents(); // compile template and css
    })
  );

  // synchronous beforeEach
  beforeEach(() => {
    EMSguard = TestBed.inject(EMSGuard);
    configService = TestBed.inject(ConfigurationService);
    adalService = TestBed.inject(AdalService);
  });

  it('be able to hit route when user is logged in', () => {
    // adalService.isLogged = true;
    expect(EMSguard.canActivate(new ActivatedRouteSnapshot(), TestBed.inject(RouterStateSnapshot))).toBe(true);
  });

  // it('not be able to hit route when user is not logged in', () => {
  //     // adalService.isLogged = false;
  //     expect(EMSguard.canActivate(new ActivatedRouteSnapshot(),
  //     TestBed.get(RouterStateSnapshot))).toBe(false);
  // });
});
