import { Launcher } from './launcher.model';
import { LeftNavSettings, LeftNav } from './leftNav.model';

export interface IPref {
  globalSettings: GlobalSettings;
  pageSettings: IPageSettings;
  launcher: Launcher;
  metadata: IMetadata;
  tophat: ITophat;
  footer: IFooter;
  maintenance?: IMaintenance;
}

export interface IHasWidgets extends IActive {
  rightTrialDisplay?: boolean;
}

export interface GlobalSettings {
  analytics: {
    omniture: boolean;
    eum: boolean;
  };
  features: {
    breadCrumb: IActive;
    hasWidgets: IHasWidgets;
    pageManage: IActive;
    personalize: IActive;
  };
  leftNav: {
    navigation: INavigation;
    settings: { collapsed: boolean; canToggle: boolean; reorder: boolean };
  };
  pageURLPattern: string;
  siteConfig: {
    name: string;
    params: { [key: string]: any };
  };
}

export interface IActive {
  active: boolean;
}

export interface ILeftNavItem {
  active: boolean;
  category: string;
  managable: boolean;
  page: string;
  text: string;
  settings?: LeftNavSettings;
}

export interface INavigation {
  [nav: string]: {
    items: { [key: string]: LeftNav };
    level: number;
    order: Array<string>;
    __added?: Array<string>;
    __removed?: Array<string>;
  };
}

export interface IPageSettings {
  [page: string]: {
    draggable: boolean;
    editTitle: boolean;
    hasBanner: boolean;
    hasFooterBanner?: boolean;
    layout: string;
    navTitle: string;
    pageLevelConfig: boolean;
    pageName: string;
    pageType: string;
    panelConfig: { [key: string]: IPanelConfig };
    panels: IPanels;
    widgetConfig: IWidgetConfig;
    widgetStore: boolean;
    pageRefresh?: boolean;
  };
}

export interface IPanelConfig {
  locked: boolean;
}

export interface IPanels {
  [key: string]: Array<string>;
}

export interface IWidgetConfig {
  [key: string]: {
    removable: boolean;
    hasHeader: boolean;
  };
}

export interface IMetadata {
  appName: string;
  date: string;
  version: string;
}

export interface ITophat {
  links: {
    LHS: Array<ITextAndLink>;
    RHS: Array<ITextAndLink>;
  };
}

export interface ITextAndLink {
  text: string;
  link: string;
}

export interface IFooter {
  bottom: {
    LHS?: Array<ITextAndLink>;
    RHS?: Array<ITextAndLink>;
  };
  top: { [key: number]: Array<ITextAndLink> };
}

export interface IMaintenance {
  display: boolean;
  message: string;
}
