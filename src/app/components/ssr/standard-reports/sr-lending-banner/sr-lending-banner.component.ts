import { Component, OnInit, TemplateRef } from '@angular/core';
import { Header } from '@framework/models/header.model';
import { FrameworkService } from '@framework/services/framework.service';
import { FWRoot } from '@framework/core/base/FWRoot';
import { ActivatedRoute, Router } from '@angular/router';
import { PowerbirestService } from 'app/services/powerbirest.service';


@Component({
  selector: 'app-sr-lending-banner',
  templateUrl: './sr-lending-banner.component.html',
  styleUrls: ['./sr-lending-banner.component.scss']
})
export class SrLendingBannerComponent extends FWRoot implements OnInit {
  currentActive: string;
  constructor(public activatedRoute: ActivatedRoute, public fwService: FrameworkService,
    private router: Router, private _powerBiClient: PowerbirestService) {
    super(activatedRoute, fwService);
  }

  ngOnInit(): void {
    this.currentActive = this.activatedRoute.snapshot.routeConfig.path;
  }

  dashBoardClick() {
    this.router.navigate(["../sr-lending"], { relativeTo: this.activatedRoute, preserveQueryParams: true });
  }

  reportsClick() {
    this.router.navigate(["../sr-lending-reports"], { relativeTo: this.activatedRoute, preserveQueryParams: true });
  }

}
