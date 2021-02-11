import { ChangableLayouts } from './../../layouts/layout.constants';
import { SitePreferenceService } from './sitepreference.service';
import { ConfigurationService } from './configuration.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from './api.service';
import { UserService } from './user.service';
import { Subject, Observable, of } from 'rxjs';
import { _ } from './../../../lodash';

import { HttpParams } from '@angular/common/http';
import { AppInsightsService } from './app-insights.service';
import { ToastrService } from 'ngx-toastr';
import { PreferencesUrlsService } from './preferences-urls.service';
import { LeftNav } from '../models/leftNav.model';
import { IPref, IMaintenance } from '../models/preferences.model';
import { App } from '../models/launcher.model';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {
  private userPrefDelta: IPref;

  private widgetRemoved = new Subject<any>();
  widgetRemoved$ = this.widgetRemoved.asObservable();

  private widgetAdded = new Subject<any>();
  widgetAdded$ = this.widgetAdded.asObservable();

  private _layoutChanged = new Subject<any>();
  _layoutChanged$ = this._layoutChanged.asObservable();

  private leftNavOrderChanged = new Subject<any>();
  leftNavOrderChanged$ = this.leftNavOrderChanged.asObservable();

  private userprefJSON = {}; // user preference JSON
  private rawUserPref: any;

  constructor(
    private api: Api,
    private userService: UserService,
    private configService: ConfigurationService,
    private sitePreferenceService: SitePreferenceService,
    private appInsigthsService: AppInsightsService,
    private toasterService: ToastrService,
    private preferencesUrlService: PreferencesUrlsService,
    private appService: AppService
  ) {}

  populateUserPreferences(): Observable<any> {
    const appEnv = this.configService.config.appConfig.appEnv;
    const appGroup = this.configService.config.appGroup;
    const isSecure = this.configService.config.preferenceSecure;
    const isMSALAuth = this?.configService?.config?.enableMSAL;
    const urlPrefix = isSecure
      ? this.preferencesUrlService.FWConstants.environment[appEnv].preferencesUrl[appGroup]['url'] + 'secure/'
      : this.preferencesUrlService.FWConstants.environment[appEnv].preferencesUrl[appGroup]['url'];
    const prefResource = {};
    if (isSecure) {
      prefResource['prefUrl'] = this.preferencesUrlService?.FWConstants?.environment[appEnv]?.preferencesUrl[appGroup]['rtokenUrl'];
      if (isMSALAuth) {
        prefResource['prefUrl'] =
          this.preferencesUrlService?.FWConstants?.environment[appEnv]?.preferencesUrl[appGroup]['rtokenUrl'] + '/user_impersonation';
      }
    }

    const params = new HttpParams({
      fromObject: prefResource
    });
    return this.api
      .post(
        `${urlPrefix}getUserSitePreferences`,
        {
          siteId: this.configService.config.appKey,
          upi: this.configService.config.appConfig.emsLoginEnabled
            ? this.userService.getLoggedUserEmail()
            : this.userService.getUniqueCode()
        },
        { params: params }
      )
      .pipe(
        tap(response => {
          this.rawUserPref = response[0];
        })
      );
  }

  savePreferences(restore?: { [key: string]: any }): Observable<any> {
    if (this.sitePreferenceService.isUserPreferenceRequired()) {
      const appEnv = this.configService.config.appConfig.appEnv;
      const appGroup = this.configService.config.appGroup;
      const isSecure = this.configService.config.preferenceSecure;
      const isMSALAuth = this?.configService?.config?.enableMSAL;
      const urlPrefix = isSecure
        ? this.preferencesUrlService.FWConstants.environment[appEnv].preferencesUrl[appGroup]['url'] + 'secure/'
        : this.preferencesUrlService.FWConstants.environment[appEnv].preferencesUrl[appGroup]['url'];

      const prefResource = {};
      if (isSecure) {
        prefResource['prefUrl'] = this.preferencesUrlService?.FWConstants?.environment[appEnv]?.preferencesUrl[appGroup]['rtokenUrl'];
        if (isMSALAuth) {
          prefResource['prefUrl'] =
            this.preferencesUrlService?.FWConstants?.environment[appEnv]?.preferencesUrl[appGroup]['rtokenUrl'] + '/user_impersonation';
        }
      }

      const params = new HttpParams({
        fromObject: prefResource
      });

      return this.api
        .post(
          `${urlPrefix}updateSiteUserPreferences`,
          {
            siteId: this.configService.config.appKey,
            upi: this.configService.config.appConfig.emsLoginEnabled
              ? this.userService.getLoggedUserEmail()
              : this.userService.getUniqueCode(),
            configJson: JSON.stringify(restore ?? this.userPrefDelta),
            userJsonVersion: '1.0.0' // read this from site preferences.
          },
          { params: params }
        )
        .pipe(
          tap(() => {
            this.appService.userPreferenceUpdated$.next(restore ?? this.userPrefDelta);
          })
        );
    } else {
      return of(true);
    }
  }

  processUserPref() {
    if (_.isEmpty(this.rawUserPref) || !this.rawUserPref['configJson']) {
      this.mergeUserPrefDelta();
    } else {
      this.mergeUserPrefDelta(JSON.parse(this.rawUserPref['configJson']));
    }
    return of(true);
  }

  get sitePreference(): IPref {
    return this.sitePreferenceService.getSitePreferences();
  }

  mergeUserPrefDelta(delta: any = {}) {
    try {
      this.userPrefDelta = delta;
      this.userprefJSON = this.sitePreferenceService.generateSitePrefJson(this.sitePreference, this.userPrefDelta);
    } catch (error) {
      // Incase of user preferences delta merge failure, copy the site preferences to user preferences to run the application
      // without any error screens!
      // Notify the user about this issue and log the error to App Insights.
      this.appInsigthsService.logException(error, this.userService.getLoggedUserEmail(), {
        message: 'User preferences delta merge failed'
      });
      this.toasterService.warning('Application is loaded with default settings since personalization settings caused an issue!', '', {
        positionClass: 'toast-bottom-left'
      });
      this.userprefJSON = this.sitePreferenceService.getSitePreferences();
    }
  }

  private getObjValue(obj: any, path: string) {
    const s = path.replace(/\[(\w+)\]/g, '.$1');
    const a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
      const k = a[i];
      if (k in obj) {
        obj = obj[k];
      } else {
        return;
      }
    }
    return obj;
  }

  private setObjValue(obj: any, path: string, value: any) {
    const keys = _.filter(path.split('.'));
    let pointer = obj;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (!pointer[key] && i < keys.length - 1) {
        pointer[key] = {};
        pointer = pointer[key];
      } else if (i === keys.length - 1) {
        pointer[key] = value;
      } else {
        pointer = pointer[key];
      }
    }
  }

  generateDelta(data: any, action: string) {
    switch (action) {
      case 'configUpdate':
        // expected param(s) - path, value
        const currentValue = this.getObjValue(this.sitePreference, data.path);
        if (_.isEqual(currentValue, data.value)) {
          const pathSplit = data.path.split('.');
          const deltaKey = pathSplit[pathSplit.length - 1];
          pathSplit.splice(-1, 1);
          const newPath = pathSplit.join('.');
          const deltaVal = this.getObjValue(this.userPrefDelta, newPath);
          if (deltaVal) {
            delete deltaVal[deltaKey];
          }
        } else {
          this.setObjValue(this.userPrefDelta, data.path, data.value);
        }
        break;
      case 'resetPage':
        // expected param(s) - page
        if (this.userPrefDelta && this.userPrefDelta.pageSettings && this.userPrefDelta.pageSettings[data.page]) {
          delete this.userPrefDelta.pageSettings[data.page];
        }
        break;
      case 'reOrderWidgets':
        // expected param(s) - page
        const userPrefReorderPanels = this.getObjValue(this.userprefJSON, `pageSettings.${data.page}.panels`) || {};
        const deltaReorderPanels = this.getObjValue(this.userPrefDelta, `pageSettings.${data.page}.panels`) || {};
        const widgetOrder = _.pickBy(userPrefReorderPanels, (value, key) => key.indexOf('__') !== 0);
        const widgetOrderDelta = _.pickBy(deltaReorderPanels, (value, key) => key.indexOf('__') === 0);
        const mergedWidOrder = _.merge({}, widgetOrder, widgetOrderDelta);
        this.setObjValue(this.userPrefDelta, `pageSettings.${data.page}.panels`, mergedWidOrder);
        const layout = this.getObjValue(this.userprefJSON, `pageSettings.${data.page}.layout`) || '';
        this.setObjValue(this.userPrefDelta, `pageSettings.${data.page}.layout`, layout);
        break;
      case 'removeWidget':
      case 'addWidget':
        // expected param(s) - page, widget
        const ignorePanels = ['__added', '__removed'];
        const allSitePrefWidgets = [];
        const userPrefWidgets = [];
        const userPrefPanels = this.getObjValue(this.userprefJSON, `pageSettings.${data.page}.panels`) || {};
        const deltaPanels = this.getObjValue(this.userPrefDelta, `pageSettings.${data.page}.panels`) || {};
        userPrefPanels['__added'] = deltaPanels['__added'] || [];
        userPrefPanels['__removed'] = deltaPanels['__removed'] || [];
        _.forOwn(this.getObjValue(this.sitePreference, `pageSettings.${data.page}.panels`), (o, k) => {
          if (ignorePanels.indexOf(k) === -1) {
            allSitePrefWidgets.push(...o);
          }
        });
        _.forOwn(userPrefPanels, (o, k) => {
          if (ignorePanels.indexOf(k) === -1) {
            userPrefWidgets.push(...o);
          }
        });
        if (action === 'addWidget') {
          const removedIndex = userPrefPanels['__removed'].indexOf(data.widget);
          if (removedIndex !== -1) {
            userPrefPanels['__removed'].splice(removedIndex, 1);
          } else {
            userPrefPanels['__added'].push(data.widget);
          }
        } else if (action === 'removeWidget') {
          const addedIndex = userPrefPanels['__added'].indexOf(data.widget);
          if (addedIndex !== -1) {
            userPrefPanels['__added'].splice(addedIndex, 1);
          } else {
            userPrefPanels['__removed'].push(data.widget);
          }
          const widgetConfig = this.getObjValue(this.userPrefDelta, `pageSettings.${data.page}.widgetConfig`);
          if (widgetConfig) {
            delete widgetConfig[data.widget];
          }
        }
        if (!userPrefPanels['__removed'].length) {
          delete userPrefPanels['__removed'];
        }
        if (!userPrefPanels['__added'].length) {
          delete userPrefPanels['__added'];
        }
        this.setObjValue(this.userPrefDelta, `pageSettings.${data.page}.panels`, userPrefPanels);
        break;
    }

    this.mergeUserPrefDelta(this.userPrefDelta);
  }

  setWidgetConfig(widget: string, configKey: string, value: any, page?: string, save?: boolean) {
    if (page) {
      // NOT GLOBAL SETTINGS
      if (!this.userprefJSON['pageSettings']) {
        this.userprefJSON['pageSettings'] = {};
      }
      if (!this.userprefJSON['pageSettings'][page]) {
        this.userprefJSON['pageSettings'][page] = {};
      }
      if (!this.userprefJSON['pageSettings'][page]['widgetConfig']) {
        this.userprefJSON['pageSettings'][page]['widgetConfig'] = {};
      }
      if (!this.userprefJSON['pageSettings'][page]['widgetConfig'][widget]) {
        this.userprefJSON['pageSettings'][page]['widgetConfig'][widget] = {};
      }
      this.userprefJSON['pageSettings'][page]['widgetConfig'][widget][configKey] = value;
    } else {
      // GLOBAL SETTINGS
      if (!this.userprefJSON['globalSettings']) {
        this.userprefJSON['globalSettings'] = {};
      }
      if (!this.userprefJSON['globalSettings']['widgetConfig']) {
        this.userprefJSON['globalSettings']['widgetConfig'] = {};
      }
      if (!this.userprefJSON['globalSettings']['widgetConfig'][widget]) {
        this.userprefJSON['globalSettings']['widgetConfig'][widget] = {};
      }
      this.userprefJSON['globalSettings']['widgetConfig'][widget][configKey] = value;
    }
    const path = (page ? `pageSettings.${page}` : `globalSettings`) + `.widgetConfig.${widget}.${configKey}`;
    this.generateDelta({ path: path, value: value }, 'configUpdate');
    if (save) {
      this.savePreferences().subscribe();
    }
  }

  getWidgetConfig(widgetID: string, page?: string, global?: boolean, configKey?: string): any {
    let widgetConfig = {};

    if (global) {
      // GET GLOBAL SETTINGS
      const globalConfig = this?.userprefJSON?.['globalSettings']?.['widgetConfig']?.[widgetID] ?? {};
      widgetConfig = _.merge(widgetConfig, globalConfig);
    }
    if (page) {
      // GET PAGE LEVEL WIDGET SETTINGS
      const pageWidgetConfig = this?.userprefJSON?.['pageSettings']?.[page]?.['widgetConfig']?.[widgetID] ?? {};
      widgetConfig = _.merge(widgetConfig, pageWidgetConfig);
    }
    if (configKey) {
      return widgetConfig[configKey] || null;
    }
    return widgetConfig;
  }

  removeWidget(page: string, widget: string, save?: boolean) {
    if (this.userprefJSON['pageSettings'][page] && this.userprefJSON['pageSettings'][page].panels) {
      const pagePanels = this.getPageWidgets(page);
      _.forOwn(pagePanels, (widgets, panel) => {
        if (panel.indexOf('__') !== 0) {
          // not __added or __removed
          const widPos = widgets.indexOf(widget);
          if (widPos !== -1) {
            pagePanels[panel].splice(widPos, 1);
            if (this.userprefJSON['pageSettings'][page]['widgetConfig']) {
              delete this.userprefJSON['pageSettings'][page]['widgetConfig'][widget];
            }
            this.userprefJSON['pageSettings'][page].panels = pagePanels;
            this.widgetRemoved.next({ widget: widget });
            return false; // stop looping once the widget is removed.
          }
        }
      });
    }
    if (save) {
      this.generateDelta({ page: page, widget: widget }, 'removeWidget');
      this.savePreferences().subscribe();
    }
  }

  addWidget(page: string, widget: string, panel: string, save?: boolean) {
    if (!this.userprefJSON['pageSettings']) {
      this.userprefJSON['pageSettings'] = {};
    }
    if (!this.userprefJSON['pageSettings'][page]) {
      this.userprefJSON['pageSettings'][page] = {
        widgetConfig: {},
        panels: {}
      };
    }
    if (!this.userprefJSON['pageSettings'][page].panels[panel]) {
      this.userprefJSON['pageSettings'][page].panels[panel] = [];
    }
    this.userprefJSON['pageSettings'][page].panels[panel].push(widget);
    if (this.sitePreferenceService.isWidgetStoreDisplayedOnRightTrial()) {
      this.widgetAdded.next({ panel: panel, widget: widget });
    }

    if (save) {
      this.generateDelta({ page: page, widget: widget }, 'addWidget');
      this.savePreferences().subscribe();
    }
  }

  setPageDefaults(page: string, save?: boolean) {
    const panels = this.sitePreferenceService.getPageWidgets(page);
    const layout = this.sitePreferenceService.getLayout(page);
    const pageWidgetConfig = this.sitePreferenceService.getPageWidgetConfig(page);

    if (!this.userprefJSON['pageSettings']) {
      this.userprefJSON['pageSettings'] = {};
    }

    delete this.userprefJSON['pageSettings'][page];
    this.userprefJSON['pageSettings'][page] = {
      panels: panels,
      layout: layout,
      widgetConfig: pageWidgetConfig
    };

    // If there is layout change, then read the layout settings and apply those to the newly visited page!
    if (this.configService.config.appConfig.layoutCalculation) {
      const currentPageLayout = this.getGlobalAppSettings('layout') || 'boxed'; // Layout is 'Boxed' or 'Fluid'
      const updatedLayout = this.getUpdatedLayoutPanels(page, currentPageLayout);
      if (!_.isEmpty(updatedLayout)) {
        this.userprefJSON['pageSettings'][page]['panels'] = updatedLayout.panels;
        this.userprefJSON['pageSettings'][page]['layout'] = updatedLayout.layout;
      }
    }

    if (save) {
      this.generateDelta({ page: page }, 'resetPage');
      this.savePreferences().subscribe();
    }
  }

  getPageWidgets(page: string, panel?: string): any {
    if (this?.userprefJSON?.['pageSettings']?.[page]?.panels) {
      if (panel && this.userprefJSON['pageSettings'][page].panels[panel]) {
        return this.userprefJSON['pageSettings'][page].panels[panel].slice();
      } else if (!panel) {
        return _.merge({}, this.userprefJSON['pageSettings'][page].panels);
      }
      return null;
    }
    return null;
  }

  /**
   * Read the widgets from the respective panels from the page.
   * @param page pane name or id
   */
  getPageWidgetsForStore(page: string): Array<string> {
    const widgets = [];
    // Three Column - L6, Two Column - L1, One Column - L4
    const allowedLayoutPanels = ['L1P1', 'L1P2', 'L6P1', 'L6P2', 'L6P3', 'L4'];
    if (this?.userprefJSON?.['pageSettings']?.[page]?.panels) {
      const panels = this?.userprefJSON?.['pageSettings']?.[page]?.panels;
      _.each(_.keys(panels), key => {
        if (allowedLayoutPanels.indexOf(key) > -1) {
          widgets.push(...panels[key]);
        }
      });
    }
    return widgets;
  }

  setPageWidgets(page: string, panels: any, save?: boolean): void {
    this.userprefJSON['pageSettings'][page].panels = _.merge({}, panels);
    const widgetConfigs = this.userprefJSON['pageSettings'][page].widgetConfig;

    // DELETE WIDGET CONFIGURATION OF THOSE WIDGETS THAT DO NOT EXIST IN THE LAYOUT
    if (widgetConfigs && !_.isEmpty(widgetConfigs)) {
      const pageWidgets = [];
      _.each(panels, v => {
        pageWidgets.push(...v);
      });
      const widConfKeys = _.keys(widgetConfigs);
      _.each(widConfKeys, wk => {
        if (pageWidgets.indexOf(wk) !== -1) {
          delete widgetConfigs[wk];
        }
      });
    }

    if (save) {
      this.generateDelta({ page: page }, 'reOrderWidgets');
      this.savePreferences().subscribe();
    }
  }

  setGlobalAppSettings(key: string, value: any, delta: boolean, savePreferences: boolean = true) {
    if (!this.userprefJSON['globalSettings']) {
      this.userprefJSON['globalSettings'] = {};
    }
    this.userprefJSON['globalSettings'][key] = value;
    if (delta) {
      this.generateDelta({ path: `globalSettings.${key}`, value: value }, 'configUpdate');
    }
    if (savePreferences) {
      this.savePreferences().subscribe();
    }
  }

  getGlobalAppSettings(key: string) {
    return this?.userprefJSON?.['globalSettings']?.[key];
  }

  // Layout changed (boxed/fluid). Update the panels accordingly.
  updatedAllLayoutPanels(layout: string) {
    const currentLayout = this.getGlobalAppSettings('layout');
    if (layout !== currentLayout) {
      const newPageSettings = {};
      _.forOwn(this.userprefJSON['pageSettings'], (pageConfig, pageKey) => {
        newPageSettings[pageKey] = _.merge({}, this.userprefJSON['pageSettings'][pageKey]);
        const newPgLayout = this.getUpdatedLayoutPanels(pageKey, layout);
        if (newPgLayout) {
          newPageSettings[pageKey]['layout'] = newPgLayout.layout || null;
          newPageSettings[pageKey]['panels'] = newPgLayout.panels || {};
        }
      });
      this.userprefJSON['pageSettings'] = newPageSettings;
    }
  }

  getUpdatedLayoutPanels(page: string, layout: string) {
    const pageConfig = this.userprefJSON['pageSettings'][page];
    if (layout === 'fluid') {
      const pageLayout = pageConfig.layout || null;
      // layout is fluid. Change L1, L7 & L8 to L6
      if (ChangableLayouts.maps[pageLayout]) {
        const layoutMap = ChangableLayouts.maps[pageLayout];
        const mapTo = layoutMap.mapTo;
        const mappedPanels = {};

        mappedPanels[layoutMap.copy.to] = pageConfig.panels[layoutMap.copy.from];
        const splitPanelLen = layoutMap.split.to.length;
        _.each(layoutMap.split.to, (toPanel, panelIndex) => {
          mappedPanels[toPanel] = pageConfig.panels[layoutMap.split.from].filter((widgetId, widgetPos) => {
            // tslint:disable-next-line:radix
            return widgetPos % splitPanelLen === parseInt(panelIndex);
          });
        });
        return {
          layout: mapTo,
          panels: mappedPanels
        };
      }
      return {
        layout: pageConfig.layout,
        panels: pageConfig.panels
      };
    } else if (layout === 'boxed') {
      // change L6 back to corresponding layout
      const pageLayout = this.sitePreferenceService.getLayout(page) || null;
      if (pageLayout && pageConfig.layout === 'L6') {
        if (ChangableLayouts.maps[pageLayout]) {
          const layoutMap = ChangableLayouts.maps[pageLayout];
          const mappedPanels = {};
          mappedPanels[layoutMap.copy.from] = pageConfig.panels[layoutMap.copy.to];
          mappedPanels[layoutMap.split.from] = [];
          let itr = 0;
          while (1) {
            let widAvaliable = false;
            _.each(layoutMap.split.to, panel => {
              if (pageConfig.panels[panel][itr]) {
                mappedPanels[layoutMap.split.from].push(pageConfig.panels[panel][itr]);
                widAvaliable = true;
              }
            });
            if (!widAvaliable) {
              break;
            }
            itr++;
          }
          return {
            layout: pageLayout,
            panels: mappedPanels
          };
        }
      }
      return {
        layout: pageConfig.layout,
        panels: pageConfig.panels
      };
    }

    return {};
  }

  setSiteLayout(layout, saved: boolean) {
    this._layoutChanged.next({ layout: layout, saved: saved });
  }

  /* Added the updated PageTitle in userpreference Json and store to DB */
  setPageTitle(key: string, value: string, save?: boolean) {
    if (!this.userprefJSON['pageSettings']) {
      this.userprefJSON['pageSettings'] = {};
    }
    if (this.userprefJSON['pageSettings'][key] !== undefined) {
      this.userprefJSON['pageSettings'][key]['pageName'] = value;
    } else {
      this.userprefJSON['pageSettings'][key] = { pageName: value };
    }

    if (save) {
      this.generateDelta({ path: `pageSettings.${key}.pageName`, value: value }, 'configUpdate');
      this.savePreferences().subscribe();
    }
  }

  // TODO: To be refactored
  getPageLayout(page: string) {
    const doesLayoutAvailable = !!this?.userprefJSON?.['pageSettings']?.[page]?.['layout'];
    if (!doesLayoutAvailable) {
      this.setPageDefaults(page);
    }
    return this.userprefJSON['pageSettings'][page]['layout'];
  }

  setPageLayout(page: string, layout: string, delta: boolean, save: boolean) {
    if (this.userprefJSON['pageSettings'] && this.userprefJSON['pageSettings'][page]) {
      this.userprefJSON['pageSettings'][page]['layout'] = layout;
      if (delta) {
        this.generateDelta({ path: `pageSettings.${page}.layout`, value: layout }, 'configUpdate');
      }
      if (save) {
        this.savePreferences().subscribe();
      }
    }
  }

  // TODO: To be refactored
  getNavigationOrder() {
    return this?.userprefJSON?.['globalSettings']?.['leftNav']?.['navigation']?.['_root']?.['order'];
  }

  notifyNavigationOrderChanged() {
    this.leftNavOrderChanged.next();
  }

  getLeftNavPages(parent: string = '_root', path: any, routeParams: any, leftNavOrder: Array<string> = []): Array<LeftNav> {
    const leftNavPattern = this.getleftNavPattern().split('/');
    let pathPrefix = '';
    const fwConstants = ['section', 'subsection1', 'subsection2'];
    _.each(leftNavPattern, v => {
      if (v.indexOf(':') === -1) {
        pathPrefix += '/' + v;
      } else {
        const objKey = v.substring(1);
        if (fwConstants.indexOf(objKey) !== -1) {
          if (path[objKey]) {
            pathPrefix += '/' + path[objKey];
          }
        } else if (routeParams[objKey]) {
          pathPrefix += '/' + routeParams[objKey];
        }
      }
    });

    const rootObj = this.userprefJSON['globalSettings'].leftNav.navigation[parent];

    const navPages = [];
    const order = leftNavOrder.length > 1 ? leftNavOrder : rootObj.order;
    _.each(order, v => {
      const defaultObj = {
        key: v,
        route: pathPrefix + '/' + rootObj.items[v].page,
        routeActive: false
      };
      if (rootObj.items[v].settings) {
        if (rootObj.items[v].page === routeParams[fwConstants[rootObj.level - 1]]) {
          rootObj.items[v].active = true;
          rootObj.items[v].settings.collapsed = false;
        }
        const newPath = _.merge({}, path);
        if (!newPath.section) {
          newPath.section = rootObj.items[v].page;
        } else if (!newPath.subsection1) {
          newPath.subsection1 = rootObj.items[v].page;
        } else if (!newPath.subsection2) {
          newPath.subsection2 = rootObj.items[v].page;
        }
        defaultObj['children'] = this.getLeftNavPages(v, newPath, routeParams);
      }
      navPages.push(_.merge(defaultObj, rootObj.items[v]));
    });
    return navPages;
  }

  getleftNavPattern() {
    return this?.userprefJSON?.['globalSettings']?.pageURLPattern;
  }

  setLeftNavSettings(key: string, value: any, delta: boolean, savePreferences: boolean = true) {
    if (!this.userprefJSON['globalSettings']) {
      this.userprefJSON['globalSettings'] = {};
    }
    this.userprefJSON['globalSettings']['leftNav']['navigation']['_root']['items'][key].active = value;
    if (delta) {
      this.generateDelta(
        {
          path: `globalSettings.leftNav.navigation._root.items.${key}.active`,
          value: value
        },
        'configUpdate'
      );
    }
    if (savePreferences) {
      this.savePreferences().subscribe();
    }
  }

  setLeftNavOrderSettings(value: any, delta: boolean, savePreferences: boolean = true) {
    if (!this.userprefJSON['globalSettings']) {
      this.userprefJSON['globalSettings'] = {};
    }
    this.userprefJSON['globalSettings']['leftNav']['navigation']['_root']['order'] = value;
    if (delta) {
      this.generateDelta({ path: `globalSettings.leftNav.navigation._root.order`, value: value }, 'configUpdate');
    }
    if (savePreferences) {
      this.savePreferences().subscribe();
    }
  }

  canLeftNavReorder() {
    return this?.userprefJSON?.['globalSettings']?.['leftNav']?.settings?.reorder ?? false;
  }

  isCapabilityEnabled(page: string): boolean {
    const rootLevelItems = this?.userprefJSON?.['globalSettings']?.leftNav?.navigation?._root?.items ?? {};
    return _.values(rootLevelItems).filter(p => p.page === page && p.active).length > 0;
  }

  getMaintenanceMessage(): IMaintenance {
    return this?.userprefJSON?.['maintenance'] ?? { display: false, message: '' };
  }

  getLauncherApps(): App[] {
    return this?.userprefJSON?.['launcher']?.apps ?? [];
  }

  getRootUserSitePreferences(): Observable<any> {
    const appEnv = this.configService.config.appConfig.appEnv;
    const appGroup = this.configService.config.appGroup;
    const urlPrefix = this.preferencesUrlService.FWConstants.environment[appEnv].preferencesUrl[appGroup]['url'];
    return this.api.post(`${urlPrefix}getUserSitePreferences`, {
      siteId: 'APP001',
      upi: this.configService.config.appConfig.emsLoginEnabled ? this.userService.getLoggedUserEmail() : this.userService.getUniqueCode()
    });
  }
}
