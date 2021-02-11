import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Platform } from '@angular/cdk/platform';
import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';

import { _ } from './../../../../lodash';
import { RouteURL } from './../../../commonutil/utils/routeurl.util';
import { FWRoot } from './../../../core/base/FWRoot';
import { Header } from './../../../core/models/header.model';
import { AppInsightsService } from './../../../core/services/app-insights.service';
import { AppService } from './../../../core/services/app.service';
import { ConfigurationService } from './../../../core/services/configuration.service';
import { FrameworkService } from './../../../core/services/framework.service';
import { LoggerService } from './../../../core/services/logger.service';
import { SitePreferenceService } from './../../../core/services/sitepreference.service';
import { SplashscreenService } from './../../../core/services/splashscreen.service';
import { UserService } from './../../../core/services/user.service';
import { UserPreferenceService } from './../../../core/services/userpreference.service';
import { WidgetstoreService } from './../../../core/services/widgetstore.service';
import { IOmnitureUserInfo } from './../../../omniture/omniture.model';
import { OmnitureService } from './../../../omniture/omniture.service';
import { Layouts } from './../../layout.constants';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends FWRoot implements OnInit, OnDestroy {
  @Input() header: Header;
  @Input() widgetsTobeHidden: Array<string>;
  widgetsLoaded = false;
  draggable = false;
  errorOccured = false;
  resetpage = false;
  pageConfig: any;
  hiddenWidgets = [];
  dragOptions = {};
  subscriptions: Subscription[] = [];
  breadcrumbItemsArr = [];
  currentTab: string;
  widgetIds: Array<{ id: string; loaded: boolean }> = [];
  widgetLoadedEventFired = false;
  updatePreferences: boolean;
  siteLayout: string;
  __hiddenWidgetIds = [];
  showEmptyContainer = true;
  widgetName = null;
  isDraggable = false;
  constructor(
    public appService: AppService,
    public route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private widgetStoreService: WidgetstoreService,
    private sitepreference: SitePreferenceService,
    private userpreference: UserPreferenceService,
    private configService: ConfigurationService,
    private userService: UserService,
    public fwService: FrameworkService,
    private loggerService: LoggerService,
    private omnitureService: OmnitureService,
    private appInsigthsService: AppInsightsService,
    private platform: Platform,
    private splashscreenService: SplashscreenService
  ) {
    super(route, fwService);
  }

  ngOnInit() {
    this.appService.showLeftNav$.next(this?.configService?.config?.appConfig?.showLeftNavigation ?? true);
    this.appService.toggleAppHeader$.next(true);
    this.appService.toggleSiteInfo$.next(true);
    this.siteLayout = this.userpreference.getGlobalAppSettings('layout') || this.configService.config.appConfig.defaultLayout;
    this.appService.headerControls$.next({ actions: true, settings: true });

    // CHECK WITH ROOPESH ON WHERE TO PLACE THIS CODE
    if (this.siteLayout === 'fluid') {
      this.renderer.addClass(document.body, 'fluid-layout');
    } else {
      this.renderer.removeClass(document.body, 'fluid-layout');
    }
    // END:: CHECK WITH ROOPESH ON WHERE TO PLACE THIS CODE
    this.appService.showHeader$.next(true);

    const obsCombineParam$ = combineLatest([this.route.params, this.route.data]);

    obsCombineParam$.subscribe(([params, qParams]) => {
      this.widgetLoadedEventFired = false;
      this.widgetIds = [];
      this.__hiddenWidgetIds = [];
      this.hiddenWidgets = this.widgetsTobeHidden || qParams.widgets || [];
      // Emit an event before start of the layouting!
      this.appService.beforelayoutStart$.next(true);
      this.currentTab = params['subsection2'] || params['subsection1'] || params['section'];
      // Below code is a hack for allowing non pageURLPattern routes to use the Layout Rendering engine.
      // It allows app teams to have a static string in the route and contains the page definition in the site preferences
      // Ex: ` http://xyz.com/createsite` createsite is a static string route which will separte from the pageURLPattern
      if (!this.currentTab) {
        this.currentTab = RouteURL.pageNameFromPath(location.href);
      }
      this.isDraggable = this.isLayoutDraggable();
      this.appKickOff();
    });

    this.appService.pageRefresh$.subscribe(() => {
      this._updatePageConfig(this.pageConfig);
    });
  }

  isLayoutDraggable(): boolean {
    if (this.isMobile()) {
      return false;
    }
    return this?.sitepreference?.isLayoutDraggable(this.currentTab);
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

    this.updatePageWidgets();
    this.showEmptyContainer = true;
    this.widgetName = null;
  }
  dropItemEntered(event: any) {
    this.showEmptyContainer = false;
  }

  isDragDisabled(panel: string): boolean {
    if (!this.isDraggable) {
      return true;
    }
    return this?.pageConfig?.panelConfig?.[panel]?.locked ?? false;
  }

  getWidgetName(widgetId: string): string {
    if (this.widgetName !== null) {
      return this.widgetName;
    }
    return (this.widgetName = this?.widgetStoreService?.getWidgetName(widgetId) ?? '');
  }

  appKickOff() {
    // TODO: To be refactored!
    let pageLayout;
    let panels;
    // If true, layout calculation required, 2 column -> 3 columns with auto ordering of widgets!
    if (this.configService.config.appConfig.layoutCalculation) {
      const modifiedPageConf = this.userpreference.getUpdatedLayoutPanels(this.currentTab, this.siteLayout);
      const userPrefLayout = this.userpreference.getPageLayout(this.currentTab);
      pageLayout = modifiedPageConf.layout;
      panels = modifiedPageConf.panels;
      if (userPrefLayout !== pageLayout) {
        this.userpreference.setPageLayout(this.currentTab, pageLayout, true, false);
        this.userpreference.setPageWidgets(this.currentTab, modifiedPageConf.panels, true);
      }
    } else {
      pageLayout = this.userpreference.getPageLayout(this.currentTab) || this.sitepreference.getLayout(this.currentTab);
      panels = this.userpreference.getPageWidgets(this.currentTab);
    }

    // Check for valid layout based pages. If the corresponding layout doesn't exist, we're redirect to error page!
    if (pageLayout === undefined) {
      this.router.navigate(['pagenotfound']);
      return;
    }

    const pageConfig = {
      panels: Layouts[pageLayout].panels.slice(),
      panelConfig: _.merge({}, Layouts[pageLayout].panelConfig, this.sitepreference.getPanelConfig(this.currentTab, pageLayout))
    };
    // Show Page Banner, if it's enabled in the site preferences also specified the component in the configuration
    if (
      this.sitepreference.hasBanner(this.currentTab) &&
      this.configService.config.pageBanners &&
      this.configService.config.pageBanners[this.currentTab]
    ) {
      pageConfig['banner'] = this.configService.config.pageBanners[this.currentTab];
    }

    // Show Page Footer Banner, if it's enabled in the site preferences also specified the component in the configuration
    if (
      this.sitepreference.hasFooterBanner(this.currentTab) &&
      this.configService.config.pageFooterBanners &&
      this.configService.config.pageFooterBanners[this.currentTab]
    ) {
      pageConfig['footerBanner'] = this.configService.config.pageFooterBanners[this.currentTab];
    }

    if (this.userpreference.getPageWidgets(this.currentTab) === null) {
      this.updatePreferences = true;
      this.userpreference.setPageDefaults(this.currentTab, false);
    } else {
      this.updatePreferences = false;
    }
    // this.pageConfig = pageConfig;
    this.filterHiddenWidgetsFromPanels(this.hiddenWidgets, pageConfig, panels);
    this.handlevisibleWidgets(pageConfig);
    this.setHeader();
    this.killWidgetSubscriptions();
    this.initWidgetSubscriptions();
    this.widgetsLoaded = true;
    // To handle the DOM async during the reset the page config!
    this._updatePageConfig(pageConfig);

    this.subscriptions.push(
      this.appService.hideWidgets$.subscribe((list: Array<string> = []) => {
        this.hiddenWidgets = list.length > 0 ? _.union(this.hiddenWidgets, list) : [];
        const modifiedPageConf1 =
          this.siteLayout === 'fluid' ? this.userpreference.getUpdatedLayoutPanels(this.currentTab, this.siteLayout)['panel'] : undefined;
        this.filterHiddenWidgetsFromPanels(this.hiddenWidgets, this.pageConfig, modifiedPageConf1);
        this.handlevisibleWidgets(this.pageConfig);
      })
    );
    this.subscriptions.push(
      this.appService.hideWidget$.subscribe((widgetId: string) => {
        this.__hiddenWidgetIds.push(widgetId);
        this.appService.hideWidgets$.next(this.__hiddenWidgetIds);
      })
    );

    this.subscriptions.push(
      this.appService.showWidget$.subscribe((widgetId: string) => {
        const index = this.__hiddenWidgetIds.findIndex(item => item === widgetId);
        this.__hiddenWidgetIds.splice(index, 1);
        this.appService.hideWidgets$.next(this.__hiddenWidgetIds);
      })
    );
  }

  _updatePageConfig(pageConfig) {
    const pageConf = _.merge({}, pageConfig);
    this.pageConfig = {};
    setTimeout(() => {
      this.pageConfig = pageConf;
    }, 1);
  }

  filterHiddenWidgetsFromPanels(dynamicallyHiddenWidgets: Array<string>, pageConfig: any, panelWidgets?: any) {
    try {
      pageConfig.panels.forEach(panel => {
        const userPref = panelWidgets ? panelWidgets[panel] : this.userpreference.getPageWidgets(this.currentTab, panel);
        pageConfig.panelConfig[panel].widgets = userPref;
        // Below line of code (this.filterValidWidgets) is to remove undefined widgets before sending it to WIDGET COMPONENT for rendering.
        const widgets = this.filterValidWidgets(pageConfig.panelConfig[panel].widgets || []);

        pageConfig.panelConfig[panel].widgets = widgets.filter(item => dynamicallyHiddenWidgets.indexOf(item) === -1);
        this.addToWidgetIdContainer(pageConfig.panelConfig[panel].widgets);
      });
    } catch (e) {}
  }

  addToWidgetIdContainer(widgets: Array<string>) {
    widgets.forEach(element => {
      this.widgetIds.push({
        id: element,
        loaded: this.hiddenWidgets[element] ? true : false
      });
    });
  }

  filterValidWidgets(widgetsArray: any[]) {
    const filteredArray = [];
    widgetsArray.forEach((widget, index) => {
      const widgetKey = widget.replace(/_.*/g, '');
      if (this.configService.config.widgets[widgetKey]) {
        if (this.widgetStoreService.getWidgetdetails(widgetKey)?.isWidDisable === true) {
          this.hiddenWidgets[widget] = true;
        }
        filteredArray.push(widget);
      } else {
        this.loggerService.log(`"${widget}" widget is not defined in the application. Please add widget and try again!`);
      }
    });
    return filteredArray;
  }

  setHeader() {
    if (!this.header) {
      const siteTitle = this.sitepreference.getPageName(this.currentTab);
      this.breadcrumbItemsArr = [{ label: 'Home', path: '/' }];
      let leftNavModel = this.appService.getLeftNavModel();
      const routeParams = this.route.snapshot.params;
      const pageNames = Object.keys(routeParams).map(key => routeParams[key]) || [];
      const breadcrumb = [];

      for (let i = 0; i < pageNames.length; i++) {
        let _breadcrumb = {};
        for (let j = 0; j < leftNavModel.length; j++) {
          if (pageNames[i] === leftNavModel[j].page) {
            if (leftNavModel[j].settings) {
              _breadcrumb = { disableLink: !leftNavModel[j].settings.loadPage };
            }
            _breadcrumb['label'] = leftNavModel[j].text;
            _breadcrumb['path'] = leftNavModel[j].route;
            breadcrumb.push(_breadcrumb);
            if (leftNavModel[j].children) {
              leftNavModel = leftNavModel[j].children;
            }
            break;
          }
        }
      }
      this.breadcrumbItemsArr = this.breadcrumbItemsArr.concat(breadcrumb);
      const header: Header = {
        title: siteTitle,
        addWidget: this.sitepreference.isWidgetStoreRequired(this.currentTab),
        resetWidget: this.sitepreference.isUserPreferenceRequired(),
        addPages: this.sitepreference.hasManagePage(),
        breadcrumb: this.breadcrumbItemsArr,
        pageRefresh: this.sitepreference.hasPageRefreshEnabledForThisPage(this.currentTab),
        adminLink: !!this.configService.config.appConfig.showAdminLink
      };
      this.appService.setHeader(header);
    } else {
      this.appService.setHeader(this.header);
    }
  }

  killWidgetSubscriptions() {
    this.subscriptions.forEach(function(subscription) {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  initWidgetSubscriptions() {
    this.removeWidgetSubscription();
    this.changeLayoutSubscription();
    this.resetLayoutSubscription();
    this.addWidgetSubscription();
  }

  changeLayoutSubscription() {
    this.subscriptions.push(
      this.userpreference._layoutChanged$.subscribe(data => {
        if (this.siteLayout !== data.layout) {
          this.siteLayout = data.layout;
          if (this.siteLayout === 'fluid') {
            this.renderer.addClass(document.body, 'fluid-layout');
          } else {
            this.renderer.removeClass(document.body, 'fluid-layout');
          }
          this.appKickOff();
        }
        if (data.saved) {
          const pageConfig = this.userpreference.getUpdatedLayoutPanels(this.currentTab, this.siteLayout);
          this.userpreference.setPageLayout(this.currentTab, pageConfig.layout, true, false);
          this.userpreference.setGlobalAppSettings('layout', this.siteLayout, true, false);
          this.userpreference.setPageWidgets(this.currentTab, pageConfig.panels, true);
        }
      })
    );
  }

  updatePageWidgets() {
    const pageLayout = this.userpreference.getPageLayout(this.currentTab) || this.sitepreference.getLayout(this.currentTab);
    const widgetPanels = {};
    _.each(Layouts[pageLayout].panels, panel => {
      widgetPanels[panel] = this.pageConfig.panelConfig[panel].widgets;
    });
    this.handlevisibleWidgets(this.pageConfig);
    this.userpreference.setPageWidgets(this.currentTab, widgetPanels, true);
  }

  handlevisibleWidgets(pageConfig) {
    let widgetCount = 0;
    _.each(pageConfig.panels, panel => {
      let hiddenWidgetCount = 0;
      widgetCount = widgetCount + pageConfig.panelConfig[panel].widgets.length;
      hiddenWidgetCount = pageConfig.panelConfig[panel].widgets.filter(item => this.hiddenWidgets.indexOf(item) === -1).length;
      if (hiddenWidgetCount === 0) {
        pageConfig.panelConfig[panel].novisibleWidgets = true;
      } else {
        pageConfig.panelConfig[panel].novisibleWidgets = false;
      }
    });

    // If no widgets on the page, then we're good to announce layout render is done!
    if (widgetCount === 0) {
      this.afterWidgetsLoadedTasks();
    }
  }

  removeWidgetSubscription() {
    this.subscriptions.push(
      this.userpreference.widgetRemoved$.subscribe((widgetRef: { widget: string }) => {
        _.forOwn(this.pageConfig['panelConfig'], (panelConfig, panel) => {
          const widPos = panelConfig.widgets.indexOf(widgetRef.widget);
          if (widPos !== -1) {
            this.pageConfig['panelConfig'][panel].widgets.splice(widPos, 1);
          }
        });
        this.handlevisibleWidgets(this.pageConfig);
      })
    );
  }

  addWidgetSubscription() {
    this.subscriptions.push(
      this.userpreference.widgetAdded$.subscribe((widgetRef: { panel: string; widget: string }) => {
        if (this.filterValidWidgets([widgetRef.widget]).length > 0) {
          this.pageConfig['panelConfig'][widgetRef.panel].widgets.push(widgetRef.widget);
          this.handlevisibleWidgets(this.pageConfig);
        }
      })
    );
  }

  resetLayoutSubscription() {
    this.subscriptions.push(
      this.appService.pageReset$.subscribe(() => {
        this.userpreference.setPageDefaults(this.currentTab, true);
        const defaultLayout = this.userpreference.getPageWidgets(this.currentTab);
        const panelConfig = {};
        _.each(this.pageConfig.panels, panel => {
          panelConfig[panel] = _.merge({}, this.pageConfig.panelConfig[panel]);
          panelConfig[panel].widgets = this.filterValidWidgets(defaultLayout[panel] || []);
        });
        this.pageConfig.panelConfig = panelConfig;

        this.resetpage = !this.resetpage;
        this.handlevisibleWidgets(this.pageConfig);
      })
    );
  }

  widgetRendered(compId: string) {
    if (!this.widgetLoadedEventFired) {
      this.widgetIds.forEach(element => {
        if (element.id === compId) {
          element.loaded = true;
        }
      });

      if (this.widgetIds.filter(item => item.loaded === false).length === 0) {
        this.widgetLoadedEventFired = true;
        if (this.updatePreferences) {
          this.userpreference.savePreferences().subscribe();
          this.updatePreferences = false;
        }

        this.afterWidgetsLoadedTasks();
      }
    }
  }

  afterWidgetsLoadedTasks() {
    this.appService.layoutRenderComplete$.next(true);
    setTimeout(() => {
      this.splashscreenService.hide();
    }, 0);
    this.sendAnalytics();
  }

  sendAnalytics() {
    const pageInfo: {
      pageName: string;
      pageUrl: string;
      breadcrumb: '';
    } = {
      pageName: this.currentTab,
      pageUrl: window.location.href,
      breadcrumb: ''
    };
    if (this.configService.config.appConfig.emsLoginEnabled) {
      this.userService.getLoggedInUser().subscribe(
        user => {
          const upi = user.upi || '';
          this.reportToOmniture({
            upi: upi,
            jobTitle: user.designation || '',
            dept: user.department || '',
            coOrigin: `${user.city || ''} (${user.companyName || ''})`,
            officeLocation: `${user.city || ''} (${user.companyName || ''})`,
            vpuUnit: user.vpuUnit || '',
            org: 'The World Bank Group'
          });
          this.reportToAppInsights(pageInfo, upi);
        },
        error => {}
      );
    } else {
      const userDetails = this.fwService.apiGetExternalUser();
      this.reportToOmniture({
        upi: userDetails.upi,
        jobTitle: '',
        dept: '',
        coOrigin: '',
        officeLocation: '',
        vpuUnit: '',
        org: ''
      });
      this.reportToAppInsights(pageInfo, userDetails.upi);
    }
  }

  reportToOmniture(userInfo: IOmnitureUserInfo) {
    if (!!this.configService.config.omniture && !!this.configService.config.omniture.disableOmnitureReporting) {
      this.omnitureService.sendDataToOmniture(this.currentTab, false, null, {
        upi: userInfo.upi,
        jobTitle: userInfo.jobTitle,
        dept: userInfo.dept,
        coOrigin: userInfo.coOrigin,
        officeLocation: userInfo.officeLocation,
        vpuUnit: userInfo.vpuUnit,
        org: userInfo.org
      });
    }
  }

  reportToAppInsights(pageInfo: { pageName: string; pageUrl: string; breadcrumb: '' }, upi: string) {
    this.configService.config.appConfig.useEventTrackingforAppInsights
      ? this.appInsigthsService.trackEvent(pageInfo.pageName, {
          url: pageInfo.pageUrl,
          breadcrumb: pageInfo.breadcrumb,
          upi: upi
        })
      : this.appInsigthsService.trackPage(pageInfo.pageName, pageInfo.pageUrl, pageInfo.breadcrumb, upi);
  }

  isMobile() {
    return this.platform.IOS || this.platform.ANDROID;
  }

  ngOnDestroy() {
    this.killWidgetSubscriptions();
    super.destroy();
  }
}
