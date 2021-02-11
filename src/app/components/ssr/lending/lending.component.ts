import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { FrameworkService } from '@framework/core/services/framework.service';
import { Header } from '@framework/core/models/header.model';
import { PowerbirestService } from 'app/services/powerbirest.service';
import { NgxPowerBiService } from 'ngx-powerbi';
import * as pbi from 'powerbi-client';
import { Router } from '@angular/router';
import { MsalInterceptor } from '@framework/msal/index';
@Component({
  selector: 'app-lending',
  templateUrl: './lending.component.html',
  styleUrls: ['./lending.component.scss']
})
export class LendingComponent implements OnInit, AfterViewInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  constructor(public fwService: FrameworkService, public powerbirestService: PowerbirestService, private router: Router) { }
  searchTerm: any;
  isListFullScreen: any;
  navslideopen = true;
  powerbiToken: string;
  private pbiModels: any;
  groupId = '6425b4fc-2524-4660-86a9-74242c6baa8a';
  dashboardId = '893929c9-43c9-4b2c-b84d-6d9b21c03576';
  tileId = 'c2d928d0-238d-40e0-8a9e-3b6bad0067df';
  reportId = '300dc50c-5d82-428f-8ee4-ebb0f9e9e43f';

  portDashboarId = 'ce5c3cb6-5139-4a2c-a86e-28c08e085c4d';
  portTileId = 'fdd257f8-a3e5-4cab-9e29-cf3ae471ead2';
  portReportId = '';

  private powerBiService: NgxPowerBiService;
  private pbiContainerElement: HTMLElement;
  private pbiContainerElement1: HTMLElement;

  doserach(searchItem) {

  }
  toggleFullScreen() {

  }
  setCreateReportParam() {

    this.powerbirestService.setCreateRpt('Operations', 'Lending & Pipeline');

  }
  capitalize(Mystring) {
    return Mystring.charAt(0).toUpperCase() + Mystring.slice(1).toLowerCase();
  }
  openDashboardReport(reportId) {
    this.powerbirestService.getReportInGroup(this.groupId, reportId).subscribe(data => {
      this.powerbirestService.selectedRpt = data;
      this.powerbirestService.selectedRpt.backurl = window.location.pathname;
      this.powerbirestService.selectedRpt.backUrlTitle = this.capitalize(window.location.pathname.split('/')[1])
        + ' / ' + this.capitalize(window.location.pathname.split('/')[2]);

      this.router.navigate(['/embed-report']);
    });
  }
  ngOnInit(): void {
    const header: Header = {
      title: '',
      addWidget: false,
      resetWidget: false,
      addPages: false,
      breadcrumb: [{ label: 'Home', path: '/' }, { label: 'Operations', path: '/Operations' }, { label: 'Lending', path: '/Operations/lending' }],
      pageRefresh: true
    };
    this.fwService.apiSetHeader(header);

    this.powerBiService = new NgxPowerBiService();

    this.pbiContainerElement = <HTMLElement>(document.getElementById('dashboardLending'));
    this.pbiContainerElement1 = <HTMLElement>(document.getElementById('dashboardPortfolio'));
    this.pbiModels = pbi.models;

    this.powerbirestService.getTileInGroup(this.groupId, this.dashboardId, this.tileId).subscribe(data => {
      PowerbirestService.token = MsalInterceptor.accessToken;
      this.powerbiToken = PowerbirestService.token;
      const config = {
        type: 'tile',
        embedUrl: data.embedUrl,
        tokenType: this.pbiModels.TokenType.Aad,
        accessToken: this.powerbiToken,
        id: data.id,
        dashboardId: this.dashboardId
      };
      this.powerBiService.embed(this.pbiContainerElement, config);
    }
    );

    // this.powerbirestService.embedPowerBITile(this.pbiContainerElement, this.groupId, this.dashboardId, this.tileId);

    // this.powerbirestService.getTileInGroup(this.groupId, this.portDashboarId, this.portTileId).subscribe(data => {

    //   PowerbirestService.token = MsalInterceptor.accessToken;
    //   this.powerbiToken = PowerbirestService.token;
    //   const config = {
    //     type: 'tile',
    //     embedUrl: data.embedUrl,
    //     accessToken: this.powerbiToken,
    //     id: data.id,
    //     dashboardId: this.portDashboarId
    //   };
    //   this.powerBiService.embed(this.pbiContainerElement1, config);
    // }
    // );

    this.powerbirestService.embedPowerBITile(this.pbiContainerElement1, this.groupId, this.dashboardId, this.tileId);

  }
  ngAfterViewInit(): void {
    this.staticTabs.tabs[0].active = true;
  }

  onSelectTab(e) {
    this.powerbirestService.getStandardReports().subscribe((data: []) => {
      const widgetsArr = data.filter(report => (report['busArea'] === 'Lending' && report['webPart'] === 'Widget'))

      const lenProgHtml = <HTMLElement>(document.getElementById('lenProgWidget'));
      this.powerbirestService.embedPowerBIReport(lenProgHtml, widgetsArr[0]);
      const qtrDelivHtml = <HTMLElement>(document.getElementById('qtrDelivWidget'));
      this.powerbirestService.embedPowerBIReport(qtrDelivHtml, widgetsArr[2]);
      const lenOutliersHtml = <HTMLElement>(document.getElementById('lenOutliersWidget'));
      this.powerbirestService.embedPowerBIReport(lenOutliersHtml, widgetsArr[1]);
      const pipeLinePrepHtml = <HTMLElement>(document.getElementById('pipelinePrepWidget'));
      this.powerbirestService.embedPowerBIReport(pipeLinePrepHtml, widgetsArr[3]);
    }, error => {
      console.log("Error loading lending widget data ", error)
    })
  }
}
