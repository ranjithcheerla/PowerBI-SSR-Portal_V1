import { AppService } from './../../../core/services/app.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { _ } from './../../../../lodash';
import { FWRoot } from '../../../core/base/FWRoot';
import { WidgetstoreService } from '../../../core/services/widgetstore.service';
import { Header } from '../../../core/models/header.model';
import { RouteURL } from './../../../commonutil/utils/routeurl.util';
import { ConfigurationService } from './../../../core/services/configuration.service';
import { FrameworkService } from './../../../core/services/framework.service';
import { SplashscreenService } from './../../../core/services/splashscreen.service';
import { Widget } from '../../../core/models/widget.model';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-widgetstore',
  templateUrl: './fullpage-store.component.html',
  styleUrls: ['./fullpage-store.component.scss']
})
export class FullpageStoreComponent extends FWRoot implements OnInit {
  showSearchedWidgets = false;
  selectedCategory = 'All';
  searchTerm = '';
  pageWidgetIds: Array<string> = [];
  pageName = '';
  searchResults: Array<Widget> = [];
  widgetsList: Array<Widget> = [];
  selectedWidgets: { [key: string]: number } = {};
  categories: { [key: string]: Array<any> } = {};
  constructor(
    public appService: AppService,
    public route: ActivatedRoute,
    private widgetStoreService: WidgetstoreService,
    private configurationService: ConfigurationService,
    public fwService: FrameworkService,
    private splashscreenService: SplashscreenService
  ) {
    super(route, fwService);
  }

  ngOnInit() {
    const categories = this?.configurationService?.config?.widgetCategories ?? {};
    this.appService.headerControls$.next({
      actions: false,
      search: false,
      settings: false
    });
    this.appService.platformReady$
      .asObservable()
      .pipe(
        filter((isReady: boolean) => isReady),
        switchMap(() => {
          return this.route.queryParams;
        })
      )
      .subscribe((params: Params) => {
        this.pageName = /\W|_/g.test(params['pageName'])
          ? params['subsection2'] || params['subsection1'] || params['section']
          : params['pageName'];
        this.selectedCategory = categories?.[this.pageName] ?? 'All';

        const { title, urlPattern } = this.widgetStoreService.getPageDetails(this.pageName);
        this.setPageHeader(title, urlPattern, params);

        // Get the widgets which are already added on the page
        this.pageWidgetIds = this.widgetStoreService.getWidgetIdsAddedForThePage(this.pageName);
        // Get the complete widget set which are not disabled, excluded etc.,
        const storeWidgets = this.widgetStoreService.getStoreWidgets(this.pageName);
        // Mark the widgets which are already added to the page
        this.widgetsList = this.widgetStoreService.markSelectedWidgets(this.pageWidgetIds, storeWidgets);
        // categorize the widgets according to their respective categories!
        this.categories = this.widgetStoreService.getWidgetCategories(storeWidgets);
        // Read the counts on number of times, the widget has been added to the page!
        this.selectedWidgets = this.widgetStoreService.getMultipleWidgetCounts(this.pageWidgetIds);
        this.splashscreenService.hide();
      });
  }

  setPageHeader(title: string, urlPattern: string, params: Params) {
    const breadcrumb = [
      { label: 'Home', path: '' },
      {
        path: RouteURL.getUrlPostFixParams(urlPattern, params),
        label: title
      },
      { path: '', label: 'Widget Store' }
    ];
    const header: Header = {
      title: 'Widget Store',
      addWidget: false,
      resetWidget: false,
      breadcrumb: breadcrumb,
      addPages: false
    };
    this.appService.setHeader(header);
  }

  addWidget(widget: Widget) {
    const { pageWidgets } = this.widgetStoreService.addWidget(widget, this.pageName, this.pageWidgetIds);
    this.pageWidgetIds = pageWidgets;
    this.selectedWidgets[widget.widgetKey] = this.selectedWidgets[widget.widgetKey] ? this.selectedWidgets[widget.widgetKey] + 1 : 1;
  }

  searchWidgetStore(query: string) {
    this.showSearchedWidgets = query.trim() !== '';
    this.searchResults = this.widgetStoreService.search(this.widgetsList, query) ?? [];
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
