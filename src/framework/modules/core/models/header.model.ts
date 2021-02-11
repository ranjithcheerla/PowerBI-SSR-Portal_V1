import { Component } from '@angular/core';
import { BreadcrumbItem } from './breadcrumb.model';

export interface Header {
  title: string;
  breadcrumb?: BreadcrumbItem[];
  addWidget?: boolean;
  resetWidget?: boolean;
  pageConfigComponent?: Component;
  addPages?: boolean;
  pageRefresh?: boolean;
  userInfo?: boolean;
  adminLink?: boolean;
}

export interface ShowHeader {
  tophat: boolean;
  appHeader: boolean;
}

export interface HeaderControls {
  search?: boolean;
  actions?: boolean;
  settings?: boolean;
  user?: boolean;
  customIcon1?: { class: string; label: string; tooltip?: string };
  customIcon2?: { class: string; label: string; tooltip?: string };
}
