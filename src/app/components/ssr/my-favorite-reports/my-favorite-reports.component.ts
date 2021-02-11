import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { IReportInfo } from './../../../models/ReportInfo.model';
import { PowerbirestService } from './../../../services/powerbirest.service';
import { Header } from '@framework/models/header.model';
import { FrameworkService } from '@framework/services/framework.service';
import { FWRoot } from '@framework/core/base/FWRoot';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'app-my-favorite-reports',
  templateUrl: './my-favorite-reports.component.html',
  styleUrls: ['./my-favorite-reports.component.scss']
})
export class MyFavoriteReportsComponent implements OnInit {

  @Input() workspace: string;

  myReports: IReportInfo[] = null;
  modalRef: BsModalRef;
  groupedReports: any[] = [];
  lendingReports: any[] = [];
  saveRptName = '';
  saveReportReq: any = {};
  savToFavRpt: IReportInfo = null;
  deleteRpt: IReportInfo = null;
  groupId = '6425b4fc-2524-4660-86a9-74242c6baa8a';
  favShareTitle = 'Add to My Reports';
  myFavWorkspace = '00000000-0000-0000-0000-000000000000';
  shareWorkspace = '12dcc80b-8af1-4701-8336-48fdce87a5dd';
  loaded = false;
  opStatus = false;
  isProUser = false;
  isProCheck = false;

  mode = 'list';
  favmode = 'list';

  constructor(private _powerRSClient: PowerbirestService, private modalService: BsModalService,
    private router: Router, private _powerBiClient: PowerbirestService) { }

  ngOnInit(): void {

    this._powerBiClient.getProLicense().subscribe(data => {
      this.isProUser = this._powerBiClient.isProUser;
      this.isProCheck = true;
      this.getMyReports();
    });

    this._powerBiClient.getUserWorkspaceInfo().subscribe(data => {
      this.shareWorkspace = this._powerBiClient.userWorkspace.id;
    });

  }

  columnFavDefs = [
    {
      field: 'name', headerName: 'Name',
      cellRenderer: function (params) {
        // const at = document.createElement('a');
        // at.innerText = params.value;
        // at.href = '#';
        // let rptId = params.data.id.toString();

        // at.addEventListener('click', function () {
        //   selectedRptById(rptId, 'View');
        // });
        // return at;

        return '<a routerLink="/embed-report"  class="text-md" (click)="selectedRptById(\'' + params.data.id + '\',\'View\')">' + params.value + '</a>'
      }, width: 500

    },
    // { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'reportType', headerName: 'Report Type', width: 200
    },
    {
      field: 'isOwnedByMe', headerName: 'Is Owned By Me', width: 300
    }
  ];

  selectedRptById(rptId, viewMode) {
    console.log(rptId);
    let rptInfo = this.myReports.find(x => x.id == rptId);
    rptInfo.backurl = '/my-favorite';
    rptInfo.backUrlTitle = 'My Reports';

    this._powerRSClient.selectedRpt = rptInfo;
    this._powerRSClient.selectedRpt.displayName = rptInfo.name;
    this._powerRSClient.selectedRpt.viewMode = viewMode;
    // this.selectedRpt(rptInfo, viewMode);
  }

  selectedRpt(rptInfo, viewMode) {

    if (this.workspace === 'myfav') {
      rptInfo.backurl = '/my-favorite';
      rptInfo.backUrlTitle = 'My Reports';
    } else {
      rptInfo.backurl = '/its-vpu';
      rptInfo.backUrlTitle = 'ITS VPU';
    }

    this._powerRSClient.selectedRpt = rptInfo;
    this._powerRSClient.selectedRpt.displayName = rptInfo.name;
    this._powerRSClient.selectedRpt.viewMode = viewMode;
  }
  selectedEditRpt(rptInfo) {
    rptInfo.backurl = '/my-favorite';
    this._powerRSClient.selectedRpt = rptInfo;
    this._powerRSClient.selectedRpt.displayName = rptInfo.name;
    this._powerRSClient.selectedRpt.viewMode = 'Edit';
  }
  openModal(template: TemplateRef<any>, selectedReport, functionName) {
    if (functionName === 'share') {
      this.favShareTitle = 'Share to your VPU Folder';
    } else {
      this.favShareTitle = 'Add to My Reports';
    }
    this.modalRef = this.modalService.show(template, { class: 'cf-modal modal-dialog-centered' });
    this._powerRSClient.selectedRpt = selectedReport;
    this.savToFavRpt = selectedReport;

  }

  openDeleteModal(template: TemplateRef<any>, selectedReport) {

    this.modalRef = this.modalService.show(template, { class: 'cf-modal modal-dialog-centered' });
    this.deleteRpt = selectedReport;

  }
  openDeleteSuccessModal(template: TemplateRef<any>) {

    this._powerRSClient.deleteReport(this.deleteRpt.id).subscribe(data => {
      // tslint:disable-next-line:no-console
      console.log(data);
    });
    this.modalRef = this.modalService.show(template, { class: 'cf-modal modal-dialog-centered' });
  }
  opensuccessModal(template: TemplateRef<any>, templateFail: TemplateRef<any>) {

    this.saveReportReq.name = this.saveRptName;
    if (this.favShareTitle.indexOf('Share') !== -1) {
      this.opStatus = false;
      this.saveReportReq.targetWorkspaceId = this.shareWorkspace;
      this._powerRSClient.selectedRpt.backUrlTitle = this._powerBiClient.userWorkspace.name;
      this._powerRSClient.selectedRpt.backurl = '/its-vpu';
      this._powerRSClient.shareToVpu(this.saveReportReq, this.savToFavRpt.id).subscribe(data => {

        if (data.embedUrl != null) {
          this.opStatus = true;
          this._powerRSClient.selectedRpt = data;
          this._powerRSClient.selectedRpt.backUrlTitle = this._powerBiClient.userWorkspace.name;
          this._powerRSClient.selectedRpt.backurl = '/its-vpu';
          this._powerRSClient.selectedRpt.displayName = this.saveRptName;
          this._powerRSClient.selectedRpt.viewMode = 'Edit';
        }
        if (this.opStatus) {
          this.modalRef = this.modalService.show(template, { class: 'cf-modal cf-modal-sm success modal-dialog-centered' });
        } else {
          this.modalRef = this.modalService.show(templateFail, { class: 'cf-modal cf-modal-sm error modal-dialog-centered' });
        }

      });
    } else {
      this.saveReportReq.targetWorkspaceId = this.myFavWorkspace;
      this._powerBiClient.selectedRpt.backUrlTitle = 'Favorites';
      this._powerBiClient.selectedRpt.backurl = '/my-favorite';
      this.opStatus = false;
      this._powerRSClient.saveToFavs(this.saveReportReq, this.groupId, this.savToFavRpt.id).subscribe(data => {

        if (data.embedUrl != null) {
          this.opStatus = true;
          this._powerRSClient.selectedRpt = data;
          this._powerBiClient.selectedRpt.backUrlTitle = 'Favorites';
          this._powerBiClient.selectedRpt.backurl = '/my-favorite';
          this._powerRSClient.selectedRpt.displayName = this.saveRptName;
          this._powerRSClient.selectedRpt.viewMode = 'Edit';
        }
        if (this.opStatus) {
          this.modalRef = this.modalService.show(template, { class: 'cf-modal cf-modal-sm success modal-dialog-centered' });
        } else {
          this.modalRef = this.modalService.show(templateFail, { class: 'cf-modal cf-modal-sm error modal-dialog-centered' });
        }
      });
    }




  }
  exportReport(report) {
    this._powerBiClient.exportMyReport(report.id).subscribe(data => {
      // tslint:disable-next-line:no-console
      console.log(data);
      let rptExtn = '.pbix';
      if (report.reportType === 'PaginatedReport') {
        rptExtn = '.rdl';
      }

      const a = document.createElement('a');
      document.body.appendChild(a);

      const url = window.URL.createObjectURL(data);
      // window.open(url);
      a.href = url;
      a.download = report.name + rptExtn;
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(data);
        document.body.removeChild(a);
      }, 0);

    });
  }
  confirm(): void {
    this.modalRef.hide();
  }
  routeMyfav(): void {
    this.modalRef.hide();
    this.router.navigate(['/embed-report']);
  }
  reload(): void {
    this.ngOnInit();
  }

  getMyReports() {

    if (this.workspace === 'myfav') {
      this._powerRSClient.getMyReports().subscribe(data => {
        this.myReports = data.value;
        this.myReports.sort(function (obj1, obj2) {
          const obj1Name = obj1.name.toLowerCase();
          const obj2Name = obj2.name.toLowerCase();
          if (obj1Name > obj2Name) { return 1; } if (obj1Name < obj2Name) { return -1; } return 0;
        });
        this.loaded = true;
      });

    } else {
      this._powerRSClient.getReportsInGroup(this.workspace).subscribe(data => {
        this.myReports = data.value;
        this.myReports.sort(function (obj1, obj2) {
          const obj1Name = obj1.name.toLowerCase();
          const obj2Name = obj2.name.toLowerCase();
          if (obj1Name > obj2Name) { return 1; } if (obj1Name < obj2Name) { return -1; } return 0;
        });
        this.loaded = true;
      });
    }

  }

}
