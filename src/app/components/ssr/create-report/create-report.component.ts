import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Header } from '@framework/models/header.model';
import { FrameworkService } from '@framework/services/framework.service';
import { FWRoot } from '@framework/core/base/FWRoot';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent extends FWRoot implements OnInit {
  chooseTemp = 'existing';
  cfProgress = '';
  constructor(public activatedRoute: ActivatedRoute, public fwService: FrameworkService, private renderer: Renderer2) {
    super(activatedRoute, fwService);
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'siteinfo-fullbg');

    const header: Header = {
      title: '',
      addWidget: false,
      resetWidget: false,
      addPages: false,
      breadcrumb: [{ label: 'Home', path: '' }]
    };

    this.fwService
      .apiToggleLeftNav(false)
      .apiSetHeader(header)
      .apiToggleHeaderControls({ settings: false, actions: false })
      .apiToggleSplashScreen(false);

    this.fwService.apiToggleSiteInfo(false);

    setTimeout(() => {
      this.fwService.apiToggleSplashScreen(false);
    }, 0);


  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'siteinfo-fullbg');
  }

}







// import { Component, OnInit, TemplateRef } from '@angular/core';
// import { Header } from '@framework/models/header.model';
// import { FrameworkService } from '@framework/services/framework.service';
// import { FWRoot } from '@framework/core/base/FWRoot';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import { PowerbirestService } from './../../../services/powerbirest.service';
// import { IReportInfo } from 'app/models/ReportInfo.model';

// @Component({
//   selector: 'app-create-report',
//   templateUrl: './create-report.component.html',
//   styleUrls: ['./create-report.component.scss']
// })
// export class CreateReportComponent extends FWRoot implements OnInit {
//   selBusArea: any;
//   selCreateRpt: IReportInfo = null;

//   constructor(public activatedRoute: ActivatedRoute, public fwService: FrameworkService,
//     private modalService: BsModalService, private router: Router, private _powerBiClient: PowerbirestService) {
//     super(activatedRoute, fwService);
//   }

//   businessLine = true;
//   saveReportReq: any = {};
//   groupId = '6425b4fc-2524-4660-86a9-74242c6baa8a';
//   businessArea = false;
//   createreport = false;
//   defaultval = false;
//   selectedModule: any;
//   editTitle = false;
//   modalRef: BsModalRef;
//   show = false;
//   oldTitle = '';
//   c: any = null;

//   datasources = this._powerBiClient.groupedDS;
//   userEnterRptName = '';


//   ngOnInit(): void {
//     this.fwService.apiToggleLeftNav(true);
//     this.selCreateRpt = this._powerBiClient.selectedCreateRpt;

//     if (this.selCreateRpt) {
//       this.selCreateRpt = this.selCreateRpt;
//       this.businessLine = this.selCreateRpt.showBusLine;
//       this.businessArea = this.selCreateRpt.showBusArea;
//       this.selBusArea = this.selCreateRpt.busArea;
//       this.selectedModule = this.selCreateRpt.subjectArea;
//       this.createreport = true;
//     }

//     const header: Header = {
//       title: '',
//       addWidget: false,
//       resetWidget: false,
//       addPages: false,
//       breadcrumb: [{ label: 'Home', path: '' }]
//     };
//     this.fwService.apiSetHeader(header);

//     this.fwService.apiToggleHeaderControls({ settings: false, actions: false });
//     setTimeout(() => {
//       this.fwService.apiToggleSplashScreen(false);
//     }, 0);
//   }

//   inlineUpdate(value, c: any, strValue) {

//   }

//   updateModuleClick(selModule) {
//     this.selectedModule = selModule;
//   }

//   updateBusAreaClick(selBusArea) {
//     this.selBusArea = selBusArea.busArea;
//     this.selCreateRpt = selBusArea;
//   }
//   continueClick(getId) {

//     if (getId === 'businessArea') {
//       this.businessLine = false;
//       this.businessArea = true;

//     }
//     if (getId === 'createreport') {
//       this.businessArea = false;
//       this.businessLine = false;
//       this.createreport = true;
//     }
//     if (getId === 'save') {
//       this.businessArea = false;
//       this.businessLine = false;
//       this.createreport = false;

//     }

//   }
//   backButtonClick(getId) {
//     if (getId === 'businessArea') {
//       this.businessLine = true;
//       this.businessArea = false;
//       this.createreport = false;
//     }
//     if (getId === 'createreport') {
//       this.businessArea = true;
//       this.businessLine = false;
//       this.createreport = false;
//     }
//     if (getId === 'save') {
//       this.businessArea = false;
//       this.businessLine = false;
//       this.createreport = false;

//     }
//   }

//   openModal(template: TemplateRef<any>) {
//     this.modalRef = this.modalService.show(template, { class: 'cf-modal modal-dialog-centered cf-modal-sm' });
//     this.saveReportReq.name = this.userEnterRptName;
//     this.saveReportReq.targetWorkspaceId = '00000000-0000-0000-0000-000000000000';
//     this._powerBiClient.saveToFavs(this.saveReportReq, this.groupId, this.selCreateRpt.id).subscribe(data => {
//       this._powerBiClient.selectedCreateRpt = null;
//       this._powerBiClient.selectedRpt = data;

//       this._powerBiClient.selectedRpt.displayName = this.userEnterRptName;
//       this._powerBiClient.selectedRpt.viewMode = 'Edit';
//       this._powerBiClient.selectedRpt.backUrlTitle = 'Favorites';
//       this._powerBiClient.selectedRpt.backurl = '/my-favorite';
//     });
//   }
//   opensuccessModal(template: TemplateRef<any>) {
//     this.modalRef = this.modalService.show(template, { class: 'cf-modal cf-modal-sm success modal-dialog-centered' });
//   }
//   confirm(): void {
//     this.modalRef.hide();
//   }
//   routeMyfav(): void {
//     this.modalRef.hide();
//     this.router.navigate(['/embed-report']);
//   }
//   showedit() {
//     this.show = !this.show;
//   }
// }
