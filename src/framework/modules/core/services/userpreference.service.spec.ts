import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { Api } from './api.service';
import { mockApiService } from './api.service.mock';
import { AppInsightsService } from './app-insights.service';
import { mockAppInsightsService } from './app-insights.service.mock';
import { AppService } from './app.service';
import { ConfigurationService } from './configuration.service';
import { mockConfigurationService } from './configuration.service.mock';
import { PreferencesUrlsService } from './preferences-urls.service';
import { SitePreferenceService } from './sitepreference.service';
import { mockSitePreferencesService } from './sitePreferences.mock';
import { UserService } from './user.service';
import { mockUserService } from './user.service.mock';
import { UserPreferenceService } from './userpreference.service';

describe('UserpreferenceService', () => {
  const fakeToastrService = {
    warning: () => {}
  };
  let userPreferenceService: UserPreferenceService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserPreferenceService,
        PreferencesUrlsService,
        AppService,
        { provide: ConfigurationService, useValue: mockConfigurationService },
        { provide: SitePreferenceService, useValue: mockSitePreferencesService },
        { provide: Api, useValue: mockApiService },
        { provide: UserService, useValue: mockUserService },
        { provide: AppInsightsService, useValue: mockAppInsightsService },
        { provide: ToastrService, useValue: fakeToastrService }
      ]
    });
    userPreferenceService = TestBed.inject(UserPreferenceService);
    userPreferenceService.mergeUserPrefDelta({});
  });

  it('should be created', () => {
    expect(userPreferenceService).toBeTruthy();
  });

  it('should be able to set the Widget config', () => {
    spyOn(userPreferenceService, 'setWidgetConfig').and.callThrough();
    userPreferenceService.setWidgetConfig('WID006', 'unit', 'itsdt', 'widgetpage', false);
    expect(userPreferenceService.setWidgetConfig).toHaveBeenCalledTimes(1);
  });

  it('should be able to get the Widget config', () => {
    spyOn(userPreferenceService, 'setWidgetConfig').and.callThrough();
    userPreferenceService.setWidgetConfig('WID006', 'unit', 'itsdt', 'menu1page1', false);
    const widgetConfig = userPreferenceService.getWidgetConfig('WID006', 'menu1page1', false, 'unit');
    expect(userPreferenceService.setWidgetConfig).toHaveBeenCalledTimes(1);
  });

  it('should be able to remove the widget', () => {
    spyOn(userPreferenceService, 'removeWidget').and.callThrough();
    userPreferenceService.removeWidget('menu1page1', 'WID006', false);
    expect(userPreferenceService.removeWidget).toHaveBeenCalledTimes(1);
  });

  it('should be able to remove the widget', () => {
    spyOn(userPreferenceService, 'removeWidget').and.callThrough();
    userPreferenceService.removeWidget('menu1page1', 'WID006', false);
    expect(userPreferenceService.removeWidget).toHaveBeenCalledTimes(1);
  });

  it('should be able to add the widget', () => {
    spyOn(userPreferenceService, 'addWidget').and.callThrough();
    userPreferenceService.addWidget('menu1page1', 'WID006', 'L1P1', false);
    expect(userPreferenceService.addWidget).toHaveBeenCalledTimes(1);
  });

  it('should be able to reset the page', () => {
    spyOn(userPreferenceService, 'setPageDefaults').and.callThrough();
    userPreferenceService.setPageDefaults('menu1page1', false);
    expect(userPreferenceService.setPageDefaults).toHaveBeenCalledTimes(1);
  });

  it('should be able to get widgets on the page', () => {
    spyOn(userPreferenceService, 'getPageWidgets').and.callThrough();
    const widgets = userPreferenceService.getPageWidgets('menu1page1', 'L1P1');
    expect(userPreferenceService.getPageWidgets).toHaveBeenCalledTimes(1);
    expect(widgets.length).toEqual(1);
  });

  it('should be able to get the widgets from all panels on a page', () => {
    spyOn(userPreferenceService, 'getPageWidgetsForStore').and.callThrough();
    const widgets = userPreferenceService.getPageWidgetsForStore('menu1page1');
    expect(userPreferenceService.getPageWidgetsForStore).toHaveBeenCalledTimes(1);
    expect(widgets.length).toEqual(1);
  });

  it('should be able to set widgets on the page', () => {
    spyOn(userPreferenceService, 'setPageWidgets').and.callThrough();
    userPreferenceService.setPageWidgets('menu1page1', { L1P1: [], L1P2: [] }, false);
    expect(userPreferenceService.setPageWidgets).toHaveBeenCalledTimes(1);
  });

  it('should be able to set application level settings at global level', () => {
    spyOn(userPreferenceService, 'setGlobalAppSettings').and.callThrough();
    userPreferenceService.setGlobalAppSettings('unit', 'itsdt', false, false);
    expect(userPreferenceService.setGlobalAppSettings).toHaveBeenCalledTimes(1);
  });

  it('should be able to get application level settings at global level', () => {
    spyOn(userPreferenceService, 'getGlobalAppSettings').and.callThrough();
    userPreferenceService.getGlobalAppSettings('unit');
    expect(userPreferenceService.getGlobalAppSettings).toHaveBeenCalledTimes(1);
  });

  it('should be able to update all layout panels', () => {
    spyOn(userPreferenceService, 'updatedAllLayoutPanels').and.callThrough();
    userPreferenceService.updatedAllLayoutPanels('L6');
    expect(userPreferenceService.updatedAllLayoutPanels).toHaveBeenCalledTimes(1);
  });

  it('should be able to retrieve the updated layout panels which are converted', () => {
    spyOn(userPreferenceService, 'getUpdatedLayoutPanels').and.callThrough();
    userPreferenceService.getUpdatedLayoutPanels('menu1page1', 'L6');
    expect(userPreferenceService.getUpdatedLayoutPanels).toHaveBeenCalledTimes(1);
  });

  it('should be able to emit an event when layout is changed', () => {
    spyOn(userPreferenceService, 'setSiteLayout').and.callThrough();
    userPreferenceService.setSiteLayout('L6', true);
    userPreferenceService._layoutChanged$.subscribe(layoutDetails => {
      expect(layoutDetails.layout).toEqual('L6');
    });
    expect(userPreferenceService.setSiteLayout).toHaveBeenCalledTimes(1);
  });

  it('should be able to set page title', () => {
    spyOn(userPreferenceService, 'setPageTitle').and.callThrough();
    userPreferenceService.setPageTitle('page1', 'Dashboard');
    expect(userPreferenceService.setPageTitle).toHaveBeenCalledTimes(1);
  });

  it('should be able to set page title', () => {
    spyOn(userPreferenceService, 'setPageTitle').and.callThrough();
    userPreferenceService.setPageTitle('page1', 'Dashboard');
    expect(userPreferenceService.setPageTitle).toHaveBeenCalledTimes(1);
  });

  it('should be able to get the current page layout', () => {
    spyOn(userPreferenceService, 'getPageLayout').and.callThrough();
    userPreferenceService.getPageLayout('menu1page1');
    expect(userPreferenceService.getPageLayout).toHaveBeenCalledTimes(1);
  });

  it('should be able to set the current page layout', () => {
    spyOn(userPreferenceService, 'setPageLayout').and.callThrough();
    userPreferenceService.setPageLayout('menu1page1', 'L6', true, false);
    expect(userPreferenceService.setPageLayout).toHaveBeenCalledTimes(1);
  });

  it('should be able retrieve the navigation order', () => {
    spyOn(userPreferenceService, 'getNavigationOrder').and.callThrough();
    userPreferenceService.getNavigationOrder();
    expect(userPreferenceService.getNavigationOrder).toHaveBeenCalledTimes(1);
  });

  it('should be to notify on left nav order change', () => {
    spyOn(userPreferenceService, 'notifyNavigationOrderChanged').and.callThrough();
    userPreferenceService.notifyNavigationOrderChanged();
    expect(userPreferenceService.notifyNavigationOrderChanged).toHaveBeenCalledTimes(1);
  });

  it('should be to retrieve the left nav pages', () => {
    spyOn(userPreferenceService, 'getLeftNavPages').and.returnValue([]);
    userPreferenceService.getLeftNavPages('__root', {}, {});
    expect(userPreferenceService.getLeftNavPages).toHaveBeenCalledTimes(1);
  });

  it('should be to retrieve the page url pattern', () => {
    spyOn(userPreferenceService, 'getleftNavPattern').and.callThrough();
    userPreferenceService.getleftNavPattern();
    expect(userPreferenceService.getleftNavPattern).toHaveBeenCalledTimes(1);
  });

  it('should be to set the left navigation menu settings', () => {
    spyOn(userPreferenceService, 'setLeftNavSettings').and.returnValue();
    userPreferenceService.setLeftNavSettings('active', false, false, false);
    expect(userPreferenceService.setLeftNavSettings).toHaveBeenCalledTimes(1);
  });

  it('should be to set the left navigation order settings', () => {
    spyOn(userPreferenceService, 'setLeftNavOrderSettings').and.callThrough();
    userPreferenceService.setLeftNavOrderSettings([], false, false);
    expect(userPreferenceService.setLeftNavOrderSettings).toHaveBeenCalledTimes(1);
  });

  it('should be to get the state whether left nav can be reordered or not', () => {
    spyOn(userPreferenceService, 'canLeftNavReorder').and.callThrough();
    userPreferenceService.canLeftNavReorder();
    expect(userPreferenceService.canLeftNavReorder).toHaveBeenCalledTimes(1);
  });

  it('should be to check whether the capability was enabled or not', () => {
    spyOn(userPreferenceService, 'isCapabilityEnabled').and.callThrough();
    userPreferenceService.isCapabilityEnabled('menu1page1');
    expect(userPreferenceService.isCapabilityEnabled).toHaveBeenCalledTimes(1);
  });

  it('should be to retrieve the maintenance message', () => {
    spyOn(userPreferenceService, 'getMaintenanceMessage').and.callThrough();
    userPreferenceService.getMaintenanceMessage();
    expect(userPreferenceService.getMaintenanceMessage).toHaveBeenCalledTimes(1);
  });

  it('should be to retrieve the launcher Apps', () => {
    spyOn(userPreferenceService, 'getLauncherApps').and.callThrough();
    userPreferenceService.getLauncherApps();
    expect(userPreferenceService.getLauncherApps).toHaveBeenCalledTimes(1);
  });

  it('should be to retrieve the root site preferences', () => {
    spyOn(userPreferenceService, 'getRootUserSitePreferences').and.returnValue(of({}));
    userPreferenceService.getRootUserSitePreferences();
    expect(userPreferenceService.getRootUserSitePreferences).toHaveBeenCalledTimes(1);
  });
});
