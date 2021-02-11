import { Component, OnInit, TemplateRef } from '@angular/core';
import { PowerbirestService } from './../../../services/powerbirest.service';
import { NgxPowerBiService } from 'ngx-powerbi';
import * as pbi from 'powerbi-client';
import { FrameworkService } from '@framework/services/framework.service';
import { Header } from '@framework/models/header.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IReportInfo } from 'app/models/ReportInfo.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Report } from 'report';

@Component({
  selector: 'app-embed-report',
  templateUrl: './embed-report.component.html',
  styleUrls: ['./embed-report.component.scss']
})
export class EmbedReportComponent implements OnInit {

  modalRef: BsModalRef;
  groupedReports: any[] = [];
  lendingReports: any[] = [];
  saveRptName = '';
  saveReportReq: any = {};
  groupId = '6425b4fc-2524-4660-86a9-74242c6baa8a';
  edcGalleryGroupId = '';
  myWorkSpace = '00000000-0000-0000-0000-000000000000';
  edcRptName = '';


  private powerBiService: NgxPowerBiService;
  private pbiContainerElement: HTMLElement;
  private powerBiReport: Report;
  powerbiToken: string;
  selectRptInfo = null;
  private pbiModels: any;
  isView = true;
  isMyFavs = false;
  isEdcRpt = false;
  savToFavRpt: IReportInfo = null;
  edcGalleryRpt: IReportInfo = null;
  currentEmbedObject: any = null;
  isProUser = null;
  edcRptDescr = null;
  isEditGallery = this.powerBiRSApi.isEditGallery;

  constructor(private powerBiRSApi: PowerbirestService, public fwService: FrameworkService,
    private modalService: BsModalService, private router: Router) {
    this.edcGalleryGroupId = this.powerBiRSApi.edcGroupId;
  }

  ngOnInit(): void {
    this.powerBiService = new NgxPowerBiService();
    this.selectRptInfo = this.powerBiRSApi.selectedRpt;
    this.isProUser = this.powerBiRSApi.isProUser;

    if (!this.selectRptInfo) {
      this.selectRptInfo = {};
      this.selectRptInfo.backUrlTitle = '';
    }


    this.powerbiToken = PowerbirestService.token;
    const header: Header = {
      title: '',
      addWidget: false,
      resetWidget: false,
      addPages: false,
      breadcrumb: [{ label: 'Home', path: '/home' },
      { label: this.selectRptInfo.backUrlTitle, path: this.selectRptInfo.backurl },
      { label: this.selectRptInfo.displayName, path: '' }],
      pageRefresh: true
    };
    if (this.selectRptInfo.backUrlTitle === 'My Reports') {
      this.isMyFavs = true;
    }
    if (this.selectRptInfo.name.indexOf('EDC_$#') !== -1) {
      this.isEdcRpt = true;
    }
    this.fwService.apiSetHeader(header);
    this.pbiContainerElement = <HTMLElement>(document.getElementById('pbi-container'));
    this.pbiModels = pbi.models;
    if (this.selectRptInfo.viewMode) {
      this.embedRpt(this.selectRptInfo.viewMode);
    } else {
      this.embedRpt('View');
    }

  }

  embedRpt(viewMode) {

    let mode = this.pbiModels.ViewMode.View;
    if (viewMode === 'Edit') {
      this.selectRptInfo.viewMode = 'Edit';
      this.isView = false;
    } else if (viewMode === 'View') {
      this.selectRptInfo.viewMode = 'View';
      this.isView = true;
    }

    if (this.selectRptInfo.viewMode === 'Edit') {
      mode = this.pbiModels.ViewMode.Edit;
      this.isView = false;
    }
    // Get the Embed token before embedding the report/dashboard
    // this.powerBiRSApi.getEmbedToken();

    const config = {
      type: 'report',
      embedUrl: this.selectRptInfo.embedUrl,
      accessToken: this.powerbiToken,
      permissions: this.pbiModels.Permissions.ReadWrite,
      contrastMode: 0,
      //  permissions: this.pbiModels.Permissions.All,
      viewMode: mode,
      settings: {
        filterPaneEnabled: true,
        navContentPaneEnabled: true,
        personalBookmarksEnabled: true,
        panes: {
          bookmarks: {
            visible: true
          }
        }
      }
    };

    this.currentEmbedObject = this.powerBiService.embed(this.pbiContainerElement, config);
  }

  openModal(template: TemplateRef<any>, selectedRepot) {
    this.modalRef = this.modalService.show(template, { class: 'cf-modal modal-dialog-centered' });
    this.savToFavRpt = selectedRepot;

  }

  openEdcModal(template: TemplateRef<any>, selectedRepot) {

    this.modalRef = this.modalService.show(template, { class: 'cf-modal modal-dialog-centered' });

    this.savToFavRpt = selectedRepot;

  }

  openEdcSaveSuccessModel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'cf-modal cf-modal-sm success modal-dialog-centered' });
  }
  openEdcSuccessModal(template: TemplateRef<any>) {

    const saveReportReq: any = {};

    // First Copy the report to EDC Gallery workspace

    this.saveReportReq.name = this.powerBiRSApi.user.upi + '$$_#$' + this.edcRptName + '$$_#$'
      + this.powerBiRSApi.saveEDCReportReq.dataset_id;
    this.saveReportReq.targetWorkspaceId = this.edcGalleryGroupId;
    this.powerBiRSApi.shareToVpu(this.saveReportReq, this.savToFavRpt.id).subscribe(data => {


      // Publish the details of EDC CRM

      this.edcGalleryRpt = data;
      saveReportReq.name = this.edcRptName;
      saveReportReq.title = this.edcRptName;
      saveReportReq.description = this.edcRptDescr;
      saveReportReq.url = 'https://powerbiopsappqa.asestg.worldbank.org/edc?groupId=' + this.edcGalleryGroupId + '&reportId='
        + this.edcGalleryRpt.id;
      saveReportReq.date = new Date();
      saveReportReq.thumbnailUrl = this.edcGalleryRpt.embedUrl + '&autoAuth=true&filterPaneEnabled=false&navContentPaneEnabled=false';
      saveReportReq.dataset_id = this.powerBiRSApi.saveEDCReportReq.dataset_id;
      saveReportReq.resource_id = this.powerBiRSApi.saveEDCReportReq.resource_id;
      saveReportReq.createdByUPI = this.powerBiRSApi.user.upi;
      saveReportReq.createdByEmail = this.powerBiRSApi.user.upi;
      saveReportReq.pbGroupId = this.edcGalleryGroupId;
      saveReportReq.pbReportId = this.edcGalleryRpt.id;


      this.powerBiRSApi.publishToEDC(saveReportReq).subscribe(edData => {

        this.modalRef = this.modalService.show(template, { class: 'cf-modal cf-modal-sm success modal-dialog-centered' });
      });
    });





  }

  printPowerBIReport() {
    this.currentEmbedObject.print();

  }
  opensuccessModal(template: TemplateRef<any>) {

    this.saveReportReq.name = this.saveRptName;
    this.saveReportReq.targetWorkspaceId = this.myWorkSpace;
    this.powerBiRSApi.saveToFavs(this.saveReportReq, this.groupId, this.savToFavRpt.id).subscribe(data => {
      this.powerBiRSApi.selectedRpt = data;
      this.powerBiRSApi.selectedRpt.backUrlTitle = 'Favorites';
      this.powerBiRSApi.selectedRpt.backurl = '/my-favorite';
      this.powerBiRSApi.selectedRpt.displayName = this.saveRptName;
      this.powerBiRSApi.selectedRpt.viewMode = 'Edit';
    });
    this.modalRef = this.modalService.show(template, { class: 'cf-modal cf-modal-sm success modal-dialog-centered' });

  }
  confirm(): void {
    this.modalRef.hide();
  }
  routeMyfav(): void {
    this.modalRef.hide();
    this.router.navigate(['/my-favorite']);
    setTimeout(() => {
      this.router.navigate(['/embed-report']);
    }, 600);
  }

}
