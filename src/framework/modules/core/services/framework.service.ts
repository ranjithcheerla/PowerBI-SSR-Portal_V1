import { Injectable, Component, Injector } from '@angular/core';
import { Api } from './api.service';
import { Observable, Subject } from 'rxjs';
import { Header, HeaderControls } from '../models/header.model';
import { AppService } from './app.service';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { UserPreferenceService } from './userpreference.service';
import { WidgetstoreService } from './widgetstore.service';
import { Params, Router, NavigationExtras } from '@angular/router';
import { SitePreferenceService } from './sitepreference.service';
import { ConfigurationService } from './configuration.service';
import { Configurations, ConfigItems } from './../models/configurations';
import { User } from './../models/user.model';
import { CacheService } from './cache.service';
import { OmnitureService } from './../../omniture/omniture.service';
import { IOmnitureSearch, IOmnitureUserInfo } from './../../omniture/omniture.model';
import { AppInsightsService } from './app-insights.service';
import { LeftNav, LeftNavBack } from '../models/leftNav.model';
import { Widget } from '../models/widget.model';
import { map, filter } from 'rxjs/operators';
import { BreadcrumbItem } from '../models';
import { ICapabilitySelected } from '../models/capability.model';
import { SplashscreenService } from './splashscreen.service';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { IPref } from '../models/preferences.model';
import { Store } from '../types/store.type';
import { MsalService } from './../../../msal/msal.service';
import { AuthenticationResult, SilentRequest } from '@azure/msal-browser';
import { AdalService } from './adal.service';

@Injectable({
  providedIn: 'root'
})
export class FrameworkService {
  public menuBack$ = new Subject<any>();

  constructor(
    private api: Api,
    private appService: AppService,
    private storage: StorageService,
    private userService: UserService,
    private userPreferences: UserPreferenceService,
    private sitePreferenceService: SitePreferenceService,
    private widgetStoreService: WidgetstoreService,
    private configService: ConfigurationService,
    private msalService: MsalService,
    private injector: Injector,
    private cacheService: CacheService,
    private omnitureService: OmnitureService,
    private appInsightsService: AppInsightsService,
    private splashscreenService: SplashscreenService,
    private adalService: AdalService
  ) {}
  /**
   * CAUTION: This method is intended to use by internal Core Framework and shouldn't be used by App Teams!
   * @param params URL params
   * @returns VOID
   */
  public __setleftNavRoute(params: Params): void {
    return this.appService.leftNavRoute$.next(params);
  }
  /**
   * CAUTION: This method is intended to use by internal Core Framework and shouldn't be used by App Teams!
   * @param params URL params
   * @returns VOID
   */
  public __setWidgetStoreRoute(params: Params): void {
    this.appService.widgetStoreRoute$.next(params);
  }

  /**
   * Wrapper method for HTTP Get method
   * @param url the url for Get operation
   * @param httpOptions Optional. Http options if any! Please refer the HTTPClient for various options.
   * (https://angular.io/api/common/http/HttpClient#get)
   * @returns Obervable with the HTTPResponse with a response body in the requested type
   */
  public apiHttpGet<T>(url: string, httpOptions?: {}): Observable<T> {
    return this.api.get<T>(url, httpOptions);
  }
  /**
   * Wrapper method for HTTP Post method
   * @param url the url for Post operation
   * @param body content for the Post Body
   * @param httpOptions Optional. Http options if any! Please refer the HTTPClient for various options.
   * (https://angular.io/api/common/http/HttpClient#post)
   * @returns obervable with the results
   */
  public apiHttpPost<T>(url: string, body: any, httpOptions?: {}): Observable<T> {
    return this.api.post<T>(url, body, httpOptions);
  }

  /**
   * Wrapper method for HTTP delete method
   * @param url the url for delete operation
   * @param httpOptions Optional. Http options if any! Please refer the HTTPClient for various options.
   * (https://angular.io/api/common/http/HttpClient#delete)
   * @returns obervable with the results
   */
  public apiHttpDelete<T>(url: string, httpOptions?: {}): Observable<T> {
    return this.api.delete<T>(url, httpOptions);
  }

  /**
   * Wrapper method for HTTP Patch method
   * @param url the url for Patch operation
   * @param body content for the Post Body
   * @param httpOptions Optional. Http options if any! Please refer the HTTPClient for various options.
   * (https://angular.io/api/common/http/HttpClient#patch)
   * @returns obervable with the results
   */
  public apiHttpPatch<T>(url: string, body: any, httpOptions?: {}): Observable<T> {
    return this.api.patch<T>(url, body, httpOptions);
  }

  /**
   * Wrapper method for HTTP Put method
   * @param url the url for Put operation
   * @param body content for the Put Body
   * @param httpOptions Optional. Http options if any! Please refer the HTTPClient for various options.
   * (https://angular.io/api/common/http/HttpClient#put)
   * @returns obervable with the results
   */
  public apiHttpPut<T>(url: string, body: any, httpOptions?: {}): Observable<T> {
    return this.api.put<T>(url, body, httpOptions);
  }
  /**
   * Set Header configuration - title, breadcrumb, add Widget link etc.,
   * @param header is of Header type
   * @returns FrameworkService
   */
  public apiSetHeader(header: Header): FrameworkService {
    this.appService.setHeader(header);
    return this;
  }
  /**
   * Returns the current header configuration of type `Header`
   */
  public apiGetHeader(): Header {
    return this.appService.getHeader();
  }
  /**
   * Show or hide the App Shell Header.
   * @param state takes `boolean` input and based on that it shows and hides the header. Defaults to `true`
   * @returns FrameworkService
   */
  public apiToggleHeader(state: boolean = true): FrameworkService {
    this.appService.showHeader$.next(state);
    return this;
  }

  /**
   * Show or hide footer of the page
   * @param status takes `boolean` input and based on that it shows and hides the footer.
   * `true` value shows the footer and `false` hides the footer
   * @returns FrameworkService
   */
  public apiToggleFooter(status: boolean): FrameworkService {
    this.appService.showFooter$.next(status);
    return this;
  }
  /**
   * Show or hide left navigation bar
   * @param status takes `boolean` input and based on that it shows and hides the left menu.
   * @returns FrameworkService
   */
  public apiToggleLeftNav(status: boolean): FrameworkService {
    this.appService.showLeftNav$.next(status);
    return this;
  }

  /**
   * Get the site context data, may be specific to groups like Units where unit code is important to render the site.
   * @param data - Object with key - value pair
   * @returns FrameworkService
   */
  public apiSetSiteContext(data: { [key: string]: any }): FrameworkService {
    this.appService.setSiteContext(data);
    return this;
  }

  /**
   *  Returns the value for the corresponding key. If no match found, it returns the full object.
   * @param key Optional. key to retrieve the corresponding value in the context.
   * @returns `any`
   */
  public apiGetSiteContext(key?: string): any {
    return this.appService.getSiteContext(key);
  }

  /**
   * Store data at Application level. It also triggers AppDataChanged event which you can
   * subscribe for any change App level data change notifications.
   * @param key `string` type as key
   * @param value `any` type for the value.
   * @return FrameworkService
   */
  public apiSetAppData(key: string, value: any): FrameworkService {
    this.appService.setAppData(key, value);
    return this;
  }

  /**
   * Returns the data for the key. If no match found, it returns the full object.
   * @param key `string` to retrieve the corresponding value against the key.
   * @returns FrameworkService
   */
  public apiGetAppData(key: string): any {
    return this.appService.getAppData(key);
  }

  /**
   * Allows to set the user context incase of Authentication mechanism other than the default (EMS). You must call this method,
   * if you wish to skip the default authentication and use your own Authentication like Siteminder etc.,
   * You may have to call this method in the App Component which is ideal place for this API method.
   * @param user takes `User` type
   * @return FrameworkService
   * */
  public apiSetExternalUser(user: User): FrameworkService {
    this.userService.setExternalUser(user);
    this.appService.extUser$.next(user);
    this.appService.extUser$.complete();
    return this;
  }
  /**
   * Returns the defined `User` type set via `apiSetExternalUser` method.
   * @return `User` type
   */
  public apiGetExternalUser(): User {
    return this.userService.getExternalUser();
  }
  /**
   * Retrieve the value stored for the corresponding key.
   * @param key to retrieve the specific value of the key stored in the localStorage of browser!
   * @param store `Store` type  accepts - 'local' or 'session' which corresponds to respective type.
   * @returns `Observable<string>` result of the browser API.
   */
  public apiStorageGet(key: string, store: Store = 'local'): Observable<string> {
    return this.storage.get(key, store);
  }
  /**
   * Store the value for the specific key to localStorage!
   * @param key unique string. If duplicate exists, it overwrites.
   * @param value Consider `JSON.Stringify()` the value.
   * @param store `Store` type  accepts - 'local' or 'session' which corresponds to respective type.
   * @return `Observable<string>` with 'success' for success 'failure' if it failed to retrieve.
   */
  public apiStorageSet(key: string, value: any, store: 'local' | 'session' = 'local'): Observable<string> {
    return this.storage.set(key, value, store);
  }

  /**
   * Returns the logged in user email id. If EMS Authentication is enabled, then it returns the logged in person's email id.
   * If third party login is enabled, then the custom set email id will be retrieved.
   * @return `string` type of the logged in user email.
   */
  public apiGetLoggedUserEmail(): string {
    if (this.configService.config.enableMSAL) {
      const isUserLogged = this?.msalService?.getAllAccounts()?.length > 0;
      return isUserLogged ? this.msalService.getAllAccounts()?.[0]?.username : null;
    } else {
      return this.adalService.isLogged ? this.adalService.user : null;
    }
  }

  /**
   * Get the loggedIn User details invoking `http://graph.windows.net` API. The response is internally cached and fire ajax request
   * for the first time and subsequent requests are from cache for performance.
   * @return `Observable<any>` response from the `http://graph.windows.net` API call.
   */
  public apiGetLoggedInUser(): Observable<any> {
    return this.userService.getLoggedInUser();
  }

  /**
   * Get the widget level settings stored for the loggedin user.
   * @param widgetId `string` ID of the Widget.
   * @param page `string` pageId where the widget is residing.
   * @param global `boolean` Set to true to store the configuration separately,
   * else the configuration is stored along side the page settings.
   * @param configKey `string` unique key to store the value of the wigdet specific cofiguration
   * @return `any`
   */
  public apiGetUserWidgetPref(widgetId: string, page?: string, global?: boolean, configKey?: string): any {
    return this.userPreferences.getWidgetConfig(widgetId, page, global, configKey);
  }
  /**
   * Updates the widget specific configuration to the Logged in User preferences.
   * @param widgetId `string` widgetID for which the configuration is stored
   * @param key `string` Unique key to store the configuration
   * @param value `any` configuration to be stored
   * @param page `string` pageID where the widget is residing.
   * @param save `boolean` False - This flag accumulates all the updates to the widget configuration and when you send True, it
   * Will update the widget preferences.
   * @returns FrameworkService
   */
  public apiUpdateWidgetPreferences(widgetId: string, key: string, value: any, page?: string, save: boolean = true): FrameworkService {
    // If page is null, considered as global widget preference
    this.userPreferences.setWidgetConfig(widgetId, key, value, page, save);
    return this;
  }
  /**
   * Hides the widget ID's which are passed on. This API works like this -
   * Suppose the API is called to hide the `WID001`, it hides. Again if you call this API with another widget ID say `WID002`,
   * then it unhides `WID001` and hides `WID002`.
   * If you wish to hide widgets without unhiding the already hidden widgets, consider using - `apiHideWidgets()` & `apiShowWidgets` API
   * @param list `Array<string>` list of Widget Id's
   * @return FrameworkService
   */
  public apiHideWidgets(widgetId: Array<string>): FrameworkService {
    this.appService.hideWidgets$.next(widgetId);
    return this;
  }
  /**
   * Show or hide the left menu item. pageId should be unique. If duplicate pageId exists, then it hides the first match.
   * @param pageId `string`
   * @return FrameworkService
   */
  public apiToggleLeftMenuItem(pageId: string, blink: boolean = false): FrameworkService {
    this.appService.hideLeftMenuItem$.next({ id: pageId, blink: blink, state: undefined, property: 'page' });
    return this;
  }
  /**
   * Returns the current left navigation model data which was used to render.
   * @returns Array of `LeftNav` model
   */
  public apiGetLeftNavModel(): Array<LeftNav> {
    return this.appService.getLeftNavModel();
  }

  /**
   * Allows to set the left navigation model with custom properties other than the site preferences.
   * @param model Array of LeftNav type
   * @param back `LeftNavBack` model which takes the text and link for setting.
   * @returns FrameworkService
   */
  public apiSetLeftNavModel(model: Array<LeftNav>, back?: LeftNavBack): FrameworkService {
    this.appService.setLeftNavModel(model, back);
    return this;
  }

  /**
   * Allows to dynamically Update the site title & navigation link
   * @param title `string`
   * @param link `string`
   * @return FrameworkService
   */
  public apiUpdateSiteTitle(title: string, link?: string): FrameworkService {
    this.appService.changeSiteTitle$.next({ title, link });
    return this;
  }

  /**
   * Emits LeftNav model, when user clicks on left navigation back.
   * @param data LeftNav Model
   * @returns VOID
   */
  public apiNavigateBack(data: any): void {
    this.menuBack$.next(data);
  }

  /**
   * Page Reset Api hook to subscribe when page reset option is clicked under Actions menu.
   * @returns `Observable<boolean>`
   */
  public apiPageResetHook$(): Observable<boolean> {
    return this.appService.pageReset$.asObservable();
  }

  /**
   * Ability to load the component dynamically in the right trial.
   * @param title title of the component
   * @param component Angular component. Make sure, you add the component to `entryComponents` section of App Module.
   * @param status Optional. Default value is `true`. It shows the component by default.
   */
  public apiLoadRightNavDynamicPage(title: string, component: Component, status = true, input?: any): FrameworkService {
    this.appService.loadRightNavPage$.next({
      title,
      component,
      status,
      input
    });
    return this;
  }

  /**
   * Show or hide the custom right trial.
   * @param status `boolean` Default value is `true`.
   */
  public apiToggleRightNav(status: boolean = true): FrameworkService {
    this.appService.toggleRightNav$.next(status);
    return this;
  }

  /**
   * Show or hide site title (Page Title) below the bread crumb
   * @param state `boolean` Default value is true.
   * @returns FrameworkService
   */
  public apiToggleSiteTitle(state = true): FrameworkService {
    this.appService.toggleSiteTitle$.next(state);
    return this;
  }

  /**
   * Show or hide breadcrumb for the application.
   * @param state `boolean` Default value is true.
   * @return FrameworkService
   */
  public apiToggleBreadcrumb(state = true): FrameworkService {
    this.appService.toggleBreadcrumb$.next(state);
    return this;
  }

  /**
   * Allows to save custom settings at App Level in User Preferences.
   * @param key `string`
   * @param value `any`
   * @param save `boolean` Default value is true. You can pass `false` to this parameter to hold the settings in memory with out
   * saving to backend preferences which allows to batch the save requests.
   * @returns FrameworkService
   */
  public apiSetGlobalAppSettings(key: string, value: { [key: string]: any }, save: boolean = true): FrameworkService {
    this.userPreferences.setGlobalAppSettings(key, value, true, save);
    return this;
  }

  /**
   * Returns the global app settings saved from the User Preferences.
   * @param key `string`
   * @returns `any` value stored with the passed in key.
   */
  public apiGetGlobalAppSettings(key: string): any {
    return this.userPreferences.getGlobalAppSettings(key);
  }

  /**
   * Returns the widget details for the passed in widget Id.
   * @param widgetId `string`
   * @return `Widget` Type
   */
  public apiGetWidgetDetails(widgetId: string): Widget {
    return this.widgetStoreService.getWidgetdetails(widgetId);
  }

  /**
   * If the page has configured with page level setting then it return true else false.
   * @param pageName `string` name of the page.
   * @return `boolean` value
   */
  public apiHasPageLevelConfig(pageName: string): boolean {
    return this.sitePreferenceService.hasPageLevelConfigEnabledForThisPage(pageName);
  }

  /**
   * Gets the Widget Name for the widget ID
   * @param widgetId `string`
   * @return `string` Widget ID will be returned.
   * @deprecated Will be depreciated in future release. Please use `apiGetWidgetDetails` method to retrieve the widget releated details.
   */
  public apiGetWidgetName(widgetId: string): string {
    return this.widgetStoreService.getWidgetName(widgetId);
  }

  /**
   * Show or hide the loader in the content region. This API might be useful for showing the generic loader to
   * block the screen while loading the detail page etc.,
   * @param state `boolean` Default value is true.
   * @return FrameworkService
   */
  public apiToggleContentLoader(state = true): FrameworkService {
    this.appService.contentLoader$.next(state);
    return this;
  }

  /**
   * Get the Framework configuration which is set in the App Module. This API helps to read the configuration
   * and act accordingly.
   * @return `Configurations`
   */
  public apiGetConfiguration(): Configurations {
    return this.configService.config;
  }

  /**
   * Allows to set the external user details if EMS was not the Authentication System.
   * @param userInfo `User` type
   * @return FrameworkService
   */
  public apiSetUserInfo(userInfo: User): FrameworkService {
    this.appService.userInfo$.next(userInfo);
    return this;
  }

  /**
   * This API works only for EMS Authentication and allows to acquireToken for the given resource id.
   * @param resource `string`
   * @return Observable<string> Returns the Observable of the token.
   */
  public apiAcquireToken(resource: string): Observable<string> {
    return this.adalService.acquireToken(resource);
  }

  /**
   * This API works only for MSAL Authentication and allows to acquireToken for the given resource id.
   * @param resource `string`
   * @return Observable<AuthenticationResult> Returns the Observable of the token.
   */
  public apiMsalAcquireToken(silentRequest: SilentRequest): Observable<AuthenticationResult> {
    return this.msalService.acquireTokenSilent(silentRequest);
  }

  /**
   * Redirect the user to error page with the message.
   * @param message `string` Error message to be displayed to the user.
   * @param skipLocationChange `boolean` decides whether to change the URL or retain the current URL and show the error message.
   * @returns FrameworkService
   */
  public apiRedirectToNoAccessPage(message: string, skipLocationChange: boolean): FrameworkService {
    this.cacheService.errorMessage = message;
    const router = this.injector.get(Router);
    router.navigate(['error'], {
      queryParams: { type: 'NO_ACCESS' },
      skipLocationChange: skipLocationChange
    });
    return this;
  }

  /**
   * Programatically trigger the navigation to the left navigation item.
   * @param pageId `string` page id. If we pass `__root` as pageId,
   * then menu will be reset to the default root menu as per the site preferences.
   * @param url `string` url of the destination page
   * @param extras `NavigationExtras` Optional. This is same as Angular Routing extras.
   * @returns FrameworkService
   */
  public apiNavigateToMenuItem(pageId: string, url: string, extras?: NavigationExtras): FrameworkService {
    this.appService.navigateToMenuItem$.next(pageId);
    const router = this.injector.get(Router);
    router.navigateByUrl(url, extras);
    return this;
  }

  /**
   * Invoke this API to send the custom data to Omniture.
   * @param pageId `string` id of the page which for which you wish to send the data
   * @param isSearchPage `boolean` True if it's a search page.
   * @param searchData `IOmnitureSearch` type.
   * @param searchData `IOmnitureUserInfo` type.
   * @returns FrameworkService
   */
  public apiSendDataToOmniture(
    pageId: string,
    isSearchPage: boolean,
    searchData?: IOmnitureSearch,
    userInfo?: IOmnitureUserInfo
  ): FrameworkService {
    this.omnitureService.sendDataToOmniture(pageId, isSearchPage, searchData, userInfo);
    return this;
  }

  /**
   * This is API is more of to check whether any particular left navigation item is enabled or not.
   * Left Navigation item is alias for Capability, which is generally used in Central applications.
   * @param page `string` id of the page
   * @return `boolean` Returns true if the page is available and active and vicevsersa.
   */
  public apiIsCapabilityAvailable(page: string): boolean {
    return this.userPreferences.isCapabilityEnabled(page);
  }

  /**
   * Allows to update the Framework configuration items
   * @param config `ConfigItems`
   * @return FrameworkService
   */
  public apiUpdateConfigItems(config: ConfigItems): FrameworkService {
    this.appService.configItemChange$.next(config);
    return this;
  }

  /**
   * Triggers an event when Site, User & Widget preferences are fetched.
   * @return `Observable<boolean>`
   */
  public apiPlatformReady(): Observable<boolean> {
    return this.appService.platformReady$.asObservable();
  }

  /**
   * Send page details to Microsoft App Insights for tracking purposes.
   * NOTE: If Microsoft App Insights is configured then it tracks all the Ajax requests automatically. If you wish to send extra
   * information to Analytics, then you may need this API.
   * @param pageName `string`
   * @param url `string`
   * @param breadcrumb `string`
   * @param upi `string`
   * @return FrameworkService
   */
  public apiTrackMyPageWithAppInsights(pageName: string, url: string, breadcrumb: string, upi: string): FrameworkService {
    this.appInsightsService.trackPage(pageName, url, breadcrumb, upi);
    return this;
  }

  /**
   * This API has to be used with caution. It works only for Units group of applications.
   * May be in future, we will expand to other groups.
   * NOTE: We're in plans to depreciate this API since the intended behaviour is changed
   * @param parentAppId - Parent Group ID: For Units it's APP001
   * @param key - Unique string which acts as a key
   * @param value - Value of type 'any'
   */
  public __apiSetDataToSitePreferences(parentAppId: string, key: string, value: any): Observable<any> {
    const unit = this.appService.getAppData('routeParams').unit;
    return this.sitePreferenceService.setKeyToSitePreferences(parentAppId, unit, key, value);
  }

  /**
   * This API has to be used with caution. It works only for Units group of applications.
   * NOTE: We're in plans to depreciate this API since the intended behaviour is changed
   * @param key `string`
   * @returns `any` Value stored against the key.
   */
  public __apiGetDataFromSitePreferences(key: string): any {
    return this.sitePreferenceService.getKeyFromSitePreferences(key);
  }

  /**
   * Emits an event on the Layout page if all the widgets are rendered. If no, widgets available, it immediately emits an event.
   * @returns `Observable<boolean>`
   */
  public apiLayoutRenderComplete(): Observable<boolean> {
    return this.appService.layoutRenderComplete$.asObservable();
  }

  /**
   * Show Maintenance message dynamically.
   * If you wish to set the maintenance message for decicated period of time, then please update in Site Preferences
   * @param message `string`
   * @returns FrameworkService
   */
  public apiShowNotificationMessage(message: string): FrameworkService {
    this.appService.maintenanceNotification$.next(message);
    return this;
  }

  /**
   * Send an error log to Microsoft App Insights.
   * This API will work only if App Insights is configured and have a valid Instrumentation key set.
   * @param error `Error` object
   * @param upi
   * @param extraInfo `any` Key-Value pair of extra information which you wish to set along with the error object.
   * @return FrameworkService
   */
  public apiLogExceptionWithAppInsights(error: Error, upi: string, extraInfo: { [key: string]: string } = {}): FrameworkService {
    this.appInsightsService.logException(error, upi, extraInfo);
    return this;
  }

  /**
   * This API set's the logged in user context for Microsoft App Insights. It's recommended to call this API in App Component
   * and immediately after login.
   * This works only if Microsoft App Insights has been configured.
   * @param upiOrEmail `string`
   * @return FrameworkService
   */
  public apiSetUserContextForAppInsights(upiOrEmail: string): FrameworkService {
    this.appInsightsService.setUserContext(upiOrEmail);
    return this;
  }

  /**
   * Hides the given widget ID. This will be helpful if you wish to hide the widget on particular scenario.
   * @param widgetId `string`
   * @return FrameworkService
   */
  public apiHideWidget(widgetId: string): FrameworkService {
    this.appService.hideWidget$.next(widgetId);
    return this;
  }

  /**
   * Show the widget ID.
   * @param widgetId `string`
   * @return FrameworkService
   */
  public apiShowWidget(widgetId: string): FrameworkService {
    this.appService.showWidget$.next(widgetId);
    return this;
  }

  /**
   * Emits an event while the hamburger menu is expanded or collapsed.
   * @returns `Observable<string>` It emits this values - expanded' or 'collpased'.
   */
  public apiLeftmenuToggled(): Observable<string> {
    return this.appService.leftNavstate$.pipe(
      map(item => {
        return item === true ? 'expanded' : 'collapsed';
      })
    );
  }

  /**
   * Emits an event when layout is changed from boxed to fluid and viceversa.
   * @returns `Observable<string>` emits 'fluid' or 'boxed'
   */
  public apiLayoutChanged(): Observable<string> {
    return this.appService.layoutChanged$.asObservable();
  }

  /**
   * Get the parent group site user preferences.
   * Use this API with caution!
   * @returns Parent group user preferences response from backend!
   */
  public __apiGetRootUserSitePreferences(): Observable<any> {
    return this.userPreferences.getRootUserSitePreferences();
  }

  /**
   * Send an event on the page to Microsoft App Insights. May be critical operations like submitting a form can be posted to
   * analytics to notify the action and can be tracked for an errors.
   * @param type `string` action type
   * @param properties `any`
   * @returns FrameworkService
   */
  public apiTrackEventWithAppInsights(type: string, properties: { [key: string]: string } = {}): FrameworkService {
    this.appInsightsService.trackEvent(type, properties);
    return this;
  }

  /**
   * Retrieves the custom json stored against the site & their parents.
   * @returns Array of `{ siteappid: string, customjson: string }`.
   */
  public apiGetCustomPreferences(): Array<{ siteappid: string; customjson: string }> {
    return this.sitePreferenceService.customPreferences;
  }

  /**
   * Handle to close the action menu. This API will be useful during the custom actions and you will have ability to choose on
   * when to close the opened menu.
   * @param state `boolean`
   */
  public apiActionMenuToggle(state: boolean): FrameworkService {
    this.appService.actionsMenuToggle$.next(state);
    return this;
  }
  /**
   * Gets the handler whenever app state data is updated, an event is emitted.
   * @returns `Observable<any>` contains the route params and site context info etc.,
   */
  public get appDataChanged$(): Observable<any> {
    return this.appService.appDataChanged$.asObservable();
  }
  /**
   * Allows to save the custom JSON data to preferences db.
   * @param json - JSON object with the data structure
   */
  public apiSaveCustomConfig(json: { [key: string]: any }) {
    return this.sitePreferenceService.updateCustomJSON(json);
  }

  /**
   * Show or hide the header controls inlcude  - Search, Actions & Settings.
   * @param headerControls `HeaderControls`
   */
  public apiToggleHeaderControls(headerControls: HeaderControls): FrameworkService {
    this.appService.headerControls$.next(headerControls);
    return this;
  }

  /**
   * Show or hide the Admin link. This is unique to Units group of applications.
   * @param state `boolean` Default state is false.
   * @returns FrameworkService
   */
  public apiToggleAdminLink(state = false): FrameworkService {
    this.appService.toggleAdminLink$.next(state);
    return this;
  }

  /**
   * Gets the logged in user UPI and email. This API is application only when EMS Authentication is enabled.
   * @returns An object with email as string and upi as `async` function. Please prefix `await` keyword while invoking upi method.
   */
  public get apiWhoIsLoggedIn(): { email: string; upi: Function } {
    return {
      email: this.userService.getLoggedUserEmail(),
      upi: async () => {
        return await this.userService.getLoggedInUserUpi();
      }
    };
  }

  /**
   * @deprecated Please use `apiBreadcrumbClick$` instead!
   */
  public get breadcrumbClick$(): Observable<{ item: BreadcrumbItem; queryParams: any; list: Array<BreadcrumbItem> }> {
    return this.appService.breadCrumbClick$.asObservable();
  }

  /**
   * Emits the event when breadcrumb is clicked. It emits the item clicked and the complete breadcrumb list.
   * @returns Observable<{ item: BreadcrumbItem; queryParams: any; list: Array<BreadcrumbItem> }>
   */
  public get apiBreadcrumbClick$(): Observable<{ item: BreadcrumbItem; queryParams: any; list: Array<BreadcrumbItem> }> {
    return this.appService.breadCrumbClick$.asObservable();
  }

  /**
   * Emits the left navigation model from the site preferences and also when the model is updated
   * via preference changes via left navigation reorder etc.,
   */
  public apiLeftNavModelReady(): Observable<Array<LeftNav>> {
    return this.appService.leftNavModelReady$.asObservable();
  }

  /**
   * @param state State of the left menu - collapsed or expanded.
   */
  public apiToggleLeftMenuState(state: boolean): FrameworkService {
    this.appService.leftNavstate$.next(state);
    return this;
  }

  /**
   * Toogle the App Header
   * @param state `true` or `false`
   */
  public apiToggleAppHeader(state: boolean): FrameworkService {
    this.appService.toggleAppHeader$.next(state);
    return this;
  }

  /**
   * It returns the route params of the activated route. This will be applicable only which you set the `PlatformreadyGuard`.
   * This API will be useful to dyanimcally compute some logic from the route params to set the base root site id.
   */
  public apiRouteParams$(): Observable<{ [key: string]: string }> {
    return this.appService.routeParams$.asObservable().pipe(filter(params => params !== undefined));
  }

  /**
   * Emits the selected capability key along with the site name.
   * @returns Observable<ICapabilitySelected>
   */
  public apiSelectedCapability$(): Observable<ICapabilitySelected> {
    return this.appService.selectedCapability$.asObservable();
  }

  /**
   * Turn ON or OFF the splashscreen.
   * @param state boolean. Default value is true, which turns on the splashscreen.
   */
  public apiToggleSplashScreen(state: boolean = true): FrameworkService {
    if (state) {
      this.splashscreenService.show();
    } else {
      this.splashscreenService.hide();
    }
    return this;
  }

  /**
   * Returns the App insights instance which was initialized.
   * This instance will allow to access all the exposed methods from the App Insights library!
   */
  public apiGetAppInsightInstance(): ApplicationInsights {
    return this.appInsightsService.appInsightsInstance;
  }

  /**
   * Emit LeftNav model when it updates or refreshes with new data!
   * @returns `Observable<Array<LeftNav>>`
   */
  public apiLeftNavModelUpdated(): Observable<Array<LeftNav>> {
    return this.appService.leftNavUpdated$.asObservable();
  }

  /**
   * Toggle the entire Site Info section below the header.
   * @param state `boolean`
   * @returns FrameworkService
   */
  public apiToggleSiteInfo(state: boolean): FrameworkService {
    this.appService.toggleSiteInfo$.next(state);
    return this;
  }

  /**
   * Redirect the user to error page with the message.
   * @param message `string` Error message to be displayed to the user.
   * @param skipLocationChange `boolean` decides whether to change the URL or retain the current URL and show the error message.
   * @returns FrameworkService
   */
  public apiRedirectToErrorPage(message: string, skipLocationChange: boolean): FrameworkService {
    this.cacheService.errorMessage = message;
    const router = this.injector.get(Router);
    router.navigate(['error'], {
      queryParams: { type: 'Error' },
      skipLocationChange: skipLocationChange
    });
    return this;
  }

  /**
   * ADAL / MSAL Only - Logout the currently singed in user!
   */
  public apiLogout(): FrameworkService {
    if (this.configService.config.enableMSAL) {
      this.msalService.logout();
    } else {
      this.adalService.signout();
    }
    return this;
  }

  /**
   * Get the site preferences state - parent, child & merged configuration.
   */
  public apiGetPreferenceState(): { parent: IPref; child: IPref; merged: IPref } {
    return this.sitePreferenceService.getPrefState();
  }

  /**
   * Emits an even before the layouting starts!
   */
  public apiBeforeStartLayout(): Observable<boolean> {
    return this.appService.beforelayoutStart$.asObservable();
  }

  /**
   * Hide the menu item based on key property.
   * key is mandatory property to invoke this function. If you pass optional parameter, `state` then it will honor it, else, it will toggle.
   * `blink` property default value is false
   * @param params { key: string, state?: boolean, blink: boolean }
   * @returns FrameworkService
   */
  public apiShowHideMenuItemOnKey(params: { key: string; state?: boolean; blink?: boolean }): FrameworkService {
    this.appService.hideLeftMenuItem$.next({
      id: params.key,
      blink: params?.blink ?? false,
      state: params?.state ?? undefined,
      property: 'key'
    });
    return this;
  }

  /**
   * Emits an event when either 'ICON1' or 'ICON2' custom icons are clicked.
   */
  public apiCustomIconClickHandler(): Observable<'ICON1' | 'ICON2'> {
    return this.appService.customHeaderIconClick$.asObservable();
  }

  /**
   * Emits the current state of user preferences after it saves to preferences DB
   */
  public apiWatchUserPref(): Observable<{ [key: string]: any }> {
    return this.appService.userPreferenceUpdated$.asObservable();
  }

  public apiIsUserLoggedIn(): Observable<boolean> {
    return this.appService.isUserLoggedIn$.asObservable();
  }

  public apiShowProfile(): void {
    this.appService.showProfile$.next(true);
  }
}
