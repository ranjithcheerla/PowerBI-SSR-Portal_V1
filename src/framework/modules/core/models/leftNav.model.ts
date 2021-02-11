export interface LeftNav {
  prefixIconClass?: string;
  suffixIconClass?: string;
  active: boolean;
  appkey?: string;
  key: string;
  cKey?: string;
  managable: boolean;
  page: string;
  route: string;
  routeActive: boolean;
  text: string;
  category?: string;
  settings?: LeftNavSettings;
  children?: Array<LeftNav>;
  separator?: boolean;
  queryParams?: { [key: string]: string | number };
  blinkMenu?: boolean;
  external?: { url: string; target: string };
}

export interface LeftNavSettings {
  collapsed: boolean;
  leftNavType: 'expand' | 'drilldown';
  loadPage: boolean;
}

export interface LeftNavBack {
  text: string | null;
  route: string | null;
}
