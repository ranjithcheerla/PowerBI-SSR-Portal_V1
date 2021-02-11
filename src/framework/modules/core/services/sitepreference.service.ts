import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { IFooter, INavigation, IPageSettings, IPanels, IPref } from '../models/preferences.model';
import { _ } from './../../../lodash';
import { Layouts } from './../../layouts/layout.constants';
import { PrefMode } from './../models/configurations';
import { Api } from './../services/api.service';
import { ConfigurationService } from './../services/configuration.service';
import { LoggerService } from './../services/logger.service';
import { PreferencesUrlsService } from './preferences-urls.service';

@Injectable({
  providedIn: 'root'
})
export class SitePreferenceService {
  protected sitePrefJSON: IPref;
  protected sitePrefDB: IPref;
  protected parentPrefDB: IPref;
  protected customJSON: Array<{ siteappid: string; customjson: string }> = [];
  constructor(
    private api: Api,
    private loggerService: LoggerService,
    private configService: ConfigurationService,
    private preferencesUrlService: PreferencesUrlsService
  ) {}

  getSitepreference(ctxRoute?: string): Observable<any> {
    let prefMode = this.configService.config.preferencesMode;
    if (prefMode === undefined || prefMode === null) {
      this.loggerService.log(`Preference Mode is not set and defaulting to Service mode!`);
      prefMode = PrefMode.service;
    }
    if (prefMode === PrefMode.local) {
      const sitePreferencesPath = this.configService.config.preferencePath.sitePreferencesPath;
      if (sitePreferencesPath === undefined || sitePreferencesPath === '') {
        this.loggerService.log(`Though Preference mode is set to local,
         no local site preference path is set, hence defaulting to service mode`);
        return this.__fetchSitePreferencesFromService(ctxRoute);
      }
      return this.api.get(sitePreferencesPath).pipe(
        map(data => {
          this.__setPreferences(data);
        })
      );
    } else {
      return this.__fetchSitePreferencesFromService(ctxRoute);
    }
  }

  __fetchSitePreferencesFromService(ctxRoute?: string) {
    const appEnv = this?.configService?.config?.appConfig?.appEnv;
    const appGroup = this?.configService?.config?.appGroup;
    const isSecure = this?.configService?.config?.preferenceSecure;
    const isMSALAuth = this?.configService?.config?.enableMSAL;
    const urlPrefix = isSecure
      ? this?.preferencesUrlService?.FWConstants?.environment[appEnv]?.preferencesUrl[appGroup]['url'] + 'secure/'
      : this?.preferencesUrlService?.FWConstants?.environment[appEnv]?.preferencesUrl[appGroup]['url'];
    let qParams = `siteid=${this.configService.config.appKey}&published=true`;
    if (ctxRoute) {
      qParams += `&routeparam=${ctxRoute}`;
    }
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

    return this.api.get(`${urlPrefix}orm/getSiteConfig?${qParams}`, { params: params }).pipe(
      map(data => {
        if (ctxRoute && data[0]) {
          this.configService.config.appKey = data[0].siteappid;
        }
        this.__setPreferences(data);
      })
    );
  }

  __setPreferences(preferences) {
    this.customJSON = [];
    if (_.isEmpty(preferences)) {
      // NO GROUP OR SITE PREFERENCES
      this.sitePrefJSON = null;
    } else {
      // GROUP PREFERENCE AND/OR SITE PREFERENCES DELTA AVAILABLE
      let parentPref;
      let childPref;
      let mergedPref: IPref;
      _.eachRight(preferences, prefJSON => {
        const { siteappid, customjson } = prefJSON;
        this.customJSON.push({ siteappid, customjson });
        if (!parentPref) {
          parentPref = mergedPref = JSON.parse(prefJSON['defaultjson']);
        } else {
          parentPref = mergedPref;
          childPref = JSON.parse(prefJSON['defaultjson']);
          mergedPref = this.generateSitePrefJson(parentPref, childPref);
        }
      });

      this.parentPrefDB = parentPref;
      this.sitePrefDB = childPref;
      this.sitePrefJSON = mergedPref;
    }
    this.loggerService.log(this.sitePrefJSON);
    this.loggerService.log(this.customJSON);
  }

  getPrefState(): { parent: IPref; child: IPref; merged: IPref } {
    return {
      parent: this.parentPrefDB,
      child: this.sitePrefDB,
      merged: this.sitePrefJSON
    };
  }

  hasChildPref(): boolean {
    return !!this.sitePrefDB;
  }

  hasSitePreferencesAvailable(): boolean {
    return !!this.sitePrefJSON;
  }

  get customPreferences(): Array<{ siteappid: string; customjson: string }> {
    return this?.customJSON;
  }

  generateSitePrefJson(parentPref: IPref, childPref: IPref): IPref {
    const sitePref = _.merge({}, parentPref, childPref);

    // merge left nav settings if left nav is set in group and site configs
    if (parentPref?.globalSettings?.leftNav?.navigation && childPref?.globalSettings?.leftNav?.navigation) {
      sitePref.globalSettings.leftNav.navigation = this.generateLeftNavConfig(
        parentPref.globalSettings.leftNav.navigation,
        childPref.globalSettings.leftNav.navigation
      );
    }

    if (parentPref.pageSettings && childPref.pageSettings) {
      sitePref.pageSettings = this.mergePageWidgetConfig(parentPref.pageSettings, childPref.pageSettings);
    }

    return sitePref;
  }

  private generateLeftNavConfig(parentPref: INavigation, childPref: INavigation): INavigation {
    const sitePrefNav = _.merge({}, parentPref, childPref);
    // Work around since _.merge is not working as expected with  arrays inside objects.
    sitePrefNav['_root']['order'] = _.uniq(sitePrefNav['_root']['order']);

    _.forOwn(sitePrefNav, (navData, navKey) => {
      const removedNavs = navData['__removed'] || [];
      const addedNavs = navData['__added'] || [];

      // REMOVE ALL NAV ITEMS THAT ARE REMOVED BY SITE OR GROUP ADMINS
      _.each(navData.order, childKey => {
        if (parentPref[navKey] && _.indexOf(parentPref[navKey].order, childKey) === -1 && _.indexOf(addedNavs, childKey) === -1) {
          // Item not present in parent order or child added items. Which means parent has removed the nav item.
          removedNavs.push(childKey);
        }
      });
      _.pullAll(sitePrefNav[navKey].order, removedNavs);

      // INSERT NEWLY ADDED NAV ITEMS(BY GROUP ADMIN) IN THE RESPECTIVE POSITIONS
      if (parentPref[navKey]) {
        _.each(parentPref[navKey].order, (gpChildKey, gpChildPos) => {
          if (_.indexOf(sitePrefNav[navKey].order, gpChildKey) === -1 && _.indexOf(removedNavs, gpChildKey) === -1) {
            // Nav item added by parent is not there in child's order or removed array.
            // Which means, parent has added the item post child modifications
            sitePrefNav[navKey].order.splice(gpChildPos, 0, gpChildKey);
          }
        });
      }
    });

    return sitePrefNav;
  }

  private mergePageWidgetConfig(parentPref: IPageSettings, childPref: IPageSettings): IPageSettings {
    // ASSUMED THAT THE LAYOUT IS NOT CHANGED
    const mergedPageConfig = _.merge({}, parentPref, childPref);

    _.forOwn(childPref, (pageConfig, pageKey) => {
      if (parentPref[pageKey] && pageConfig.panels) {
        // Child configuration has been updated. Added/removed/re-ordered widgets
        const layoutPanels = _.keys(_.pickBy(pageConfig.panels, (value, key) => key.indexOf('__') !== 0));
        const removedWidgets = pageConfig.panels['__removed'] || [];

        if (removedWidgets.length) {
          // Widget has been removed a few group config widgets, remove it from the merged config.
          _.each(mergedPageConfig[pageKey].panels, (widgets, panel) => {
            const tmpWidgets = _.concat([], widgets);
            _.each(widgets, (widgetKey, widgetPos) => {
              if (removedWidgets.indexOf(widgetKey) !== -1) {
                tmpWidgets.splice(tmpWidgets.indexOf(widgetKey), 1);
              }
            });
            mergedPageConfig[pageKey].panels[panel] = tmpWidgets;
          });
        }

        if (layoutPanels.length) {
          // There are panels other than __removed and __added. i.e. Widgets has been added/re-arranged
          mergedPageConfig[pageKey].panels = _.merge({}, pageConfig.panels);
          const allWidgets = _.flatten(_.values(_.pickBy(pageConfig.panels, (value, key) => key.indexOf('__') !== 0)));
          const allGpWidgets = _.flatten(_.values(parentPref[pageKey].panels));
          const addedWidgets = pageConfig.panels['__added'] || [];
          _.each(parentPref[pageKey].panels, (widgets, panel) => {
            if (panel !== '__added' && panel !== '__removed') {
              _.each(widgets, (widgetKey, widgetPos) => {
                if (
                  allWidgets.indexOf(widgetKey) === -1 &&
                  removedWidgets.indexOf(widgetKey) === -1 &&
                  mergedPageConfig[pageKey] &&
                  mergedPageConfig[pageKey].panels[panel]
                ) {
                  // New widget added to parent config. Push it to Child Config
                  const widgetPushPosition = _.min([mergedPageConfig[pageKey].panels[panel].length, widgetPos]);
                  mergedPageConfig[pageKey].panels[panel].splice(widgetPushPosition, 0, widgetKey);
                  // TO BE DONE: pushing to sitePrefDB
                }
              });
            }
          });
          const mergedPanels = _.merge({}, mergedPageConfig[pageKey].panels);
          _.each(mergedPanels, (widgets, panel) => {
            if (panel !== '__added' && panel !== '__removed') {
              _.each(widgets, (widgetKey, widgetPos) => {
                if (
                  allGpWidgets.indexOf(widgetKey) === -1 &&
                  addedWidgets.indexOf(widgetKey) === -1 &&
                  mergedPageConfig[pageKey] &&
                  mergedPageConfig[pageKey].panels[panel]
                ) {
                  // Group admin removed a widget. remove it from site panel
                  mergedPageConfig[pageKey].panels[panel].splice(mergedPageConfig[pageKey].panels[panel].indexOf(widgetKey), 1);
                  // TO BE DONE: removing to sitePrefDB
                }
              });
            }
          });
        }
      }
    });

    return mergedPageConfig;
  }

  getSitePreferences(): IPref {
    return this.sitePrefJSON;
  }

  hasSiteWidgets(): boolean {
    return this?.sitePrefJSON?.globalSettings?.features?.hasWidgets?.active ?? true;
  }

  isWidgetStoreDisplayedOnRightTrial(): boolean {
    return this?.sitePrefJSON?.globalSettings?.features?.hasWidgets?.rightTrialDisplay ?? false;
  }

  getFooterData(): IFooter {
    const footerData: IFooter = {
      top: {
        0: [{ text: '', link: '' }]
      },
      bottom: {
        LHS: [],
        RHS: []
      }
    };
    return this?.sitePrefJSON?.footer ?? footerData;
  }

  hasBreadcrumb(): boolean {
    return this?.sitePrefJSON?.globalSettings?.features?.breadCrumb?.active ?? false;
  }

  isWidgetStoreRequired(page?: string): boolean {
    if (_.isEmpty(this.sitePrefJSON)) {
      return false;
    }
    return (!!page && this.hasSiteWidgets() && this.isUserPreferenceRequired() && this.canAddWidgets(page)) ?? true;
  }

  isUserPreferenceRequired(): boolean {
    return this?.sitePrefJSON?.globalSettings?.features?.personalize?.active ?? false;
  }

  hasManagePage(): boolean {
    return this?.sitePrefJSON?.globalSettings?.features?.pageManage?.active ?? false;
  }

  canLeftNavReorder(): boolean {
    return this?.sitePrefJSON?.globalSettings?.leftNav?.settings?.reorder ?? false;
  }

  getleftNavPattern(): string {
    return this?.sitePrefJSON?.globalSettings?.pageURLPattern ?? ':section/:subsection1/:subsection2';
  }

  hasLeftNavigation(): boolean {
    return (
      this?.configService?.config?.appConfig?.showLeftNavigation ??
      !_.isEmpty(this?.sitePrefJSON?.globalSettings?.leftNav?.navigation?.['_root']?.items)
    );
  }

  getLayout(section: string): string | undefined {
    return this?.sitePrefJSON?.pageSettings?.[section]?.layout;
  }

  hasBanner(section: string): boolean {
    return this?.sitePrefJSON?.pageSettings?.[section]?.hasBanner ?? false;
  }

  hasFooterBanner(section: string): boolean {
    return this?.sitePrefJSON?.pageSettings?.[section]?.hasFooterBanner ?? false;
  }

  canAddWidgets(section: string): boolean {
    return this?.sitePrefJSON?.pageSettings?.[section]?.widgetStore ?? false;
  }

  isLayoutDraggable(section: string): boolean {
    return this?.sitePrefJSON?.pageSettings?.[section]?.draggable ?? true;
  }

  getPageWidgets(page: string, panel?: string): Array<string> | IPanels {
    if (this?.sitePrefJSON?.pageSettings[page]) {
      if (panel) {
        return this?.sitePrefJSON?.pageSettings?.[page]?.panels?.[panel]?.slice() || [];
      } else if (!panel) {
        return _.merge({}, this.sitePrefJSON.pageSettings[page].panels);
      }
    }
    return [];
  }

  getPageWidgetConfig(page: string, widget?: string): { [key: string]: any } {
    if (this?.sitePrefJSON?.pageSettings?.[page]?.widgetConfig) {
      if (widget) {
        return _.merge({}, this?.sitePrefJSON?.pageSettings?.[page]?.widgetConfig[widget] ?? {});
      }
      return _.merge({}, this.sitePrefJSON.pageSettings[page].widgetConfig);
    }
    return {};
  }

  getPageName(page: string): string | null {
    return this?.sitePrefJSON?.pageSettings?.[page]?.pageName ?? null;
  }

  getSiteParams(): { [key: string]: any } {
    return this?.sitePrefJSON?.globalSettings?.siteConfig?.params ?? {};
  }

  // Method added to retrieve the root level page items
  getSitePreferenceNavItems(parent: string): { [key: string]: any } {
    return this?.sitePrefJSON?.globalSettings?.leftNav?.navigation?.[parent]?.items ?? {};
  }

  /* Get the corresponding page details using pageKey */
  getPageSetting(page: string): { [key: string]: any } | null {
    return this?.sitePrefJSON?.pageSettings[page] ?? null;
  }

  hasPageLevelConfigEnabledForThisPage(pageName: string): boolean {
    const pageSettings = this.getPageSetting(pageName);
    return pageSettings?.pageLevelConfig ?? false;
  }

  hasPageRefreshEnabledForThisPage(pageName: string): boolean {
    const pageSettings = this.getPageSetting(pageName);
    return pageSettings?.pageRefresh ?? true;
  }

  getPanelConfig(page: string, layout: string): { [key: string]: any } {
    const panelConfig = {};
    if (this?.sitePrefJSON?.pageSettings?.[page]?.panelConfig) {
      const layoutPanels = Layouts[layout].panels;
      _.each(layoutPanels, panel => {
        if (this.sitePrefJSON.pageSettings[page].panelConfig[panel]) {
          panelConfig[panel] = this.sitePrefJSON.pageSettings[page].panelConfig[panel];
        }
      });
    }
    return panelConfig;
  }

  isCapabilityEnabled(page: string): boolean {
    const rootLevelItems = this.sitePrefJSON?.globalSettings?.leftNav?.navigation?._root?.items ?? {};
    return _.values(rootLevelItems).filter(p => p.page === page).length > 0;
  }

  setKeyToSitePreferences(parentAppId: string, unit: string, key: string, data: any): Observable<any> {
    this.sitePrefDB[key] = data;
    return this.updateSitePreferencesDB(parentAppId, unit, this.sitePrefDB);
  }

  getKeyFromSitePreferences(key: string): Partial<IPref> {
    return this?.sitePrefDB?.[key];
  }
  // !!!The below method should be used & update with caution.!!!
  // At present, this is tailored to use only for Units application.
  updateSitePreferencesDB(parentAppId: string, unit: string, json: any): Observable<any> {
    const config = this.configService.config;
    const appEnv = config.appConfig.appEnv;
    const appGroup = config.appGroup;
    const urlPrefix = this.preferencesUrlService.FWConstants.environment[appEnv].preferencesUrl[appGroup]['url'];
    const isSecure = this?.configService?.config?.preferenceSecure;
    const isMSALAuth = this?.configService?.config?.enableMSAL;
    if (config.appKey === 'APP001') {
      return throwError({
        error: `Request Blocked: You're trying to modify the parent configuration`
      });
    }
    const params = {
      siteId: config.appKey,
      siteName: config.siteName,
      version: '1.0.0',
      defJson: JSON.stringify(json),
      parentAppId: parentAppId,
      routeParam: unit
    };
    const prefResource = {};
    if (isSecure) {
      prefResource['prefUrl'] = this.preferencesUrlService?.FWConstants?.environment[appEnv]?.preferencesUrl[appGroup]['rtokenUrl'];
      if (isMSALAuth) {
        prefResource['prefUrl'] =
          this.preferencesUrlService?.FWConstants?.environment[appEnv]?.preferencesUrl[appGroup]['rtokenUrl'] + '/user_impersonation';
      }
    }

    const httpParams = new HttpParams({
      fromObject: prefResource
    });
    const isPublishedParams = _.merge({}, params, { isPublish: true });
    const isDraftParams = _.merge({}, params, { isPublish: false });
    return forkJoin([
      this.api.post(`${urlPrefix}updateSiteConfig`, isPublishedParams, {
        params: httpParams
      }),
      this.api.post(`${urlPrefix}updateSiteConfig`, isDraftParams, {
        params: httpParams
      })
    ]);
  }

  updateCustomJSON(json: { [key: string]: any }): Observable<any> {
    const config = this.configService.config;
    const appEnv = config.appConfig.appEnv;
    const appGroup = config.appGroup;
    const urlPrefix = this.preferencesUrlService.FWConstants.environment[appEnv].preferencesUrl[appGroup]['url'];
    const isSecure = this?.configService?.config?.preferenceSecure;
    const isMSALAuth = this?.configService?.config?.enableMSAL;
    if (config.appKey === 'APP001') {
      return throwError({
        error: `Request Blocked: You're trying to modify the parent configuration`
      });
    }
    const params = {
      siteappid: config.appKey,
      customjson: JSON.stringify(json)
    };

    const prefResource = {};
    if (isSecure) {
      prefResource['prefUrl'] = this.preferencesUrlService?.FWConstants?.environment[appEnv]?.preferencesUrl[appGroup]['rtokenUrl'];
      if (isMSALAuth) {
        prefResource['prefUrl'] =
          this.preferencesUrlService?.FWConstants?.environment[appEnv]?.preferencesUrl[appGroup]['rtokenUrl'] + '/user_impersonation';
      }
    }

    const httpParams = new HttpParams({
      fromObject: prefResource
    });
    const isPublishedParams = _.merge({}, params, { ispublished: true });
    const isDraftParams = _.merge({}, params, { ispublished: false });
    return forkJoin([
      this.api
        .post(`${urlPrefix}SaveCustomConfig`, isPublishedParams, {
          params: httpParams
        })
        .pipe(
          tap(() => {
            this.syncCustomJSONChanges(params);
          })
        ),
      this.api.post(`${urlPrefix}SaveCustomConfig`, isDraftParams, {
        params: httpParams
      })
    ]);
  }

  isSitePreferenceAvailable(): boolean {
    return !_.isEmpty(this.sitePrefJSON);
  }

  private syncCustomJSONChanges(input: { siteappid: string; customjson: string }): void {
    const index = this.customJSON.findIndex(item => item.siteappid === input.siteappid);
    if (index > -1) {
      this.customJSON[index].customjson = input.customjson;
    }
  }

  getSiteName(): string {
    return this?.sitePrefJSON?.['metadata']?.appName ?? '';
  }
}
