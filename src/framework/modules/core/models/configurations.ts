import { Component } from '@angular/core';
import { IOmnitureConfig, IOmniturePages, SiteType } from './../../omniture/omniture.model';
import { App } from './launcher.model';

export interface Configurations {
  siteName: string;
  appKey?: string;
  appGroup: appGroups | string;
  contextParams?: string;
  landingPageUrlPattern?: string;
  adalConfig?: any;
  resources?: string[];
  resourcesTokenUrlMap?: { [key: string]: ResourceTokenUrl };
  omniture?: Omniture;
  pageConfigComponent?: Component;
  siteTitleComponent?: Component;
  searchComponent?: Component;
  appConfig?: AppConfig;
  widgets?: any;
  widgetsConfig?: any;
  widgetCategories?: any;
  logging?: boolean;
  pageBanners?: KeyComponentMap;
  pageFooterBanners?: KeyComponentMap;
  preferencesMode?: PrefMode;
  preferencePath?: PrefPath;
  preferenceSecure?: boolean;
  sitePreferencesURL?: PreferencesUrls;
  appHeader?: { component: Component; input?: any };
  customSettings?: { component: Component; input?: any };
  enableMSAL?: boolean;
  initialScope?: string;
}

export interface AppConfig {
  enableInterceptor?: boolean;
  appEnv: Environments;
  emsLoginEnabled: boolean;
  authorizations?: Authorizations;
  defaultLayout?: Layouts;
  theme?: Themes;
  layoutCalculation?: boolean;
  wbTopAndBottom?: WbHeaderFooter;
  adminUrl?: string;
  showAdminLink?: boolean;
  customAction?: { component: Component; input: any };
  userProfile?: UserProfile;
  customLeftNavMenu?: boolean;
  customAddOnOptionForHeaderComponent?: { component: Component; input: any; text: string };
  splashScreen?: boolean;
  appInsightsKey?: string;
  appInfo?: AppInfo;
  useEventTrackingforAppInsights?: boolean;
  flyOutSubMenu?: boolean;
  customLauncherApps?: App[];
  showLeftNavigation?: boolean;
  pragmaOnRequestHeader?: boolean;
  graphCallOnAppLaunch?: boolean;
}

export interface AppInfo {
  version: string;
  buildDate: string;
}

export enum Environments {
  prod = <any>'PROD',
  prod1 = <any>'PROD1',
  prod2 = <any>'PROD2',
  prodx = <any>'PRODX',
  uat = <any>'UAT',
  uatx = <any>'UATX',
  qa = <any>'QA',
  qa1 = <any>'QA1',
  qa2 = <any>'QA2',
  qax = <any>'QAX',
  dev = <any>'DEV',
  dev1 = <any>'DEV1',
  dev2 = <any>'DEV2',
  devx = <any>'DEVX',
  local = <any>'LOCAL'
}

export enum Layouts {
  BOXED = 'boxed',
  FLUID = 'fluid'
}

export enum Themes {
  THEME1 = 'cf-theme1',
  THEME2 = 'cf-theme2',
  THEME3 = 'cf-theme3',
  THEME4 = 'cf-theme4',
  THEME5 = 'cf-theme5'
}

export interface KeyComponentMap {
  [key: string]: Component;
}

export enum PrefMode {
  local = 'local',
  service = 'service'
}

export enum appGroups {
  units = 'units',
  units1 = 'units1',
  units2 = 'units2',
  unitsc = 'unitsc',
  projects = 'projects',
  projects1 = 'projects1',
  projects2 = 'projects2',
  trustFunds = 'trustFunds',
  trustFunds1 = 'trustFunds1',
  trustFunds2 = 'trustFunds2',
  oneSpace = 'oneSpace',
  oneSpace1 = 'oneSpace1',
  oneSpace2 = 'oneSpace2',
  sites = 'sites',
  sites1 = 'sites1',
  sites2 = 'sites2',
  customApps = 'customApps',
  customApps1 = 'customApps1',
  customApps2 = 'customApps2'
}

export interface PrefPath {
  sitePreferencesPath?: string;
  widgetPreferencesPath?: string;
}

export interface Authorizations {
  crmLicenseCheck?: boolean;
  crmHostUrl?: string;
  crmAppId?: string;
  crmErrorRoute?: string;
}

export interface Omniture {
  config: IOmnitureConfig;
  pageInfo: IOmniturePages;
  siteType: SiteType;
  misc?: any;
  disableOmnitureReporting: boolean;
}
export interface WbHeaderFooter {
  header: boolean;
  footer: boolean;
}

export interface ConfigItems {
  siteName?: string;
  landingPageUrlPattern?: string;
}

export interface ResourceTokenUrl {
  tokenUrl: string;
}

export interface UserProfile {
  showProfile: boolean;
  profileButton?: boolean;
  signoutButton?: boolean;
}
export interface PreferencesUrls {
  environment: {
    PROD?: {
      preferencesUrl: {
        [key: string]: {
          url: string;
          rtokenUrl: string;
        };
      };
    };
    PROD1?: {
      preferencesUrl: {
        [key: string]: {
          url: string;
          rtokenUrl: string;
        };
      };
    };
    PROD2?: {
      preferencesUrl: {
        [key: string]: {
          url: string;
          rtokenUrl: string;
        };
      };
    };
    UAT?: {
      preferencesUrl: {
        [key: string]: {
          url: string;
          rtokenUrl: string;
        };
      };
    };
    UATX?: {
      preferencesUrl: {
        [key: string]: {
          url: string;
          rtokenUrl: string;
        };
      };
    };
    QA?: {
      preferencesUrl: {
        [key: string]: {
          url: string;
          rtokenUrl: string;
        };
      };
    };
    QA1?: {
      preferencesUrl: {
        [key: string]: {
          url: string;
          rtokenUrl: string;
        };
      };
    };
    QA2?: {
      preferencesUrl: {
        [key: string]: {
          url: string;
          rtokenUrl: string;
        };
      };
    };
    DEV?: {
      preferencesUrl: {
        [key: string]: {
          url: string;
          rtokenUrl: string;
        };
      };
    };
    DEV1?: {
      preferencesUrl: {
        [key: string]: {
          url: string;
          rtokenUrl: string;
        };
      };
    };
    DEV2?: {
      preferencesUrl: {
        [key: string]: {
          url: string;
          rtokenUrl: string;
        };
      };
    };
    LOCAL?: {
      preferencesUrl: {
        [key: string]: {
          url: string;
          rtokenUrl: string;
        };
      };
    };
  };
}
