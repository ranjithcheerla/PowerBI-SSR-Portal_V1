import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from './../../core/services/app.service';
import { CacheService } from './../../core/services/cache.service';
import { ActivatedRoute } from '@angular/router';
import { SplashscreenService } from './../../core/services/splashscreen.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  showReload = true;
  message = 'Something went wrong!!!';
  error_type = '';

  constructor(
    private appService: AppService,
    private cacheService: CacheService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private splashscreenService: SplashscreenService
  ) {
    this.cdr.detach();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(qParams => {
      if (qParams.type) {
        this.error_type = qParams.type;
        switch (qParams.type) {
          case 'SITE_NOT_CONFIGURED':
            this.message = 'This site is not configured!!!';
            this.hideTheHeaderItems();
            break;
          case 'Error':
            this.message = this.cacheService.errorMessage ?? `Something went wrong. Please try again later!!!`;
            this.hideTheHeaderItems();
            break;

          case 'NO_ACCESS':
            this.message = this.cacheService.errorMessage ?? `You don't have access to this site. Please call 32121 for assistance !!!`;
            this.hideTheHeaderItems();
            break;
          case 'PREFERENCES_FAILED':
            this.message = this.cacheService.errorMessage ?? `Fetching Site or User Preferences services failed. Please try again later!!!`;
            this.hideTheHeaderItems();
            break;
          case 'SESSION_EXPIRY':
            this.message = this.cacheService.errorMessage ?? `Please launch the application in new tab/window!`;
            this.hideTheHeaderItems();
            break;
          default:
            this.message = this.cacheService.errorMessage ?? `Something went wrong. Please try again later!!!`;
            this.hideTheHeaderItems();
            break;
        }
      }
    });
  }

  hideTheHeaderItems() {
    setTimeout(() => {
      this.appService.showLeftNav$.next(false);
      this.appService.toggleSiteTitle$.next(false);
      this.appService.toggleBreadcrumb$.next(false);
      this.appService.showHeader$.next(true);
      this.splashscreenService.hide();
      this.runChangeDetection();
    }, 1);
  }

  reload() {
    window.location.reload();
  }

  runChangeDetection() {
    this.cdr.detectChanges();
  }
}
