import { Component, OnInit, Input } from '@angular/core';
import { AppService } from './../../../core/services/app.service';
import { SitePreferenceService } from './../../../core/services/sitepreference.service';
import { InPageStoreComponent } from './../../../core/components/in-page-store/in-page-store.component';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ICapabilitySelected } from './../../../core/models/capability.model';
import { _ } from './../../../../lodash';

@Component({
  selector: 'app-empty-container',
  templateUrl: './empty-container.component.html',
  styleUrls: ['./empty-container.component.scss']
})
export class EmptyContainerComponent implements OnInit {
  widgetStorePath = {};
  showWidgetStoreLink = true;
  currentPage = '';
  constructor(public appService: AppService, private sitePreferencesService: SitePreferenceService, private router: Router) {}

  ngOnInit() {
    this.widgetStorePath = this.appService.getAppData('routeParams');
    this.showWidgetStoreLink = this.sitePreferencesService.hasSiteWidgets() && this.sitePreferencesService.isUserPreferenceRequired();
    this.appService.selectedCapability$
      .asObservable()
      .pipe(filter((cap: ICapabilitySelected) => cap?.pageName !== ''))
      .subscribe((cap: ICapabilitySelected) => (this.currentPage = cap?.pageName ?? ''));
  }

  openWidgetStore() {
    if (this.sitePreferencesService.isWidgetStoreDisplayedOnRightTrial()) {
      this.appService.loadRightNavPage$.next({
        title: 'Widget Store',
        component: InPageStoreComponent as Component,
        status: true
      });
    } else {
      this.router.navigate(['widgetstore'], {
        queryParams: _.merge({}, this.widgetStorePath, { pageName: this.currentPage })
      });
    }
  }
}
