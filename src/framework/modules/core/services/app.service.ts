import { ConfigurationService } from './configuration.service';
import { Injectable, Component } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Header, HeaderControls } from '../models/header.model';
import { _ } from './../../../lodash';
import { User } from './../models/user.model';
import { ConfigItems } from '../models/configurations';
import { BreadcrumbItem } from '../models/breadcrumb.model';
import { LeftNav, LeftNavBack } from '../models/leftNav.model';
import { Params } from '@angular/router';
import { ICapabilitySelected } from '../models/capability.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private appData = {};
  private leftNavModel: Array<LeftNav> = [];
  private headerModel: Header = {
    title: '',
    breadcrumb: [],
    addWidget: true,
    resetWidget: true,
    pageConfigComponent: null,
    addPages: true,
    pageRefresh: true,
    userInfo: true,
    adminLink: true
  };
  private siteContext: any;
  public header$ = new BehaviorSubject<Header>(this.headerModel);

  public appDataChanged$ = new BehaviorSubject<any>({});
  public showHeader$ = new BehaviorSubject<boolean>(true);
  public showFooter$ = new BehaviorSubject<boolean>(
    this.configService.config.appConfig.wbTopAndBottom ? this.configService.config.appConfig.wbTopAndBottom.footer : true
  );
  public message$ = new Subject<any>();
  public showLeftNav$ = new BehaviorSubject<boolean>(this?.configService?.config?.appConfig?.showLeftNavigation ?? true);
  public leftNavRoute$ = new BehaviorSubject<Params>({});
  public widgetStoreRoute$ = new BehaviorSubject<{ [key: string]: any }>({});
  public extUser$ = new BehaviorSubject<User>({
    upi: '',
    name: '',
    location: '',
    unit: '',
    designation: ''
  });
  public hideWidgets$ = new Subject<Array<string>>();
  public hideLeftMenuItem$ = new BehaviorSubject<{ id: string; blink: boolean; state: boolean | undefined; property: string }>(null);
  public leftNavModel$ = new BehaviorSubject<{ model: Array<LeftNav>; back?: LeftNavBack }>({
    model: [],
    back: { text: null, route: null }
  });
  public changeSiteTitle$ = new BehaviorSubject<{ title: string; link: string }>({
    title: this.configService.config.siteName,
    link: this.configService.config.landingPageUrlPattern
  });
  public contextChanged$ = new Subject<{ [key: string]: any }>();
  public pageReset$ = new Subject<boolean>();
  public pageRefresh$ = new Subject<string>();
  public loadRightNavPage$ = new Subject<{
    title: string;
    component: Component;
    status: boolean;
    input?: any;
  }>();
  public toggleRightNav$ = new Subject<boolean>();
  public toggleSiteTitle$ = new BehaviorSubject<boolean>(true);
  public toggleBreadcrumb$ = new BehaviorSubject<boolean>(true);
  public contentLoader$ = new BehaviorSubject<boolean>(false);
  public userInfo$ = new Subject<User>();
  public navigateToMenuItem$ = new Subject<string>();
  public configItemChange$ = new BehaviorSubject<ConfigItems>({
    landingPageUrlPattern: this.configService.config.landingPageUrlPattern,
    siteName: this.configService.config.siteName
  });
  public platformReady$ = new BehaviorSubject<boolean>(false);
  public Rightrailstate$ = new Subject<boolean>();
  public leftNavstate$ = new Subject<boolean>();
  public toggleAdminLink$ = new BehaviorSubject<boolean>(this?.configService?.config?.appConfig?.showAdminLink ?? false);
  public layoutRenderComplete$ = new Subject<boolean>();
  public beforelayoutStart$ = new Subject<boolean>();
  public maintenanceNotification$ = new BehaviorSubject<string>('');
  public hideWidget$ = new Subject<string>();
  public showWidget$ = new Subject<string>();
  public actionsMenuToggle$ = new BehaviorSubject<boolean>(false);
  public headerControls$ = new BehaviorSubject<HeaderControls>({
    search: true,
    actions: true,
    settings: true,
    user: true,
    customIcon1: { class: '', label: '', tooltip: '' },
    customIcon2: { class: '', label: '', tooltip: '' }
  });
  public breadCrumbClick$ = new Subject<{ item: BreadcrumbItem; queryParams: any; list: Array<BreadcrumbItem> }>();
  public layoutChanged$ = new Subject<string>();
  public leftNavModelReady$ = new BehaviorSubject<Array<LeftNav>>([]);
  public toggleAppHeader$ = new BehaviorSubject<boolean>(!!this.configService.config.appHeader);
  public routeParams$ = new BehaviorSubject<{ [key: string]: string }>(undefined);
  public selectedCapability$ = new BehaviorSubject<ICapabilitySelected>(undefined);
  public mobileMenuToggle$ = new Subject<boolean>();
  public leftNavUpdated$ = new BehaviorSubject<Array<LeftNav>>([]);
  public toggleSiteInfo$ = new BehaviorSubject<boolean>(true);
  public customHeaderIconClick$ = new Subject<'ICON1' | 'ICON2'>();
  public userPreferenceUpdated$ = new Subject<{ [key: string]: any }>();
  public isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  public showProfile$ = new Subject<boolean>();

  constructor(private configService: ConfigurationService) {}
  // Global handler for setting the header, this emits the header information as observable
  // from the root application which can be consumed by any entity in the app!
  setHeader(header: Header) {
    this.headerModel = _.merge({}, this.headerModel, header);
    if (header.breadcrumb) {
      this.headerModel.breadcrumb = header.breadcrumb;
    }
    this.header$.next(this.headerModel);
  }

  getHeader() {
    return this.headerModel;
  }

  setSiteContext(data: { [key: string]: any }): void {
    if (!this.siteContext) {
      this.siteContext = data;
      this.contextChanged$.next(this.siteContext);
    } else {
      const mergeCtx = _.merge({}, this.siteContext, data);
      if (!_.isEqual(mergeCtx, this.siteContext)) {
        this.siteContext = mergeCtx;
        this.contextChanged$.next(this.siteContext);
      }
    }
  }

  getSiteContext(key?: string): any {
    if (key) {
      return this.siteContext[key];
    }
    return this.siteContext;
  }

  setAppData(key: string, value: any, emitEvent = true) {
    this.appData[key] = value;
    if (emitEvent) {
      this.appDataChanged$.next(this.appData);
    }
  }

  getAppData(key?: string): any {
    if (key) {
      return this.appData[key];
    }
    return this.appData;
  }

  getLeftNavModel() {
    return this.leftNavModel;
  }

  setLeftNavModel(model: Array<LeftNav>, back?: LeftNavBack) {
    this.leftNavModel = model;
    this.leftNavModel$.next({ model, back });
  }

  populateTheLeftNavModel(model: Array<LeftNav>) {
    this.leftNavModel = model;
    this.leftNavUpdated$.next(model);
  }
}
