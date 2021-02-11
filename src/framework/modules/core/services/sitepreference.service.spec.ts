import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Api } from './api.service';
import { mockApiService } from './api.service.mock';
import { ConfigurationService } from './configuration.service';
import { mockConfigurationService } from './configuration.service.mock';
import { LoggerService } from './logger.service';
import { mockLoggerService } from './logger.service.mock';
import { SitePreferenceService } from './sitepreference.service';
import { sitePreferencesMock } from './sitePreferences.mock';

describe('SitepreferenceService', () => {
  let sitePreferenceService: SitePreferenceService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SitePreferenceService,
        { provide: ConfigurationService, useValue: mockConfigurationService },
        { provide: LoggerService, useValue: mockLoggerService },
        { provide: Api, useValue: mockApiService }
      ],
      imports: [HttpClientTestingModule]
    });
    sitePreferenceService = TestBed.inject(SitePreferenceService);
    sitePreferenceService.__setPreferences(sitePreferencesMock);
  });

  it('should be created', () => {
    expect(sitePreferenceService).toBeTruthy();
  });

  it('should be able to retrieve the state of preferences - parent, child & merged', () => {
    const preference = sitePreferenceService.getPrefState();
    expect(preference.parent).not.toBe(null);
    expect(preference.child).not.toBe(null);
    expect(preference.merged).not.toBe(null);
  });

  it('should be able to retrieve the site preferences', () => {
    const preference = sitePreferenceService.getSitePreferences();
    expect(preference).not.toBe(null);
  });

  it('should be able to check whether the site preferences has child preferences', () => {
    const hasChildPreference = sitePreferenceService.hasChildPref();
    expect(hasChildPreference).toEqual(true);
  });

  it('should be able to check whether the site preferences are available', () => {
    const doesPreferencesAvailable = sitePreferenceService.hasSitePreferencesAvailable();
    expect(doesPreferencesAvailable).toEqual(true);
  });

  it('should be able to retrieve the custom preferences', () => {
    const customPreferences = sitePreferenceService.customPreferences;
    expect(customPreferences.length).toEqual(2);
  });

  it('should be able to check whether the site has widgets or not', () => {
    const siteWidgets = sitePreferenceService.hasSiteWidgets();
    expect(siteWidgets).toEqual(true);
  });

  it('should be able to check whether widget store required', () => {
    const isWidgetStoreRequired = sitePreferenceService.isWidgetStoreRequired('menu1page3');
    expect(isWidgetStoreRequired).toBeFalsy();
  });

  it('should be able to check whether user preferences are enabled', () => {
    const isUserPreferencesRequired = sitePreferenceService.isUserPreferenceRequired();
    expect(isUserPreferencesRequired).toBeTruthy();
  });

  it('should be able to merge the parent & child preferences', () => {
    const mergedPref = sitePreferenceService.generateSitePrefJson(
      sitePreferenceService.getPrefState().parent,
      sitePreferenceService.getPrefState().child
    );
    expect(mergedPref.globalSettings.pageURLPattern).toEqual(':section/:subsection1/:subsection2');
  });

  it('should be able to retrieve whether we can add additional pages', () => {
    const hasManagePages = sitePreferenceService.hasManagePage();
    expect(hasManagePages).toBeTruthy();
  });

  it('should be able to get the state whether left navigation can be reordered', () => {
    const canLeftNavRedorder = sitePreferenceService.canLeftNavReorder();
    expect(canLeftNavRedorder).toBeTruthy();
  });

  it('should be able to retrieve the left nav pattern', () => {
    const leftNavPattern = sitePreferenceService.getleftNavPattern();
    expect(leftNavPattern).toEqual(':section/:subsection1/:subsection2');
  });

  it('should be able to get the state whether the left navigation has been enabled or not ', () => {
    expect(sitePreferenceService.hasLeftNavigation()).toBeTruthy();
  });

  it('should be able to check whether breadcrumb is enabled or not', () => {
    expect(sitePreferenceService.hasBreadcrumb()).toBeTruthy();
  });

  it('should be able to check whether the widgets are draggable for the particular page', () => {
    const isDraggable = sitePreferenceService.isLayoutDraggable('widgetpage');
    expect(isDraggable).toBeTruthy();
  });

  it('should be able to retrieve the layout for the page', () => {
    const layout = sitePreferenceService.getLayout('widgetpage');
    expect(layout).toEqual('L1');
  });

  it('should be able to get whether banner is enabled for the page', () => {
    const hasBanner = sitePreferenceService.hasBanner('widgetpage');
    expect(hasBanner).toBeFalsy();
  });

  it('should be able to retrieve whether widgets can be added to the particular page or not', () => {
    const canAddWidgetsToThePage = sitePreferenceService.canAddWidgets('widgetpage');
    expect(canAddWidgetsToThePage).toBeTruthy();
  });

  it('should be able to retrieve the widgets for the page', () => {
    const widgetForPageAndPanel = sitePreferenceService.getPageWidgets('widgetpage', 'L1P1');
    expect(widgetForPageAndPanel).toEqual(['WID006']);

    const widgetForPage = sitePreferenceService.getPageWidgets('widgetpage');
    expect(widgetForPage).toEqual({ L1P1: ['WID006'], L1P2: [] });
  });

  it('Should be able to retrieve page widget configuration', () => {
    const pageWidgetConfig = sitePreferenceService.getPageWidgetConfig('widgetpage');
    expect(pageWidgetConfig).toEqual({ WID006: { removable: false }, WID0012: { hasHeader: false } });

    const widgetConfig = sitePreferenceService.getPageWidgetConfig('widgetpage', 'WID006');
    expect(widgetConfig).toEqual({ removable: false });
  });

  it('should be able to retrive the left navigation items', () => {
    const leftNav = sitePreferenceService.getSitePreferenceNavItems('_root');
    expect(leftNav['L2'].active).toBeTruthy();
  });

  it('should be able to retrieve the configuration for the page', () => {
    const pageSettings = sitePreferenceService.getPageSetting('widgetpage');
    expect(pageSettings.hasBanner).toBeFalsy();
  });

  it('should be able to check the page has specific configuration', () => {
    const pageLevelConfig = sitePreferenceService.hasPageLevelConfigEnabledForThisPage('widgetpage');
    expect(pageLevelConfig).toBeTruthy();
  });

  it('should be able to get the state whether page refresh has been enabled or not', () => {
    const isPageRefreshEnabled = sitePreferenceService.hasPageRefreshEnabledForThisPage('widgetpage');
    expect(isPageRefreshEnabled).toBeTruthy();
  });

  it('should be able to retrieve the page name', () => {
    const pageName = sitePreferenceService.getPageName('widgetpage');
    expect(pageName).toEqual('Widget Page');
  });

  it('should be able to retrieve the site params', () => {
    const siteParams = sitePreferenceService.getSiteParams();
    expect(siteParams).toEqual({});
  });

  it('should be able to retrieve the site name', () => {
    const siteName = sitePreferenceService.getSiteName();
    expect(siteName).toEqual('Custom Apps Group');
  });

  it('should be able to check whether site preferences is available', () => {
    const isPreferenceAvailable = sitePreferenceService.isSitePreferenceAvailable();
    expect(isPreferenceAvailable).toEqual(true);
  });
});
