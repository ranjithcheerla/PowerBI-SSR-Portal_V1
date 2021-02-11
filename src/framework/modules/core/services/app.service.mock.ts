import { Subject, BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { User } from '../models/user.model';

export const mockAppService = {
  contentLoader$: new Subject<boolean>(),
  toggleSiteTitle$: new BehaviorSubject<boolean>(true),
  toggleRightNav$: new Subject<boolean>(),
  navigateToMenuItem$: new Subject<string>(),
  loadRightNavPage$: new Subject<{
    title: string;
    component: Component;
    status: boolean;
    input?: any;
  }>(),
  hideLeftMenuItem$: new Subject<string>(),
  userInfo$: new Subject<User>(),
  changeSiteTitle$: new BehaviorSubject<{ title: string; link: string }>({
    title: '',
    link: ''
  }),
  showFooter$: new BehaviorSubject<boolean>(true),
  widgetStoreRoute$: new Subject<any>(),
  hideWidgets$: new Subject<Array<string>>(),
  showLeftNav$: new Subject<boolean>(),
  maintenanceNotification$: new BehaviorSubject<string>(null),
  leftNavstate$: new Subject<boolean>(),
  layoutChanged$: new Subject<string>(),
  actionsMenuToggle$: new BehaviorSubject<boolean>(false)
};
