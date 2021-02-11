import { UserPreferenceService } from './../../services/userpreference.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../../../core/services/app.service';
import { ConfigurationService } from '../../services/configuration.service';
import { SitePreferenceService } from './../../services/sitepreference.service';
import { BreadcrumbItem } from '@framework/core/models';
@Component({
  selector: 'app-site-info',
  templateUrl: './site-info.component.html'
})
export class SiteInfoComponent implements OnInit {
  pageConfigComponent: any;
  siteTitleComponent: any;
  site_path: string;
  rhsArrowActive = false;
  menu_nav_mobile = false;
  siteAddActionsMobile = false;
  siteTitle = '';
  showAddWidget = false;
  showResetWidgets = false;
  breadcrumbItemsArr = [{ label: '', path: '' }];
  pageSection = '';
  currentPageInfo: any;
  pageKey: any;
  editTitle = false;
  showEditOption = false;
  updatedSiteTitle: any;
  showSiteTitle = true;
  showBreadcrumb = true;
  constructor(
    public appService: AppService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private configuration: ConfigurationService,
    private sitePreferences: SitePreferenceService,
    private UserPreferences: UserPreferenceService
  ) {}

  ngOnInit() {
    this.pageConfigComponent = this.configuration.config.pageConfigComponent;
    if (this.configuration.config.siteTitleComponent) {
      this.siteTitleComponent = this.configuration.config.siteTitleComponent;
    }
    this.appService.header$.subscribe(header => {
      this.siteTitle = header.title;
      // this.showWidgetBar = header.widgetsAccess;
      this.showAddWidget = header.addWidget;
      this.showResetWidgets = header.resetWidget;
      this.breadcrumbItemsArr = header.breadcrumb;
      // if (this.sitePreferences.hasManagePage()) {
      //   this.getCurrentPageDetails();
      // }
      this.cdr.detectChanges();
    });

    this.appService.toggleSiteTitle$.subscribe((state: boolean) => {
      this.showSiteTitle = state;
    });

    this.appService.toggleBreadcrumb$.subscribe((state: boolean) => {
      this.showBreadcrumb = state;
    });
  }

  // The below method to be refactored and SHALL NOT be used until it's corrected!
  getCurrentPageDetails() {
    const AppData = this.appService.getAppData('routeParams');
    const AppDataSection = AppData['subsection2'] || AppData['subsection1'] || AppData['section'];
    if (AppDataSection) {
      this.pageKey = AppDataSection;
      this.currentPageInfo = this.sitePreferences.getPageSetting(this.pageKey);
      this.showEditOption = this.currentPageInfo ? (this.currentPageInfo.editTitle ? this.currentPageInfo.editTitle : false) : false;
    } else {
      this.showEditOption = false;
    }
    this.editTitle = false;
  }
  showEditText() {
    this.editTitle = true;
    this.updatedSiteTitle = this.siteTitle;
  }
  /* Updated pageTitle was updated to Userpreference and Sitepreference JSON */
  upDatePageTitle() {
    this.siteTitle = this.updatedSiteTitle;
    this.UserPreferences.setPageTitle(this.pageKey, this.siteTitle, true);
    // this.sitePreferences.setPageName(this.pageKey, this.siteTitle);
    this.editTitle = !this.editTitle;
  }
  onBreadCrumbChange(breadcrumb: BreadcrumbItem) {
    this.router.navigate([breadcrumb.path], { queryParams: breadcrumb.queryParams });
  }
}
