export interface WidgetOutput {
  header?: WidgetHeader;
}

export interface WidgetHeader {
  count?: number;
  title?: string;
  subTitle?: string;
  icon?: string;
}

export interface WidgetCategory {
  [key: string]: string;
}

export interface Widget {
  createdby: string;
  createddate: string;
  enableforupis: string;
  isWidDisable: boolean;
  isWidMultiple: boolean;
  ismobiledisabled: boolean;
  lastmodifiedby: string;
  modifieddate: string;
  siteappid: string;
  storeDisplayEnabled: boolean;
  widJson: string;
  widgetCategory: string;
  widgetKey: string;
  widgetName: string;
  widgetPosition: string;
  include?: any;
  exclude?: any;
  added?: any;
}
