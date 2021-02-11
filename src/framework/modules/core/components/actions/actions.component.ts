import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Header } from './../../models/header.model';
import { SitePreferenceService } from './../../services/sitepreference.service';
import { AppService } from './../../services/app.service';
import { takeUntil, filter } from 'rxjs/operators';
import { ConfigurationService } from './../../services/configuration.service';
import { Router } from '@angular/router';
import { InPageStoreComponent } from '../in-page-store/in-page-store.component';
import { PopoverDirective } from 'ngx-bootstrap/popover';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { _ } from './../../../../lodash';
import { ICapabilitySelected } from './../../models/capability.model';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsComponent implements OnInit, AfterViewInit, OnDestroy {
  header = {
    resetWidget: true,
    addWidget: true,
    addPages: this.sitePreferenceService.hasManagePage(),
    pageRefresh: true,
    adminLink: false,
    userInfo: false,
    title: ''
  };
  headers$ = new BehaviorSubject<Header>(this.header);
  destroy$ = new Subject<boolean>();
  widgetStorePath: { [key: string]: any };
  @Input() isPopover = true;
  @Output() closeMobileMenu = new EventEmitter<boolean>();
  customActionsComponent: any;
  compInput: any;
  popActions = false;
  modalRef: BsModalRef;
  currentPage: string;
  @ViewChild('popover', { static: false }) popover: PopoverDirective;
  constructor(
    private sitePreferenceService: SitePreferenceService,
    private appService: AppService,
    private configService: ConfigurationService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    const appConfig = this.configService.config.appConfig;
    const { component, input } = appConfig?.customAction ?? { component: undefined, input: undefined };
    this.customActionsComponent = component;
    this.compInput = input;
    this.appService.header$.pipe(takeUntil(this.destroy$)).subscribe(header => {
      this.headers$.next(header);
    });

    this.appService.toggleAdminLink$.asObservable().subscribe((state: boolean) => {
      this.header = _.merge({}, this.header, { adminLink: state });
      this.headers$.next(this.header);
    });

    this.appService.actionsMenuToggle$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: boolean) => {
        if (!!this.popover) {
          state ? this.popover.show() : this.popover.hide();
        }
      });

    this.appService.widgetStoreRoute$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(routeParams => {
        this.widgetStorePath = routeParams;
      });

    this.appService.selectedCapability$
      .asObservable()
      .pipe(filter((cap: ICapabilitySelected) => cap?.pageName !== ''))
      .subscribe((cap: ICapabilitySelected) => (this.currentPage = cap?.pageName ?? ''));
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  navigateToAdminPageUrl() {
    this?.popover?.hide();
    const url = this?.configService?.config?.appConfig?.adminUrl;
    if (url !== undefined && url !== '') {
      this.router.navigate([url]);
    }
  }

  togglePopup(state: boolean) {
    this.popActions = state;
    this.runChangeDetection();
  }

  pageRefresh() {
    this.closePopoverOrMenu();
    this.appService.pageRefresh$.next();
  }

  openWidgetStore() {
    this.closePopoverOrMenu();
    if (this.sitePreferenceService.isWidgetStoreDisplayedOnRightTrial()) {
      this.appService.loadRightNavPage$.next({
        title: 'Widget Store',
        component: InPageStoreComponent as Component,
        status: true
      });
    } else {
      this.router.navigate(['widgetstore'], {
        queryParams: _.merge({}, this.widgetStorePath, { pageName: this.currentPage })
      });
    }
  }

  confirmPageReset(resetTemplate: TemplateRef<any>) {
    this.closePopoverOrMenu();
    this.modalRef = this.modalService.show(resetTemplate, {
      class: 'cf-modal modal-dialog cf-modal-sm modal-dialog-centered'
    });
  }

  resetPage() {
    this.appService.pageReset$.next(true);
    this.modalRef.hide();
  }

  closePopoverOrMenu() {
    if (this.popover) {
      this.popover.hide();
    }
    this.closeMobileMenu.emit();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  runChangeDetection() {
    this.cdr.detectChanges();
  }
}
