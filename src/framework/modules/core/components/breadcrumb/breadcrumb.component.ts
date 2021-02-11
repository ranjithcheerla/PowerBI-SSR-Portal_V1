import { Component, OnInit, Input, Output, EventEmitter, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppService } from './../../../core/services/app.service';
import { delay } from 'rxjs/operators';
import { WindowToken } from './../../../core/services/window.service';
import { BreadcrumbItem } from './../../models/breadcrumb.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {
  public _breadcrumbItem: BreadcrumbItem[];
  showBreadcrumb$: Observable<boolean> = of(true);
  @Input() disableLastChildClick: boolean;
  @Input() set breadcrumbItem(breadcrumbItemList: BreadcrumbItem[]) {
    this._breadcrumbItem = breadcrumbItemList;
  }
  @Output() breadCrumbClick: EventEmitter<any> = new EventEmitter();

  get breadcrumbItem(): BreadcrumbItem[] {
    return this._breadcrumbItem;
  }
  constructor(private appService: AppService, @Inject(WindowToken) private window: Window, private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.showBreadcrumb$ = this.appService.toggleBreadcrumb$.pipe(delay(0));
  }

  emitPath(item: BreadcrumbItem, last: boolean) {
    if (item.external) {
      this.window.location.href = item.path;
      return;
    }

    // Strip the query params from the URL.
    item.path = item.path.split('?')[0];

    if (!(last && this.disableLastChildClick)) {
      this.breadCrumbClick.emit(item);
      this.appService.breadCrumbClick$.next({
        item: item,
        queryParams: this.activatedRoute.snapshot.queryParams,
        list: this.breadcrumbItem
      });
    }
  }
}
