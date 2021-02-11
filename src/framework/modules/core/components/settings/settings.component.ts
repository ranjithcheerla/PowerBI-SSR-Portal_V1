import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  HostListener,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  Output,
  EventEmitter,
  Inject,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ConfigurationService } from './../../services/configuration.service';
import { UserPreferenceService } from './../../services/userpreference.service';
import { Subject } from 'rxjs';
import { SettingsService } from './../../services/settings.service';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { AppService } from './../../services/app.service';
import { Platform } from '@angular/cdk/platform';
import { WindowToken } from './../../services/window.service';
import { DOCUMENT } from '@angular/common';
import { Themes, Layouts } from './../../../core/models/configurations';
import { ModalService } from './../../services/modal.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() isPopover: boolean;
  @Output() popUpClosed = new EventEmitter();
  popSettings = false;
  layouts = Layouts;
  themes = Themes;
  layout: Layouts = Layouts.BOXED;
  theme: Themes = Themes.THEME1;
  destroy$ = new Subject<boolean>();
  desktopMode = !(this.platform.ANDROID || this.platform.IOS);
  version = this?.configService?.config?.appConfig?.appInfo?.version ?? '';
  buildDate = this?.configService?.config?.appConfig?.appInfo?.buildDate ?? '';
  customSettings: any = this?.configService?.config?.customSettings?.component ?? undefined;
  customSettingsInput: any = this?.configService?.config?.customSettings?.input ?? undefined;
  @ViewChild('errorRestore') errorTempl: TemplateRef<any>;
  constructor(
    private appService: AppService,
    private configService: ConfigurationService,
    private userPreferenceService: UserPreferenceService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    private modalService: ModalService,
    @Inject(WindowToken) private window: any,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.settingsService.layout$.pipe(takeUntil(this.destroy$), distinctUntilChanged()).subscribe((layout: Layouts) => {
      this.changeLayout(layout, false);
    });

    this.settingsService.theme$.pipe(takeUntil(this.destroy$), distinctUntilChanged()).subscribe((theme: Themes) => {
      this.setTheme(theme, false);
    });
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  closeSettings() {
    this.popSettings = false;
    this.runChangeDetection();
  }
  toggleSettings() {
    this.popSettings = !this.popSettings;
    this.runChangeDetection();
  }
  changeLayout(layout: Layouts, save = true) {
    this.layout = layout;

    if (this?.configService?.config?.appConfig?.layoutCalculation) {
      this.userPreferenceService.setSiteLayout(layout, save);
    } else {
      this.updateLayout(layout, save);
    }
    this.appService.layoutChanged$.next(layout);
    this.runChangeDetection();
  }

  updateLayout(layout: Layouts, save: boolean) {
    if (layout === 'fluid') {
      this.renderer.addClass(this.document.body, 'fluid-layout');
    } else {
      this.renderer.removeClass(this.document.body, 'fluid-layout');
    }
    if (save) {
      this.settingsService.setLayout(layout);
    }
  }

  setTheme(theme: Themes, save = true) {
    this.renderer.removeClass(this.document.body, this.theme);
    this.theme = theme;
    this.renderer.addClass(this.document.body, this.theme);
    if (save) {
      this.settingsService.setTheme(theme);
    }
    this.runChangeDetection();
  }

  @HostListener('document: click', ['$event'])
  clickedOutside(event: any) {
    // Close the widget right trial, if it's open and clicked outside of the right trial.
    if (
      this.elRef.nativeElement !== null &&
      !event.target.classList.contains('fa-cog') &&
      !this.elRef.nativeElement.contains(event.target) &&
      this.popSettings
    ) {
      this.closeSettings();
    }
  }

  runChangeDetection() {
    this.cdr.detectChanges();
  }

  confirmRestore(confirmDialog: TemplateRef<any>) {
    this.modalService.openSuccessModal(confirmDialog);
  }

  restoreSettings() {
    this.settingsService.restoreDefaultSettings().subscribe(
      () => {
        this.closeModal();
        this.window.location.reload();
      },
      () => {
        this.closeModal();
        this.modalService.openErrorModal(this.errorTempl);
      }
    );
  }

  closeModal() {
    this.modalService.closeModal();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
