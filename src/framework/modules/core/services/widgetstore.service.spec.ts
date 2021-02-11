import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Widget } from '../models';

import { Api } from './api.service';
import { mockApiService } from './api.service.mock';
import { ConfigurationService } from './configuration.service';
import { mockConfigurationService } from './configuration.service.mock';
import { LoggerService } from './logger.service';
import { mockLoggerService } from './logger.service.mock';
import { SitePreferenceService } from './sitepreference.service';
import { mockSitePreferencesService } from './sitePreferences.mock';
import { UserPreferenceService } from './userpreference.service';
import { mockUserPreferenceService } from './userpreference.service.mock';
import { WidgetstoreService } from './widgetstore.service';
import { WidgetStoreMock } from './widgetstoreservices.mock';

describe('WidgetstoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WidgetstoreService,
        { provide: ConfigurationService, useValue: mockConfigurationService },
        { provide: Api, useValue: mockApiService },
        { provide: SitePreferenceService, useValue: mockSitePreferencesService },
        { provide: UserPreferenceService, useValue: mockUserPreferenceService },
        { provide: LoggerService, useValue: mockLoggerService }
      ],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([WidgetstoreService], (service: WidgetstoreService) => {
    expect(service).toBeTruthy();
  }));

  it('should retrieve the widgets from backend via preferences call', inject(
    [WidgetstoreService],
    (widgetStoreService: WidgetstoreService) => {
      spyOn(widgetStoreService, 'populateWidgetStoreData')
        .and.callThrough()
        .and.returnValue(of(WidgetStoreMock));
      widgetStoreService.populateWidgetStoreData().subscribe((widgets: Array<Widget>) => {
        expect(widgets.length).toEqual(7);
      });
    }
  ));

  it('should retrieve the widgets list', inject([WidgetstoreService], (widgetStoreService: WidgetstoreService) => {
    widgetStoreService.widgetMasterList = WidgetStoreMock;
    const widgetList = widgetStoreService.widgetMasterList;
    expect(widgetList.length).toEqual(7);
  }));

  it('should be able to retrieve the details based on Widget Id', inject([WidgetstoreService], (widgetStoreService: WidgetstoreService) => {
    widgetStoreService.widgetMasterList = WidgetStoreMock;
    const widgetDetails = widgetStoreService.getWidgetdetails('WID00150');
    expect(widgetDetails.widgetName).toEqual('Dynamic Link List');
  }));

  it('should be able to retrieve the custom widget configuration based on Widget Id', inject(
    [WidgetstoreService],
    (widgetStoreService: WidgetstoreService) => {
      widgetStoreService.widgetMasterList = WidgetStoreMock;
      const widgetConfig = widgetStoreService.getWidgetConfig('WID00150');
      expect(widgetConfig).toEqual({});
    }
  ));

  it('should be able to retrieve the default position of the Widget Id', inject(
    [WidgetstoreService],
    (widgetStoreService: WidgetstoreService) => {
      widgetStoreService.widgetMasterList = WidgetStoreMock;
      const widgetPosition = widgetStoreService.getWidgetDefaultPosition('WID00150', 'L1');
      expect(widgetPosition).toEqual('L1P2');
    }
  ));

  it('should be able to retrieve the name of the Widget Id', inject([WidgetstoreService], (widgetStoreService: WidgetstoreService) => {
    widgetStoreService.widgetMasterList = WidgetStoreMock;
    const widgetName = widgetStoreService.getWidgetName('WID00150');
    expect(widgetName).toEqual('Dynamic Link List');
  }));

  it('should be able to retrieve the widgets which are enable to display in store', inject(
    [WidgetstoreService],
    (widgetStoreService: WidgetstoreService) => {
      widgetStoreService.widgetMasterList = WidgetStoreMock;
      const widgets = widgetStoreService.getStoreWidgets('Dashboard');
      expect(widgets.length).toEqual(7);
    }
  ));

  it('should be able to retrieve the widgets which are enabled for the page', inject(
    [WidgetstoreService],
    (widgetStoreService: WidgetstoreService) => {
      spyOn(widgetStoreService, 'getWidgetIdsAddedForThePage').and.returnValue(['WID0019', 'WID0120', 'WID0125']);
      const widgetEnabledForPage = widgetStoreService.getWidgetIdsAddedForThePage('Dashboard');
      expect(widgetEnabledForPage.length).toEqual(3);
    }
  ));

  it('should be able to mark the widgets as selected by adding a property - added', inject(
    [WidgetstoreService],
    (widgetStoreService: WidgetstoreService) => {
      const widgets = widgetStoreService.markSelectedWidgets(['WID00160', 'WID00150'], WidgetStoreMock);
      const seelctedWidgets = widgets.filter(widget => widget.added);
      expect(seelctedWidgets.length).toEqual(2);
    }
  ));

  it('should be able to retrieve the widget categories', inject([WidgetstoreService], (widgetStoreService: WidgetstoreService) => {
    const widgetCategories = widgetStoreService.getWidgetCategories(WidgetStoreMock);
    expect(widgetCategories?.General?.length).toEqual(7);
  }));

  it('should be able to retrieve the count of times the widget has been added to the page', inject(
    [WidgetstoreService],
    (widgetStoreService: WidgetstoreService) => {
      const multipleWidgetCount = widgetStoreService.getMultipleWidgetCounts(['WID00160', 'WID00150']);
      expect(multipleWidgetCount['WID00160']).toEqual(1);
    }
  ));

  it('should be able to add the widget to the page', inject([WidgetstoreService], (widgetStoreService: WidgetstoreService) => {
    spyOn(widgetStoreService, 'addWidget').and.returnValue({ pageWidgets: ['WID00160', 'WID00150'] });

    const widgetsAddedToPage = widgetStoreService.addWidget(WidgetStoreMock[0], 'Dashboard', ['WID006', 'WID008']);
    expect(widgetsAddedToPage.pageWidgets.length).toEqual(2);
  }));

  it('should be able search for the widgets', inject([WidgetstoreService], (widgetStoreService: WidgetstoreService) => {
    const searchResults = widgetStoreService.search(WidgetStoreMock, 'dynamic');
    expect(searchResults.length).toEqual(4);
  }));

  it('should be able retrieve the page details', inject([WidgetstoreService], (widgetStoreService: WidgetstoreService) => {
    spyOn(widgetStoreService, 'getPageDetails').and.returnValue({ title: 'Dashboard', urlPattern: ':section/:section1/:section2' });
    const pageDetails = widgetStoreService.getPageDetails('dashboard');
    expect(pageDetails?.title).toEqual('Dashboard');
    expect(widgetStoreService.getPageDetails).toHaveBeenCalledTimes(1);
  }));
});
