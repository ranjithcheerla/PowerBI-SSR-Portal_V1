import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FWConstants } from './../../../framework.constant';
import { Api } from './api.service';
import { ConfigurationService } from './configuration.service';
import { PrefMode } from './../models/configurations';
import { LoggerService } from './logger.service';
import { _ } from './../../../lodash';
import { HttpParams } from '@angular/common/http';
import { Widget } from '../models/widget.model';
import { UserPreferenceService } from './userpreference.service';
import { SitePreferenceService } from './sitepreference.service';
import { PreferencesUrlsService } from './preferences-urls.service';

@Injectable({
  providedIn: 'root'
})
export class WidgetstoreService {
  private widgetList: Array<Widget> = [];
  public widgetRemoved$ = this.userpreferenceService.widgetRemoved$;

  constructor(
    private api: Api,
    private loggerService: LoggerService,
    private configService: ConfigurationService,
    private userpreferenceService: UserPreferenceService,
    private sitePreferenceService: SitePreferenceService,
    private preferencesUrlService: PreferencesUrlsService
  ) {}

  populateWidgetStoreData(): Observable<Array<Widget>> {
    let prefMode = this.configService.config.preferencesMode;
    if (prefMode === undefined || prefMode === null) {
      this.loggerService.log(`Preference Mode is not set and defaulting to Service mode!`);
      prefMode = PrefMode.service;
    }
    if (prefMode === PrefMode.local) {
      const widgetPreferencesPath = this.configService.config.preferencePath.widgetPreferencesPath;
      if (widgetPreferencesPath === undefined || widgetPreferencesPath === '') {
        this.loggerService.log(`Though Preference mode is set to local,
         no local widget preference path is set, hence defaulting to service mode`);
        return this.fetchWidgetMappingFromService();
      }

      return this.api.get(widgetPreferencesPath).pipe(
        map((widgets: Array<Widget>) => {
          this.widgetList = widgets;
          return widgets;
        })
      );
    } else {
      return this.fetchWidgetMappingFromService();
    }
  }

  private fetchWidgetMappingFromService() {
    const appEnv = this.configService.config.appConfig.appEnv;
    const appGroup = this.configService.config.appGroup;
    const isSecure = this.configService.config.preferenceSecure;
    const isMSALAuth = this?.configService?.config?.enableMSAL;
    const urlPrefix = isSecure
      ? FWConstants.environment[appEnv].preferencesUrl[appGroup]['url'] + 'secure/'
      : FWConstants.environment[appEnv].preferencesUrl[appGroup]['url'];
    const prefResource = {};
    if (isSecure) {
      prefResource['prefUrl'] = this.preferencesUrlService?.FWConstants?.environment[appEnv]?.preferencesUrl[appGroup]['rtokenUrl'];
      if (isMSALAuth) {
        prefResource['prefUrl'] =
          this.preferencesUrlService?.FWConstants?.environment[appEnv]?.preferencesUrl[appGroup]['rtokenUrl'] + '/user_impersonation';
      }
    }

    const params = new HttpParams({
      fromObject: prefResource
    });
    const qParams = `siteid=${this.configService.config.appKey}`;
    return this.api
      .get(`${urlPrefix}orm/getwidgetssiteBySiteId?${qParams}`, {
        params: params
      })
      .pipe(
        map((widgets: Array<Widget>) => {
          this.widgetList = widgets;
          return widgets;
        })
      );
  }

  public get widgetMasterList(): Array<Widget> {
    return this.widgetList.slice();
  }

  public set widgetMasterList(widgets: Array<Widget>) {
    this.widgetList = widgets;
  }

  getWidgetdetails(widgetId: string): Widget {
    return _.find(this.widgetList, (widget: Widget) => {
      return widget.widgetKey === widgetId;
    });
  }

  getWidgetConfig(widgetId: string): { [key: string]: any } {
    const widget = _.find(this.widgetList, (_widget: Widget) => {
      return _widget.widgetKey === widgetId;
    });
    if (widget?.widJson) {
      const widJson = JSON.parse(widget.widJson);
      return (widJson && widJson['configurations']) || {};
    }
    return {};
  }

  getWidgetDefaultPosition(widget: string, layout: string): string | undefined {
    const _widget = _.find(this.widgetMasterList, ['widgetKey', widget]);
    const defaultPos = JSON.parse(_widget.widgetPosition);
    return defaultPos?.[layout];
  }

  getWidgetName(widgetId: string): string {
    const widgetDetails = this.widgetMasterList.filter(item => item.widgetKey === widgetId);
    return widgetDetails ? (widgetDetails.length > 0 ? widgetDetails[0].widgetName : '') : '';
  }

  /**
   * Get the Widgets to be displayed in the Store.
   * @param pageName required for processing the widgets, if there are any exlcuded widgets for the particular page!
   */
  getStoreWidgets(pageName: string): Array<Widget> {
    return _.filter(this.widgetMasterList, (widget: Widget) => {
      return (
        !widget.isWidDisable &&
        widget.storeDisplayEnabled &&
        (!widget.include || (widget.include && (_.includes(widget.include, pageName) || widget.include.length === 0))) &&
        !_.includes(widget.exclude, pageName)
      );
    });
  }

  getWidgetIdsAddedForThePage(pageName: string): Array<string> {
    return this.userpreferenceService.getPageWidgetsForStore(pageName);
  }

  /**
   * Mark the page widgets as selected by adding setting field 'added' property to true.
   * @param pageWidgets
   * @param widgets
   */
  markSelectedWidgets(pageWidgets: Array<string>, widgets: Array<Widget>): Array<Widget> {
    const cPageWidgets = _.cloneDeep(pageWidgets);
    const cWidgets = _.cloneDeep(widgets);

    _.forEach(cPageWidgets, function(value) {
      const widgetIndex = _.findIndex(cWidgets, function(widget: Widget) {
        return widget.widgetKey === value;
      });

      cWidgets[widgetIndex] = Object.assign({}, cWidgets[widgetIndex], {
        added: widgetIndex > -1
      });
    });

    return cWidgets;
  }

  /**
   * process the widgets and group the widgets as per the category. Also appends `All` with empty array!
   * @param widgets
   */
  getWidgetCategories(widgets: Array<Widget>): { [key: string]: any } {
    const categories = _.groupBy(widgets, 'widgetCategory');
    return _.merge({}, { All: [] }, categories);
  }

  /**
   * Process the WidgetId and read the count and returns an object which holds the Widget
   * Id and respective count - indicates how many number of times widget is added!
   * @param pageWidgetIds
   */
  getMultipleWidgetCounts(pageWidgetIds: Array<string>) {
    const multipleCountWidgets = {};
    _.forEach(pageWidgetIds, (value, key) => {
      const widgetId = value.replace(/_.*/g, '');
      multipleCountWidgets[widgetId] = multipleCountWidgets[widgetId] ? multipleCountWidgets[widgetId] + 1 : 1;
    });
    return multipleCountWidgets;
  }

  /**
   * Add the widget to the corresponding page and udpate the page widgets array!
   * @param widget to be added to the page
   * @param pageName name of the page which it has to be added!
   * @param pageWidgets widgets array which are already selected
   * @returns updated page widgets array!
   */
  addWidget(widget: Widget, pageName: string, pageWidgets: Array<string>): { pageWidgets: Array<string> } {
    const pageWidgetIds = _.cloneDeep(pageWidgets);
    const widgetPosition = this.getWidgetDefaultPosition(
      widget.widgetKey,
      this.userpreferenceService.getPageLayout(pageName) || this.sitePreferenceService.getLayout(pageName)
    );
    const widgetDetails = this.getWidgetdetails(widget.widgetKey);

    let widgetKey = widget.widgetKey;
    if (widgetDetails.isWidMultiple) {
      let itr = 1;
      while (!!pageWidgetIds) {
        if (pageWidgetIds.indexOf(widgetKey + '_' + itr) === -1) {
          widgetKey = widgetKey + '_' + itr;
          break;
        } else {
          itr++;
        }
      }
    }

    pageWidgetIds.push(widgetKey);
    this.userpreferenceService.addWidget(pageName, widgetKey, widgetPosition, true);
    return { pageWidgets: pageWidgetIds };
  }

  /**
   * Search the list based on the passed on the query!
   * @param widgetList Widget list
   * @param query search string
   */
  search(widgetList: Array<Widget>, query: string): Array<Widget> {
    return _.filter(widgetList, widget => {
      return widget.widgetName.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  /**
   * Read the page details from the site preferences to avoid adding this dependency to the store component!
   * @param pageName for which the details will be retrieved!
   */
  getPageDetails(pageName: string): { title: string; urlPattern: string } {
    const siteTitle = this.sitePreferenceService.getPageName(pageName);
    const urlPattern = this.sitePreferenceService.getleftNavPattern();
    return { title: siteTitle, urlPattern };
  }
}
