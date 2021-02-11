import { SitePreferenceService } from './../../../core/services/sitepreference.service';
import { ConfigurationService } from './../../../core/services/configuration.service';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { _ } from './../../../../lodash';
import { AppService } from './../../../core/services/app.service';
import { WidgetstoreService } from './../../../core/services/widgetstore.service';
import { UserPreferenceService } from './../../../core/services/userpreference.service';
import { RouteURL } from './../../../commonutil/utils/routeurl.util';
import { WidgetError, Help } from './../../models/widget.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, OnChanges {
  @Input() isHidden = false;
  @Input() compName: string; // Widget name
  sanitizedWidget = '';
  @Input() widgetconfig: any = {}; // Widget configuration
  @Input() activeTab: string; // Current layout Name
  @Input() reset = false; // Flag to reset a layout to its default preferences in defaultLayout[app.constant.ts]
  @Input() panel: string; // Layout panel i.e Left / Right
  @Input() isDraggable: boolean;
  @Output() widgetLoadingDone = new EventEmitter<string>();
  showCount = false;
  pageName = '';
  widgetRemove = false;
  showWidgetHeader = true;
  widgetIcon = '';
  count = 0;
  angComponent: any;
  widgetConfigComponent: any;
  customWidgetConfigComponent: any;
  titleBarRightComponent: any;
  summaryComponent: any;
  widgetTitle = ''; // Widget Title
  hideLoader = false; // Flag to hide the loading spinner inside a widget
  personalizable = true;
  isCollapsed = false;
  isWidgetLoaded = false;
  widgetStyles = {};
  widgetError: { message: string; type: string };
  showWidgetError = false;
  helpIcon = false;
  helpText = '';
  showCustomHelpIcon = false;
  editWidgetTitle = false;
  showEditTitleIcon = false;
  widgetData: any;
  modalRef: BsModalRef;
  configChangeOutput = {
    widgetEvent: event => {
      this.handlewidgetEvent(event);
    }
  };

  // Input & Output parameters for Widget
  outputData = {
    hideLoader: (status: boolean = true) => {
      this.hideLoader = status;
      if (!this.isWidgetLoaded && status === true) {
        this.widgetLoadingDone.emit(this.compName);
        this.isWidgetLoaded = !this.isWidgetLoaded;
      }
      this.cdr.detectChanges();
    },
    // Get the error from corresponding widget
    showErrorMessage: (error: WidgetError) => {
      this.showWidgetError = true;
      const validTypes = ['warning', 'info', 'error'];
      this.widgetError = {
        message: error.message,
        type: validTypes[error.type]
      };
    },
    clearErrorMessage: () => {
      this.showWidgetError = false;
    },
    helpIconWithMesssage: (message: Help) => {
      this.helpIcon = message.showIcon || true;
      this.helpText = message.helpText;
    },
    showHelpIcon: (visibility: boolean) => {
      this.showCustomHelpIcon = visibility;
    },
    widgetOutput: widgetConfig => {
      if (!_.isEmpty(widgetConfig)) {
        if (widgetConfig.header) {
          if (widgetConfig.header.count) {
            this.updateCount(widgetConfig.header.count);
          }
          if (widgetConfig.header.icon) {
            this.updateWidgetIcon(widgetConfig.header.icon);
          }
          if (widgetConfig.header.title) {
            this.updateWidgetTitle(widgetConfig.header.title);
          }
          if (widgetConfig.header.editTitle !== undefined) {
            this.showEditTitleIcon = widgetConfig.header.editTitle;
          }
        }
      }
    }
  };
  inputData: any = {
    panel: '',
    widget: '',
    widgetconfig: {},
    event: '',
    content: ''
  };
  @ViewChild('removeWidgetTemplate', { static: false }) removeWidgetTemplate: TemplateRef<any>;
  constructor(
    private appService: AppService,
    private widgetStoreService: WidgetstoreService,
    private cdr: ChangeDetectorRef,
    private userPreferenceService: UserPreferenceService,
    private configurationService: ConfigurationService,
    private sitePreferencesService: SitePreferenceService,
    private modalService: BsModalService
  ) {}
  ngOnInit() {
    this.sanitizedWidget = this.compName.replace(/_.*/g, '');
    this.angComponent = this.configurationService.config.widgets[this.sanitizedWidget].COMPONENT;
    if (this.configurationService.config.widgets[this.sanitizedWidget].CONFIG) {
      this.customWidgetConfigComponent = this.configurationService.config.widgets[this.sanitizedWidget].CONFIG;
    }
    if (this.configurationService.config.widgets[this.sanitizedWidget].TITLEBARCONFIG) {
      this.titleBarRightComponent = this.configurationService.config.widgets[this.sanitizedWidget].TITLEBARCONFIG;
    }
    if (this.configurationService.config.widgets[this.sanitizedWidget].SUMMARY) {
      this.summaryComponent = this.configurationService.config.widgets[this.sanitizedWidget].SUMMARY;
    }
    this.widgetconfig = this.widgetStoreService.getWidgetdetails(this.sanitizedWidget) ?? {};
    if (this?.widgetconfig?.widJson) {
      const widJson = JSON.parse(this.widgetconfig.widJson);
      if (widJson.widgetStyles) {
        this.widgetStyles = widJson.widgetStyles;
      }
    }
    const title = this?.widgetconfig?.widgetName;
    this.pageName =
      this.appService.getAppData('routeParams').subsection2 ||
      this.appService.getAppData('routeParams').subsection1 ||
      this.appService.getAppData('routeParams').section;
    // Below code is a hack for allowing non pageURLPattern routes to use the Layout Rendering engine.
    // It allows app teams to have a static string in the route and contains the page definition in the site preferences
    // Ex: ` http://xyz.com/createsite` createsite is a static string route which will separte from the pageURLPattern
    if (!this.pageName) {
      this.pageName = RouteURL.pageNameFromPath(location.href);
    }
    this.widgetTitle = title ? title : 'NO TITLE';
    this.personalizable = this.sitePreferencesService.isWidgetStoreRequired(this.pageName);
    this.widgetData = this.configurationService.config.widgets[this.sanitizedWidget].DATA || {};
    this.setInitialConfig();
  }

  updateCount(count) {
    this.showCount = true;
    this.count = count;
  }

  updateWidgetTitle(title) {
    this.widgetTitle = title;
  }

  updateWidgetIcon(icon) {
    this.widgetIcon = icon;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reset'] && !changes['reset'].firstChange) {
      this.setInitialConfig();
    }
  }

  // Overrides all default widget configuration settings for a widget
  setInitialConfig() {
    const defaultsConfig = {};
    const userPref = this.userPreferenceService.getWidgetConfig(this.compName, this.pageName, true);
    const pageWidgetConf = this.sitePreferencesService.getPageWidgetConfig(this.pageName, this.compName);
    const widPref = this.widgetStoreService.getWidgetConfig(this.sanitizedWidget) ?? {};
    const config = _.merge(defaultsConfig, widPref, pageWidgetConf, userPref);

    this.inputData = {
      panel: this.panel,
      widget: this.compName,
      widgetconfig: config,
      event: '',
      content: ''
    };
    this.widgetRemove = typeof pageWidgetConf.removable !== 'undefined' ? pageWidgetConf.removable : true;
    this.showWidgetHeader = typeof pageWidgetConf.hasHeader !== 'undefined' ? pageWidgetConf.hasHeader : true;
    this.isCollapsed = config.collapsed;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.handlewidgetEvent({
      action: 'collapsed',
      data: this.isCollapsed
    });
  }

  // Remove Widget
  removeWidget() {
    this.modalRef = this.modalService.show(this.removeWidgetTemplate, {
      class: 'cf-modal modal-dialog cf-modal-sm modal-dialog-centered'
    });
  }

  customHelpIconClick() {
    this.inputData = _.merge({}, this.inputData, {
      event: 'HELP_ICON_CLICKED'
    });
  }

  handlewidgetEvent(eventdata) {
    if (eventdata.action === 'collapsed') {
      this.userPreferenceService.setWidgetConfig(this.compName, eventdata.action, eventdata.data, this.pageName, true);
    }
  }

  removeWidgetFromPage() {
    this.userPreferenceService.removeWidget(this.activeTab, this.compName, true);
    this.modalRef.hide();
  }

  editTheTitle() {
    this.editWidgetTitle = true;
  }

  saveModifiedTitle(title: string) {
    this.widgetTitle = title;
    this.editWidgetTitle = false;
    this.inputData = _.merge({}, this.inputData, {
      event: 'TITLE_UPDATED',
      content: title
    });
  }
}
