import { Injectable } from '@angular/core';
import { ConfigurationService } from './../core/services/configuration.service';
import { LoggerService } from './../core/services/logger.service';
import { IOmnitureSearch, SiteType, IOmnitureUserInfo } from './omniture.model';

declare let wbgData: any;
declare var _satellite: any;
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class OmnitureService {
  constructor(private configService: ConfigurationService, private loggerService: LoggerService) {}

  sendDataToOmniture(pageId: string, isSearchPage = false, searchData?: IOmnitureSearch, userInfo?: IOmnitureUserInfo): void {
    const pageInfo = this.configService.config.omniture.pageInfo[pageId];
    const config = this.configService.config.omniture.config;
    if (pageInfo === null || pageInfo === undefined) {
      this.loggerService.log(`No ${pageId} is found to send Omniture Analytics.`);
      return;
    }

    wbgData.page = {
      pageInfo: {
        pageName: pageInfo?.pageName,
        pageCategory: pageInfo?.pageCategory,
        pageUid: pageInfo?.pageUid,
        pageFirstPub: pageInfo?.pageFirstPub,
        pageLastMod: pageInfo?.pageLastMod,
        channel: pageInfo?.channel,
        contentType: pageInfo?.contentType
      },
      sectionInfo: {
        siteSection: pageInfo?.siteSection,
        subsectionP2: ''
      }
    };

    wbgData.site = {
      pageLoad: 'N',
      siteInfo: {
        siteLanguage: config?.siteLanguage,
        siteType: config?.siteType,
        siteCountry: config?.siteCountry,
        siteEnv: config?.siteEnv
      },
      techInfo: {
        cmsType: config?.cmsType,
        bussVPUnit: pageInfo?.bussVPUnit,
        bussUserGroup: config?.bussUserGroup,
        bussAgency: config?.bussAgency,
        bussUnit: pageInfo?.bussUnit
      }
    };

    if (isSearchPage && (searchData !== undefined || searchData !== null)) {
      wbgData.siteSearch = {
        searchTerm: searchData?.searchTerm,
        tab: searchData?.tab,
        searchType: searchData?.searchType,
        searchResults: searchData?.searchResults,
        searchfilter: searchData?.searchfilter,
        section: searchData?.section,
        pagination: searchData?.pagination,
        sortBy: searchData?.sortBy
      };
    }

    if (this?.configService?.config?.omniture?.siteType === SiteType.Intranet) {
      wbgData.intranet = {
        internalInfo: {
          intJobTitle: userInfo?.jobTitle,
          intOrg: userInfo?.org,
          intCorpDept: userInfo?.org,
          intVPUnit: userInfo?.vpuUnit,
          intCoOrigin: userInfo?.coOrigin,
          intOffLocation: userInfo?.officeLocation,
          intUid: userInfo?.upi
        }
      };
    }

    this.loggerService.log(wbgData);
    if (window._satellite) {
      _satellite.track('dynamicdata');
    }
  }
}
