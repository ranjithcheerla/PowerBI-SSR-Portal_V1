export interface IOmnitureConfig {
  siteLanguage: string;
  siteCountry: string;
  siteEnv: string;
  cmsType: string;
  bussVPUnit: string;
  bussUnit: string;
  bussUserGroup: string;
  bussAgency: string;
  siteType: string;
}

export interface IOmniturePages {
  [key: string]: IOmniturePageInfo;
}

export interface IOmniturePageInfo {
  pageName: string;
  pageCategory: string;
  pageUid: string;
  channel: string;
  contentType: string;
  pageFirstPub: string;
  pageLastMod: string;
  siteSection: string;
  bussVPUnit: string;
  bussUnit: string;
}

export interface IOmnitureSearch {
  searchTerm: string;
  tab: string;
  searchType: string;
  searchResults: string;
  searchfilter: string;
  section: string;
  pagination: string;
  sortBy: string;
}

export enum SiteType {
  Intranet = 'Intranet',
  Extranet = 'Extranet'
}

export interface IOmnitureUserInfo {
  jobTitle: string;
  org: string;
  dept: string;
  vpuUnit: string;
  officeLocation: string;
  coOrigin: string;
  upi: string;
}
