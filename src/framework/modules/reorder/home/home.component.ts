import { Component, OnInit, OnDestroy } from '@angular/core';
import { FWRoot } from './../../core/base/FWRoot';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FrameworkService } from './../../core/services/framework.service';
import { UserPreferenceService } from './../../core/services/userpreference.service';
import { AppService } from './../../core/services/app.service';
import { Header } from './../../core/models/header.model';
import { SplashscreenService } from './../../core/services/splashscreen.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends FWRoot implements OnInit, OnDestroy {
  order = [];
  rootLevelNavs = [];
  breadcrumbItemsArr = [];
  subscriptions: Subscription[] = [];
  updatedOrder = [];
  itemCanBeAdded = [];
  constructor(
    public _route: ActivatedRoute,
    public fwService: FrameworkService,
    public userPreferenceService: UserPreferenceService,
    private appService: AppService,
    private splashscreenService: SplashscreenService
  ) {
    super(_route, fwService);
  }

  ngOnInit() {
    this.rootLevelNavs = this.appService.getLeftNavModel();
    this.setup();
    this.splashscreenService.hide();
  }

  setup() {
    this.breadcrumbItemsArr = [
      { label: 'Home', path: '' },
      { path: '', label: 'Reorder Left Navigation' }
    ];

    const header: Header = {
      title: 'Reorder Left Navigation',
      addWidget: false,
      resetWidget: false,
      breadcrumb: this.breadcrumbItemsArr,
      addPages: false,
      pageRefresh: false
    };
    this.appService.setHeader(header);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.rootLevelNavs, event.previousIndex, event.currentIndex);
    this.updatedOrder = this.rootLevelNavs.map(item => item.key);
  }

  saveOrder() {
    if (this.updatedOrder.length > 0) {
      this.userPreferenceService.setLeftNavOrderSettings(this.updatedOrder, true, true);
      this.userPreferenceService.notifyNavigationOrderChanged();
    }
  }

  removeItem(index) {
    this.rootLevelNavs[index].active = false;
  }

  addItem(index) {
    this.rootLevelNavs[index].active = true;
  }

  ngOnDestroy() {}
}
