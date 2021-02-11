import { Component, Inject, OnDestroy, OnInit, VERSION } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { forkJoin, of, Subscription, Subject, throwError, asyncScheduler } from 'rxjs';
import { DomUtil } from './../../../commonutil/utils/dom.util';
import { AppService } from './../../services/app.service';
import { ConfigurationService } from './../../services/configuration.service';
import { LoggerService } from './../../services/logger.service';
import { SitePreferenceService } from './../../services/sitepreference.service';
import { UserService } from './../../services/user.service';
import { UserPreferenceService } from './../../services/userpreference.service';
import { WidgetstoreService } from './../../services/widgetstore.service';
import { switchMap, timeout, filter, takeUntil, delay, tap, take } from 'rxjs/operators';
import { _ } from './../../../../lodash';
import { WebWorkerService } from './../../services/web-worker.service';
import { Settings } from './../../models/control-settings.model';
import { AppInsightsService } from './../../services/app-insights.service';
import { EncoderService } from './../../services/encoder.service';
import { SettingsService } from './../../services/settings.service';
import { FrameworkRootService } from './framework-root.service';
import { CfwDebugService } from './../../services/cfw-debug.service';
import { MsalBroadcastService, MsalService } from './../../../../msal';
import { EventMessage, EventType } from '@azure/msal-browser';
import { AdalService } from './../../services/adal.service';

@Component({
  selector: 'app-framework-root',
  templateUrl: './framework-root.component.html',
  styleUrls: ['./framework-root.component.scss']
})
export class FrameworkRootComponent implements OnInit, OnDestroy {
  siteDD: boolean;
  LhsToggled = !this.fwRootService.isMobile();
  RhsToggled = false;
  siteActionsToggled = false;
  widgetstoreLoaded = false;
  widgetstoreSubscription: Subscription;
  sitepreferenceSubscription: Subscription;
  leftNavData = [];
  isLogged = false;
  subscriptions = [];
  preferencesLoaded = false;
  preferencesUpdated = false;
  showLeftNav = true;
  showFooter = true;
  leftMenuToggleState = false;
  settingsToggleState = false;
  toggleRHSState = false;
  headerTheme;
  leftMenuTheme;
  showControlSetting = true;
  settings: Settings;
  showContentLoader = false;
  hamburgerState;
  destroy$: Subject<boolean> = new Subject<boolean>();
  appHeaderComponent: any;
  appHeaderCompInput: any;
  showAppHeader = true;
  leftNavActiveState = false;
  showSiteInfo = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private widgetStoreService: WidgetstoreService,
    private appService: AppService,
    private sitePreferenceService: SitePreferenceService,
    private configurationService: ConfigurationService,
    private userPreferencesService: UserPreferenceService,
    private userService: UserService,
    private loggerService: LoggerService,
    private webWorkerService: WebWorkerService,
    private appInsightsService: AppInsightsService,
    private encoderService: EncoderService,
    private settingsService: SettingsService,
    private fwRootService: FrameworkRootService,
    private cfwDebugService: CfwDebugService,
    private msalBroadcastService: MsalBroadcastService,
    private authService: MsalService,
    private adalService: AdalService
  ) {
    if (parseInt(VERSION.major, 10) < 9) {
      this.loggerService.error('Angular v10.x & above is required to use this version of Core Framework! Please upgrade and try again.');
    }
  }

  ngOnInit() {
    if (!this?.configurationService?.config?.enableMSAL) {
      this.adalService.context.handleWindowCallback();

      if (!this.adalService.isLogged && this.configurationService.config.appConfig.emsLoginEnabled) {
        return;
      }

      this.init();
    } else {
      const login$ = this.msalBroadcastService.msalSubject$
        .pipe(
          filter(
            (msg: EventMessage) =>
              msg !== null && (msg.eventType === EventType.HANDLE_REDIRECT_END || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS)
          ),
          take(1)
        )
        .subscribe(() => {
          this.appService.isUserLoggedIn$.next(true);
          this.init();
        });

      if (this.authService.getAllAccounts().length) {
        this.appService.isUserLoggedIn$.next(true);
        login$.unsubscribe();
        this.init();
      }
    }
  }

  init() {
    // Initialize the Analytics Web Worker by default!
    this.webWorkerService.initAnalyticsWorker();
    // Add closest method to the DOM API. Can be removed the JavaScript provides DOM API to do the same!
    DomUtil.getClosestElement();

    this.fwRootService.init();
    this.cfwDebugService.init();

    this.appService.leftNavstate$.pipe(takeUntil(this.destroy$), delay(0)).subscribe((LeftNavstate: boolean) => {
      this.LhsToggled = LeftNavstate;
    });

    this.appService.showLeftNav$.pipe(takeUntil(this.destroy$), delay(0)).subscribe((status: boolean) => {
      this.showLeftNav = status;
      // Framework has functionlaity which emits the selected left nav item.
      // As part of it, It should also emit when the left nav is toggled. To achieve it
      // we reset the isFirstTime condition on everytime the left menu is hidden, so that it emits the active item!
      if (!status) {
        this.appService.setAppData('isFirstTime', null, false);
      }
    });

    this.appService.showFooter$.pipe(takeUntil(this.destroy$), delay(0)).subscribe((status: boolean) => {
      this.showFooter = status;
      this.fwRootService.updateFooter(status);
    });

    this.appService.contentLoader$.pipe(takeUntil(this.destroy$)).subscribe(status => {
      this.showContentLoader = status;
    });

    this.appService.toggleSiteInfo$.pipe(takeUntil(this.destroy$)).subscribe(state => (this.showSiteInfo = state));

    const appHeader = this?.configurationService?.config?.appHeader;
    if (appHeader) {
      this.appHeaderComponent = appHeader.component;
      this.appHeaderCompInput = appHeader.input;
    }

    this.appService.toggleAppHeader$.pipe(delay(0, asyncScheduler)).subscribe((state: boolean) => {
      this.showAppHeader = state;
    });

    this.isLogged = true;

    if (this.configurationService.config.contextParams) {
      const ctxParams = this.configurationService.config.contextParams.split('/');
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        const params = this.route.snapshot.firstChild.paramMap['params'];
        const ctxObj = {};
        let isValid = true;
        if (!_.isEmpty(params)) {
          _.each(ctxParams, routeKey => {
            if (routeKey.substring(0, 1) === ':') {
              // Mandatory field
              const paramKey = routeKey.substring(1);
              if (!params[paramKey]) {
                isValid = false;
                return false;
              }
              ctxObj[paramKey] = params[paramKey];
            }
          });
        } else {
          isValid = false;
        }

        if (isValid) {
          this.appService.setSiteContext(ctxObj);
        } else {
          this.populatePreferences();
        }
      });
    } else {
      this.populatePreferences();
    }

    this.appService.contextChanged$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      let ctxRoute = '';
      const ctxParams = this.configurationService.config.contextParams.split('/');
      _.each(ctxParams, param => {
        if (param.substring(0, 2) === '?:' && data[param.substring(2)]) {
          ctxRoute = ctxRoute ? ctxRoute + '/' + data[param.substring(2)] : data[param.substring(2)];
        } else if (param.substring(0, 1) === ':') {
          ctxRoute = ctxRoute ? ctxRoute + '/' + data[param.substring(1)] : data[param.substring(1)];
        } else {
          ctxRoute = ctxRoute ? ctxRoute + '/' + param : param;
        }
      });
      this.populatePreferences(ctxRoute);
    });
  }

  populatePreferences(ctxRoute?: string) {
    this.fwRootService
      .getBaseTemplate()
      .pipe(
        switchMap((siteId: string) => {
          this.preferencesUpdated = false;
          return forkJoin([
            this.sitePreferenceService.getSitepreference(ctxRoute ? ctxRoute : siteId !== '__NONE__' ? siteId : undefined),
            this.configurationService.config.appConfig.emsLoginEnabled ? this.userService.getLoggedUserEmail$() : this.appService.extUser$
          ]).pipe(
            timeout(10000),
            switchMap(data => {
              if (!this.sitePreferenceService.hasSitePreferencesAvailable()) {
                return throwError(new Error('PREFERENCES_FAILED'));
              }
              if ((ctxRoute || this.configurationService.config.appKey !== 'APP001') && !this.sitePreferenceService.hasChildPref()) {
                // Loading child site. But only group preference is available.
                return throwError(new Error('SITE_NOT_CONFIGURED'));
              }
              this.makeSiteParamsAvailable();

              const isWidgetStoreRequired = this.sitePreferenceService.hasSiteWidgets();
              const isUserPrefRequired = this.sitePreferenceService.isUserPreferenceRequired();

              if (!isWidgetStoreRequired && !isUserPrefRequired) {
                this.preferencesLoaded = true;
                this.preferencesUpdated = true;
                return of({});
              }

              const prefs = [];
              if (isWidgetStoreRequired) {
                prefs.push(this.widgetStoreService.populateWidgetStoreData());
              }

              if (isUserPrefRequired) {
                prefs.push(this.userPreferencesService.populateUserPreferences());
              }

              return prefs.length > 0 ? forkJoin(prefs) : of({});
            }),
            tap(() => {
              // Irrespective of whether User pref is enabled or not, call the below method to setup the preferences!
              this.userPreferencesService.processUserPref();
            })
          );
        })
      )

      .subscribe(
        () => {
          this.preferencesLoaded = true;
          this.preferencesUpdated = true;
          this.appService.platformReady$.next(true);
          this.__doSomeTasksAfterAllCallsAreDone();
        },
        error => {
          this.preferencesLoaded = true;
          this.preferencesUpdated = true;
          const isPreferencesAvailable = this.sitePreferenceService.isSitePreferenceAvailable();
          // If Site Preferences is available, then load the application with default settings!
          if (isPreferencesAvailable) {
            const message = 'Failed to fetch personalized settings, hence loading default settings!';
            this.userPreferencesService.mergeUserPrefDelta({});
            this.appInsightsService.logException(error, this.userService.getLoggedUserEmail(), {
              message: message
            });
            this.loggerService.log(message);
            return;
          }
          this.showLeftNav = false;
          this.loggerService.log(`site preferences or EMS Authentication failed!`);
          this.appInsightsService.logException(error, this.userService.getLoggedUserEmail(), {
            user: this.encoderService.encode(this.userService.getLoggedUserEmail())
          });
          this.loggerService.log(error);
          this.router.navigate(['error'], {
            queryParams: { type: error.message },
            skipLocationChange: true
          });
        }
      );
  }

  __doSomeTasksAfterAllCallsAreDone() {
    this.showLeftNav = this.sitePreferenceService.hasLeftNavigation();
    this.fwRootService.setUserForAppInsights();
    if (this.sitePreferenceService.isUserPreferenceRequired()) {
      const defaultThemeSetInConfig = this.configurationService.config.appConfig.theme || 'cf-theme1';
      const layout = this.userPreferencesService.getGlobalAppSettings('layout') || this.configurationService.config.appConfig.defaultLayout;
      const theme = this.userPreferencesService.getGlobalAppSettings('theme') || defaultThemeSetInConfig;
      this.settingsService.theme$.next(theme);
      this.settingsService.layout$.next(layout);
      this.LhsToggled =
        this.userPreferencesService.getGlobalAppSettings('collapsedMenu') === undefined || this.fwRootService.isMobile()
          ? this.LhsToggled
          : this.userPreferencesService.getGlobalAppSettings('collapsedMenu');

      this.settingsService.leftNavStateDefault$.next(this.LhsToggled);
    }
  }

  makeSiteParamsAvailable() {
    const siteParams = this.sitePreferenceService.getSiteParams();
    this.appService.setAppData('siteParams', siteParams);
  }

  leftNavActive(event: any) {
    this.leftNavActiveState = event;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
