import { Component, OnInit, TemplateRef } from '@angular/core';
import { Header } from '@framework/models/header.model';
import { FrameworkService } from '@framework/services/framework.service';
import { FWRoot } from '@framework/core/base/FWRoot';
import { ActivatedRoute, Router } from '@angular/router';
import { PowerbirestService } from 'app/services/powerbirest.service';
// import { browser } from 'protractor';
@Component({
  selector: 'app-sr-lending',
  templateUrl: './sr-lending.component.html',
  styleUrls: ['./sr-lending.component.scss']
})
export class SrLendingComponent extends FWRoot implements OnInit {
  constructor(public activatedRoute: ActivatedRoute, public fwService: FrameworkService,
    private router: Router, private _powerBiClient: PowerbirestService) {
    super(activatedRoute, fwService);
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params.section)
    this.fwService.apiToggleLeftNav(true);
    const header: Header = {
      title: '',
      addWidget: false,
      resetWidget: false,
      addPages: false,
      breadcrumb: [{ label: 'Home', path: '/' }, { label: 'Standard Reports', path: '/standard-reports' }, { label: 'Lending Dashboard', path: '/sr-lending' }],
    };
    this.fwService.apiSetHeader(header);

    this.fwService.apiToggleHeaderControls({ settings: false, actions: false });
    setTimeout(() => {
      this.fwService.apiToggleSplashScreen(false);
    }, 0);
  }


}
