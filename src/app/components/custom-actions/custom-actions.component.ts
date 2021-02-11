import { Component, OnInit, Input } from '@angular/core';
import { FrameworkService } from '@framework/core/services/framework.service';

@Component({
  selector: 'app-custom-actions',
  templateUrl: './custom-actions.component.html'
})
export class CustomActionsComponent implements OnInit {
  // deafults is the default input which App teams can set the default values
  // while this dynamic component is instantiated.
  @Input() defaults: any;
  constructor(private fwService: FrameworkService) {}

  ngOnInit() {}

  customAction() {
    // Do some custom actions here...
    // App teams can power with the below method to close the actions menu, whenever they can.
    // This will be helpful for implementing complex scenarios.
    this.fwService.apiActionMenuToggle(false);
  }
}
