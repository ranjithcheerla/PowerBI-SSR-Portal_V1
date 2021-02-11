import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { PopoverDirective } from 'ngx-bootstrap/popover';
import { ConfigurationService } from './../../services/configuration.service';

@Component({
  selector: 'app-custom-header-component',
  templateUrl: './custom-header-component.component.html'
})
export class CustomHeaderComponentComponent implements OnInit {
  popActions = false;
  @Input() isPopover = true;
  @Output() closeMobileMenu = new EventEmitter<boolean>();
  @ViewChild('popover', { static: false }) popover: PopoverDirective;

  customAddOnHeaderComponent: any;
  customAddOnHeaderInput: any;
  customAddOnHeaderText: string;
  constructor(private configService: ConfigurationService) {}

  ngOnInit() {
    if (this.configService.config.appConfig && this.configService.config.appConfig.customAddOnOptionForHeaderComponent) {
      this.customAddOnHeaderComponent = this.configService.config.appConfig.customAddOnOptionForHeaderComponent.component;
      this.customAddOnHeaderInput = this.configService.config.appConfig.customAddOnOptionForHeaderComponent.input;
      this.customAddOnHeaderText = this.configService.config.appConfig.customAddOnOptionForHeaderComponent.text;
    }
  }

  togglePopup(state: boolean) {
    this.popActions = state;
  }

  closePopoverOrMenu() {
    if (this.popover) {
      this.popover.hide();
    }
    this.closeMobileMenu.emit();
  }
}
