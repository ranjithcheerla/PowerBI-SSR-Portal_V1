import { Subject } from 'rxjs';
import { AppService } from '../../services/app.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { _ } from '../../../../lodash';
import { WidgetstoreService } from '../../services/widgetstore.service';
import { ConfigurationService } from '../../services/configuration.service';
import { FrameworkService } from '../../services/framework.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Widget } from '../../models/widget.model';
import { pluck, takeUntil, filter } from 'rxjs/operators';
import { ICapabilitySelected } from '../../models/capability.model';

@Component({
  selector: 'app-inpagestore',
  templateUrl: './in-page-store.component.html',
  styleUrls: ['./in-page-store.component.scss']
})
export class InPageStoreComponent implements OnInit, OnDestroy {
  @ViewChild(ToastContainerDirective, { static: false })
  toastContainer: ToastContainerDirective;
  private destroy$ = new Subject<boolean>();
  showSearchedWidgets = false;
  selectedCategory = 'All';
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
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.widgetStoreService.widgetRemoved$.pipe(takeUntil(this.destroy$)).subscribe((widgetRef: { widget: string }) => {
      this.removeSelectedWidget(widgetRef.widget);
    });
    this.appService.selectedCapability$
      .asObservable()
      .pipe(
        filter((cap: ICapabilitySelected) => !!cap?.pageName),
        pluck('pageName'),
        takeUntil(this.destroy$)
      )
      .subscribe((pageName: string) => {
        const categories = this?.configurationService?.config?.widgetCategories ?? {};
        // Can do better - Refcator this piece of code!
        if (/\W|_/g.test(pageName)) {
          const page = pageName.split('/');
          this.pageName = page[page.length - 1];
        } else {
          this.pageName = pageName;
        }
        this.selectedCategory = categories?.[this.pageName] ?? 'All';

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
      });
  }

  removeSelectedWidget(widgetKey: string) {
    const index = this.pageWidgetIds.indexOf(widgetKey);
    if (index !== -1) {
      if (this.selectedWidgets[widgetKey]) {
        this.selectedWidgets[widgetKey] = this.selectedWidgets[widgetKey] - 1;
        if (this.selectedWidgets[widgetKey] === 0) {
          delete this.selectedWidgets[widgetKey];
        }
      }
      this.pageWidgetIds.splice(index, 1);
      this.selectedWidgets = _.merge({}, this.selectedWidgets);
    }
  }

  addwidget(widget: Widget) {
    //  Don't allow to add
    if (!widget.isWidMultiple && !!this.selectedWidgets[widget.widgetKey]) {
      return;
    }
    const { pageWidgets } = this.widgetStoreService.addWidget(widget, this.pageName, this.pageWidgetIds);
    this.pageWidgetIds = pageWidgets;
    this.selectedWidgets[widget.widgetKey] = this.selectedWidgets[widget.widgetKey] ? this.selectedWidgets[widget.widgetKey] + 1 : 1;
    this.toastrService.success(widget.widgetName + ' Widget added successfully.');
  }

  searchWidgetStore(query: string) {
    this.showSearchedWidgets = query.trim() !== '';
    this.searchResults = this.widgetStoreService.search(this.widgetsList, query) ?? [];
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
