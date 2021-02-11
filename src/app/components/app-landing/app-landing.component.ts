import { Component, OnInit } from '@angular/core';
import { Header } from '@framework/models/header.model';
import { FrameworkService } from '@framework/services/framework.service';
import { FWRoot } from '@framework/core/base/FWRoot';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.scss']
})
export class AppLandingComponent extends FWRoot implements OnInit {
  constructor(public activatedRoute: ActivatedRoute, public fwService: FrameworkService) {
    super(activatedRoute, fwService);
  }

  ngOnInit() {
    this.fwService.apiToggleLeftNav(false);

    const header: Header = {
      title: 'Sample Landing',
      addWidget: false,
      resetWidget: false,
      addPages: false,
      breadcrumb: [{ label: 'Home', path: '' }]
    };
    this.fwService.apiSetHeader(header);

    this.fwService.apiToggleHeaderControls({ settings: false, actions: false });
    setTimeout(() => {
      this.fwService.apiToggleSplashScreen(false);
    }, 0);
  }
}
