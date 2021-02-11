import { Component } from '@angular/core';
import { Configurations, Environments, PrefMode, appGroups, Layouts, Themes } from '@framework/core/models/configurations';
import { environment } from '@env/environment';
import { Config, Pages } from './analytics/omniture.data';
import { SiteType } from '@framework/omniture/omniture.model';
import { appWidgets, widgetCategories } from './components/widgets/app-widget.constant';

import { SearchComponent } from './components/search/search.component';
import { BannerComponent } from './components/banner/banner.component';
import { CustomActionsComponent } from './components/custom-actions/custom-actions.component';
import { PageConfigComponent } from './components/page-config/page-config.component';

export const frameworkConfig: Configurations = {
  siteName: 'Core Framework',
  landingPageUrlPattern: '/app-landing',
  appKey: 'APP0053',
  appGroup: appGroups[environment.appGroup],
  adalConfig: environment.adalConfig,
  resources: environment.RESOURCES,
  resourcesTokenUrlMap: environment.resourceUrlMap,
  pageConfigComponent: PageConfigComponent as Component,
  omniture: {
    config: Config,
    pageInfo: Pages,
    siteType: SiteType.Intranet,
    disableOmnitureReporting: false
  },
  appConfig: {
    enableInterceptor: environment.isMSALAuth ? false : true,
    appEnv: Environments[environment.appEnv],
    emsLoginEnabled: true,
    authorizations: {
      crmLicenseCheck: false,
      crmHostUrl: environment.crmLicenseHost,
      crmAppId: environment.crmAppId
    },
    defaultLayout: Layouts.BOXED,
    theme: Themes.THEME5,
    wbTopAndBottom: {
      header: true,
      footer: true
    },
    adminUrl: '/admin',
    userProfile: {
      showProfile: true,
      signoutButton: true,
      profileButton: true
    },
    customAction: { component: CustomActionsComponent as Component, input: { a: 1 } },
    customLeftNavMenu: false,
    splashScreen: true,
    appInfo: {
      buildDate: '10 Mar 2020',
      version: '1.0.0'
    },
    flyOutSubMenu: true,
    pragmaOnRequestHeader: false
  },
  logging: false,
  widgets: appWidgets,
  widgetCategories: widgetCategories,
  pageBanners: { page3: BannerComponent as Component },
  searchComponent: SearchComponent as Component,
  preferencesMode: PrefMode.service,
  preferencePath: {
    sitePreferencesPath: '../../assets/json/sitePreferences.json',
    widgetPreferencesPath: '../../assets/json/widgetPreferences.json'
  },
  preferenceSecure: true,
  enableMSAL: environment.isMSALAuth,
  initialScope: environment.initialScope
};
