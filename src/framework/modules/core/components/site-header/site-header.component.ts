import { animate, style, transition, trigger } from '@angular/animations';
import { Platform } from '@angular/cdk/platform';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import { ConfigItems } from '../../models/configurations';
import { User } from '../../models/user.model';
import { AppService } from '../../services/app.service';
import { ConfigurationService } from '../../services/configuration.service';
import { SettingsService } from '../../services/settings.service';
import { UserPreferenceService } from '../../services/userpreference.service';
import { _ } from './../../../../lodash';
import { HeaderControls } from './../../models/header.model';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate(200, style({ opacity: 1 }))]),
      transition(':leave', [animate(200, style({ opacity: 0 }))])
    ])
  ]
})
export class SiteHeaderComponent implements OnInit, OnDestroy {
  @Output() leftMenuToggle = new EventEmitter();
  rightMenuOpen = false;
  lhsSiteHeader = true;
  currentTab: string;
  showAddWidget = true;
  showResetWidgets = true;
  homepageUrl = '';
  innerWidth: number;
  searchComponent: any;
  titleAndHomePageLink$ = new BehaviorSubject<{ title: string; link: string }>({
    title: this.configService.config.siteName,
    link: this.configService.config.landingPageUrlPattern
  });
  showProfile = true;
  userInfo$ = new BehaviorSubject<User>({
    name: '',
    upi: '',
    designation: '',
    location: '',
    phone: ''
  });
  destroy$ = new Subject<boolean>();
  rightMenuOpen$ = new BehaviorSubject<boolean>(true);
  popSettingsMobile = false;
  toggleToolsMenu = false;
  toolsActions = false;
  toolsSettings = false;
  toolsCustom = false;
  toggleState = false;
  showHamburgerIcon$: Observable<any>;
  _showAllApps = false;
  showLauncher = this.userPreferenceService.getLauncherApps() !== null;
  headerControls: HeaderControls = {
    search: true,
    settings: true,
    actions: true,
    user: true,
    customIcon1: { class: '', label: '', tooltip: '' },
    customIcon2: { class: '', label: '', tooltip: '' }
  };
  customAddOnHeaderComponent: any;
  customAddOnHeaderInput: any;
  customAddOnHeaderText: string;
  launcher = false;
  constructor(
    private appService: AppService,
    private configService: ConfigurationService,
    private userPreferenceService: UserPreferenceService,
    private settingsService: SettingsService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.showHamburgerIcon$ = this.appService.showLeftNav$.asObservable().pipe(delay(0));
    this.searchComponent = this.configService.config.searchComponent;
    if (this.configService.config.appConfig && this.configService.config.appConfig.customAddOnOptionForHeaderComponent) {
      this.customAddOnHeaderComponent = this.configService.config.appConfig.customAddOnOptionForHeaderComponent.component;
      this.customAddOnHeaderInput = this.configService.config.appConfig.customAddOnOptionForHeaderComponent.input;
      this.customAddOnHeaderText = this.configService.config.appConfig.customAddOnOptionForHeaderComponent.text;
    }
    this.showProfile =
      this.configService.config.appConfig.userProfile !== undefined ? this.configService.config.appConfig.userProfile.showProfile : false;

    this.appService.changeSiteTitle$.pipe(takeUntil(this.destroy$)).subscribe((data: { title: string; link: string }) => {
      this.titleAndHomePageLink$.next({
        title: data.title,
        link: data.link || this.homepageUrl
      });
    });

    this.appService.userInfo$.pipe(takeUntil(this.destroy$)).subscribe((userInfo: User) => {
      this.userInfo$.next(userInfo);
    });

    this.appService.configItemChange$.pipe(takeUntil(this.destroy$)).subscribe((config: ConfigItems) => {
      this.titleAndHomePageLink$.next({
        title: config.siteName || this.configService.config.siteName,
        link: config.landingPageUrlPattern || this.configService.config.landingPageUrlPattern
      });
    });

    this.appService.Rightrailstate$.pipe(takeUntil(this.destroy$)).subscribe((rightTrailState: boolean) => {
      this.rightMenuOpen = rightTrailState;
    });

    this.appService.headerControls$.pipe(takeUntil(this.destroy$), delay(0)).subscribe((hControls: HeaderControls) => {
      this.headerControls = _.merge({}, this.headerControls, hControls);
    });

    this.settingsService.leftNavStateDefault$.pipe(takeUntil(this.destroy$)).subscribe((state: boolean) => (this.toggleState = state));

    this.appService.mobileMenuToggle$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: boolean) => this.toggleLeftMenu(state));
  }

  toggleRightMenu() {
    this.rightMenuOpen = !this.rightMenuOpen;
    this.popSettingsMobile = false;
    this.appService.leftNavstate$.next(false);
  }

  sideMenuClosed() {
    this.rightMenuOpen = false;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  toggleLeftMenu(state?: boolean) {
    this.toggleState = state ?? !this.toggleState;
    this.leftMenuToggle.emit(this.toggleState);
    this.appService.leftNavstate$.next(this.toggleState);
    if (!(this.platform.ANDROID || this.platform.IOS)) {
      this.userPreferenceService.setGlobalAppSettings('collapsedMenu', this.toggleState, true, true);
    }
  }

  rightMenuClosed() {
    this.rightMenuOpen = false;
  }

  setGlobalNavStatus(value: boolean) {
    this.launcher = value;
  }

  settingsOptionClicked() {
    this.appService.toggleRightNav$.next(false);
  }

  customIconClick(icon: 'ICON1' | 'ICON2') {
    this.appService.customHeaderIconClick$.next(icon);
  }
}
