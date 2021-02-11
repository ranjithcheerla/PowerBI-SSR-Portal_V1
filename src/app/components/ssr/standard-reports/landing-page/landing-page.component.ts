import { Component, OnInit, TemplateRef } from '@angular/core';
import { Header } from '@framework/models/header.model';
import { FrameworkService } from '@framework/services/framework.service';
import { FWRoot } from '@framework/core/base/FWRoot';
import { ActivatedRoute, Router } from '@angular/router';
import { PowerbirestService } from 'app/services/powerbirest.service';
import { browser } from 'protractor';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent extends FWRoot implements OnInit {


  constructor(public activatedRoute: ActivatedRoute, public fwService: FrameworkService,
    private router: Router, private _powerBiClient: PowerbirestService) {
    super(activatedRoute, fwService);
  }

  widgets: any[] = [];
  lendingWidget;
  portfolioWidget;
  asaWidget;
  cpfWidget;
  browseByPath;
  myFavoritesData;
  myfaouriteAccordion;
  showSharedLoading;
  isSharedfavoriteReportAvailable;
  sharedWithMeFavoritesData;
  mySharedfaouriteAccordion;
  showLoading;
  modalRef;
  ngOnInit(): void {
    this.fwService.apiToggleLeftNav(true);
    const header: Header = {
      title: '',
      addWidget: false,
      resetWidget: false,
      addPages: false,
      breadcrumb: [{ label: 'Home', path: '/' }, { label: 'Standard Reports', path: '/standard-reports' }],
    };
    this.fwService.apiSetHeader(header);

    this.fwService.apiToggleHeaderControls({ settings: false, actions: false });
    setTimeout(() => {
      this.fwService.apiToggleSplashScreen(false);
    }, 0);

    this._powerBiClient.getStandardReports().subscribe(data => {

      // this.widgets = this._powerBiClient.getPowerBIReportsForType('Widget').slice(0, 1);
      const homeWidgets = this._powerBiClient.getPowerBIReportsForType('Widget')
        .filter(widget => widget.reportType === 'Widget' && widget.webPart === 'Home');
      homeWidgets.forEach(widget => {
        switch (widget.busArea) {
          case 'Lending':
            this.lendingWidget = widget;
            break;
          case 'Portoflio':
            this.portfolioWidget = widget;
            break;
          case 'ASA':
            this.asaWidget = widget;
            break;
          case 'CPF':
            this.cpfWidget = widget;
            break;
        }
      });

      const lendHtml = <HTMLElement>(document.getElementById('lendingWdgtContainer'));
      this._powerBiClient.embedPowerBIReport(lendHtml, homeWidgets[0]);
      const portHtml = <HTMLElement>(document.getElementById('portfolioWdgtContainer'));
      this._powerBiClient.embedPowerBIReport(portHtml, homeWidgets[1]);
      const asaHtml = <HTMLElement>(document.getElementById('asaWdgtContainer'));
      this._powerBiClient.embedPowerBIReport(asaHtml, homeWidgets[2]);
      const cpfHtml = <HTMLElement>(document.getElementById('cpfWdgtContainer'));
      this._powerBiClient.embedPowerBIReport(cpfHtml, homeWidgets[3]);


    });

  }
  embedWidget(widgetId) {
    // console.log("Lending embed -->" + widgetId);

  }
  reportClick(data) {

  }
  shareClick() {

  }
  shareReportClick(data, sharetemplate) {

  }

  lendingViewMore() {
    this.router.navigate(['../sr-lending'], { relativeTo: this.activatedRoute, preserveQueryParams: false });
  }
  portfolioViewMore() {
    this.router.navigate(['../operations/portfolio'], { relativeTo: this.activatedRoute, preserveQueryParams: false });
  }
  asaViewMore() {
    this.router.navigate(['../operations/asa'], { relativeTo: this.activatedRoute, preserveQueryParams: false });
  }
  cpfViewMore() {
    this.router.navigate(['../operations/cpf'], { relativeTo: this.activatedRoute, preserveQueryParams: false });
  }
}
