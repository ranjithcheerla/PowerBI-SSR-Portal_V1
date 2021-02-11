import { animate, state, style, transition, trigger } from '@angular/animations';
import { Platform } from '@angular/cdk/platform';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { LeftNav, LeftNavBack } from './../../models/leftNav.model';
import { AppService } from './../../services/app.service';
import { ConfigurationService } from './../../services/configuration.service';
import { FrameworkService } from './../../services/framework.service';
import { SettingsService } from './../../services/settings.service';
import { SitePreferenceService } from './../../services/sitepreference.service';
import { UserPreferenceService } from './../../services/userpreference.service';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss'],
  animations: [
    trigger('blinkAnimation', [
      state(
        'show',
        style({
          height: '*'
        })
      ),
      state(
        'hide',
        style({
          height: 0,
          overflow: 'hidden'
        })
      ),
      transition('show <=> hide', [animate('400ms ease-out')])
    ])
  ],
  providers: [NavigationService]
})
export class LeftnavComponent implements OnInit, OnChanges, OnDestroy {
  @Input() lhsActive: boolean;
  @Input() leftMenuTheme: string;
  @Input() prefUpdated: boolean;
  @Output() leftNavActive = new EventEmitter();
  isActive = true;
  activeSection = '';
  lhsMenuOpen = true;
  projectId = '';
  leftNavClass: string;
  leftNav: LeftNav[] = [];
  canLeftNavReorder = false;
  path = {};
  destroy$: Subject<boolean> = new Subject<boolean>();
  backLink: LeftNavBack = {
    text: null,
    route: null
  };
  launcher = false;
  lhsOverlayMenu = this?.configService?.config?.appConfig?.flyOutSubMenu ?? false;
  lhsOverlayMenuHeight: any;
  isMainMenuList = false;
  constructor(
    public sitePreferenceService: SitePreferenceService,
    private userPreferenceService: UserPreferenceService,
    public appService: AppService,
    private fwService: FrameworkService,
    private router: Router,
    private configService: ConfigurationService,
    private platform: Platform,
    private settingsService: SettingsService,
    private navigationService: NavigationService
  ) {
    this.leftNavClass = '';
  }
  ngOnChanges(changes: SimpleChanges) {
    this.isActive = this.lhsActive;
    if (changes?.prefUpdated && changes?.prefUpdated?.currentValue && !changes?.prefUpdated?.firstChange) {
      this.destroy$.next(true);
      this.ngOnInit();
    }
  }
  ngOnInit() {
    this.canLeftNavReorder = this.userPreferenceService.canLeftNavReorder();
    this.setDefaultNavMenu();

    this.appService.hideLeftMenuItem$
      .pipe(
        takeUntil(this.destroy$),
        filter(menuItem => menuItem !== null)
      )
      .subscribe(menuItem => {
        this.toggleVisibilty(this.leftNav, menuItem.id, menuItem.blink, menuItem.property, menuItem.state);
        this.appService.populateTheLeftNavModel(this.leftNav);
      });

    this.appService.navigateToMenuItem$.pipe(takeUntil(this.destroy$)).subscribe(pageId => {
      pageId === '__root' ? this.showRootMenu(this.leftNav) : this.toggleSubMenuVisibilty(this.leftNav, pageId);

      this.appService.populateTheLeftNavModel(this.leftNav);
    });

    this.appService.leftNavModel$
      .pipe(
        filter(leftNavModel => leftNavModel.model.length > 0),
        takeUntil(this.destroy$)
      )
      .subscribe(leftNavModel => {
        this.leftNav = leftNavModel.model;
        this.backLink = leftNavModel.back;
        this.appService.populateTheLeftNavModel(this.leftNav);
        this.navigationService.scrollIntoView();
      });

    this.userPreferenceService.leftNavOrderChanged$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.setDefaultNavMenu();
    });

    this.appService.widgetStoreRoute$.pipe(takeUntil(this.destroy$)).subscribe();
    this.navigationService.flyOutMenuFooter(this.lhsOverlayMenu);
  }

  setDefaultNavMenu() {
    const leftNavOrder = this.userPreferenceService.getNavigationOrder();
    const order = leftNavOrder !== undefined ? leftNavOrder : [];
    const isCustomLeftNav =
      this.configService.config.appConfig && this.configService.config.appConfig.customLeftNavMenu
        ? this.configService.config.appConfig.customLeftNavMenu
        : false;
    this.appService.leftNavRoute$
      .pipe(
        filter(() => !isCustomLeftNav),
        takeUntil(this.destroy$),
        take(2)
      )
      .subscribe(routeParams => {
        this.leftNav = this.userPreferenceService.getLeftNavPages('_root', {}, routeParams, order);
        this.appService.populateTheLeftNavModel(this.leftNav);
        this.appService.leftNavModelReady$.next(this.leftNav);
        this.navigationService.scrollIntoView();
      });
  }

  toggleMenu(nav: LeftNav) {
    if (nav.settings) {
      nav.settings.collapsed = !nav.settings.collapsed;
      this.fwService.apiNavigateBack(nav);
    }

    if (this.platform.ANDROID || this.platform.IOS) {
      this.appService.leftNavstate$.next(false);
      this.settingsService.leftNavStateDefault$.next(false);
    }

    if (!nav.settings) {
      this.emitSelectedCapability(nav);
    }
  }

  toggleVisibilty(item: Array<LeftNav>, id: string, blink: boolean, property: string, toggleState: boolean) {
    for (let i = 0; i < item.length; i++) {
      if (item[i][property] === id) {
        item[i]['blinkMenu'] = blink;
        setTimeout(() => {
          item[i].active = toggleState ?? !item[i].active;
        }, 0);
        break;
      }
      if (item[i].children) {
        this.toggleVisibilty(item[i].children, id, blink, property, toggleState);
      }
    }
  }

  toggleSubMenuVisibilty(item: Array<LeftNav>, pageId: string) {
    for (let i = 0; i < item.length; i++) {
      if (item[i].page === pageId) {
        item[i].active = true;
        if (item[i].settings) {
          item[i].settings.collapsed = false;
        }
        this.emitSelectedCapability(item[i]);
        break;
      }
      if (item[i].children) {
        this.toggleSubMenuVisibilty(item[i].children, pageId);
      }
    }
  }

  showRootMenu(item: Array<LeftNav>) {
    for (let i = 0; i < item.length; i++) {
      if (item[i].settings) {
        item[i].settings.collapsed = true;
      }
      if (item[i].children) {
        this.showRootMenu(item[i].children);
      }
    }
    this.emitSelectedCapability(item[0]);
  }

  navigateToReOrderPage() {
    this.router.navigate(['/reorder']);
  }

  leftNavMenuToggle(toggleState: boolean) {
    this.leftNavActive.emit(toggleState);
    this.appService.mobileMenuToggle$.next(toggleState);
  }

  activeItemOnLoad(leftNav: LeftNav) {
    setTimeout(() => {
      this.emitSelectedCapability(leftNav);
    }, 0);
  }

  private emitSelectedCapability(leftNav: LeftNav) {
    if (!leftNav.settings) {
      const siteName = this.sitePreferenceService.getSiteName();
      this.appService.selectedCapability$.next({
        key: leftNav.cKey,
        siteName: siteName,
        siteId: this.configService.config.appKey,
        pageName: leftNav.page
      });
    }

    this.isMainMenuList = this.leftNav.filter(item => item.key === leftNav.key && !item.settings).length > 0;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.navigationService.flyOutMenuFooter(this.lhsOverlayMenu);
  }

  setGlobalNavStatus(value: boolean) {
    this.launcher = value;
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  isParentActive(nav: LeftNav): boolean {
    if (!this.lhsOverlayMenu) {
      return false;
    }
    return nav.settings && this.lhsOverlayMenu && !this.isMainMenuList;
  }

  flyOutSubMenuClose(event: any) {
    this.navigationService.stopEventBubling(event);
    if (this.lhsOverlayMenu) {
      this.lhsOverlayMenuHeight = '100%';
    }
    this.navigationService.flyOutMenuFooter(this.lhsOverlayMenu);
  }

  flyOutSubMenuOpen(event: any) {
    if (!this.lhsOverlayMenu) {
      return;
    }
    const height = this.navigationService.calculateMenuHeight(event, this.lhsOverlayMenu);
    if (height !== null) {
      this.lhsOverlayMenuHeight = height;
    }
  }
}
