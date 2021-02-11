import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppService } from './../../core/services/app.service';
import { Router } from '@angular/router';
import { ConfigurationService } from './../../core/services/configuration.service';
import { SplashscreenService } from './../../core/services/splashscreen.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homeUrl = '';

  constructor(
    private appService: AppService,
    private router: Router,
    private configService: ConfigurationService,
    private cdr: ChangeDetectorRef,
    private splashscreenService: SplashscreenService
  ) {
    this.cdr.detach();
  }

  ngOnInit() {
    this.homeUrl = this.configService.config.landingPageUrlPattern;
    this.appService.showLeftNav$.next(false);
    this.splashscreenService.hide();
  }

  takeMeHome() {
    this.router.navigate([this.homeUrl]);
  }
}
