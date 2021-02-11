import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Header } from '@framework/models/header.model';
import { FrameworkService } from '@framework/services/framework.service';
import { FWRoot } from '@framework/core/base/FWRoot';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PowerbirestService } from './../../../services/powerbirest.service';
import { IReportInfo } from './../../../models/ReportInfo.model';
@Component({
  selector: 'app-powerbi-reports',
  templateUrl: './powerbi-reports.component.html',
  styleUrls: ['./powerbi-reports.component.scss']
})
export class PowerbiReportsComponent extends FWRoot implements OnInit {

  @Input() busArea: string;
  @Input() rptType: string;

  modalRef: BsModalRef;
  groupedReports: any[] = [];
  lendingReports: any[] = [];
  saveRptName = '';
  saveReportReq: any = {};
  savToFavRpt: IReportInfo = null;
  groupId = '6425b4fc-2524-4660-86a9-74242c6baa8a';
  favShareTitle = 'Add to My Reports';
  myFavWorkspace = '00000000-0000-0000-0000-000000000000';
  shareWorkspace = '12dcc80b-8af1-4701-8336-48fdce87a5dd';
  loaded = false;
  constructor(public activatedRoute: ActivatedRoute,
    public fwService: FrameworkService, private modalService: BsModalService,
    private router: Router, private _powerBiClient: PowerbirestService) {
    super(activatedRoute, fwService);
  }


  ngOnInit(): void {

    this._powerBiClient.getInitialReports().subscribe(data => {

      this.groupedReports = this._powerBiClient.getPowerBIReportsForBusArea(this.busArea, this.rptType);

      this.loaded = true;
    });

    this._powerBiClient.getUserWorkspaceInfo().subscribe(data => {
      this.shareWorkspace = this._powerBiClient.userWorkspace.id;
    });


    this.fwService.apiToggleHeaderControls({ settings: false, actions: false });
    setTimeout(() => {
      this.fwService.apiToggleSplashScreen(false);
    }, 0);

  }
  capitalize(Mystring) {
    return Mystring.charAt(0).toUpperCase() + Mystring.slice(1).toLowerCase();
  }
  selectedRpt(rptInfo) {
    rptInfo.backurl = window.location.pathname;
    rptInfo.backUrlTitle = this.capitalize(window.location.pathname.split('/')[1])
      + ' / ' + this.capitalize(window.location.pathname.split('/')[2]);
    this._powerBiClient.selectedRpt = rptInfo;
  }
  copyReport(report) {

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = report.embedUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  openModal(template: TemplateRef<any>, selectedReport, functionName) {
    if (functionName === 'share') {
      this.saveReportReq.targetWorkspaceId = this.shareWorkspace;
      this.favShareTitle = 'Share to your VPU Folder';
    } else {
      this.saveReportReq.targetWorkspaceId = this.myFavWorkspace;
      this.favShareTitle = 'Add to My Reports';
    }
    this.modalRef = this.modalService.show(template, { class: 'cf-modal modal-dialog-centered' });
    this.savToFavRpt = selectedReport;
    this._powerBiClient.selectedRpt = selectedReport;

  }
  exportReport(report) {
    this._powerBiClient.exportReport(this.groupId, report.id).subscribe(data => {
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
  opensuccessModal(template: TemplateRef<any>) {

    this.saveReportReq.name = this.saveRptName;

    this._powerBiClient.saveToFavs(this.saveReportReq, this.groupId, this.savToFavRpt.id).subscribe(data => {

      this._powerBiClient.selectedRpt = data;
      if (this.favShareTitle.indexOf('Share') !== -1) {

        this._powerBiClient.selectedRpt.backUrlTitle = 'ITS VPU';
        this._powerBiClient.selectedRpt.backurl = '/its-vpu';
      } else {

        this._powerBiClient.selectedRpt.backUrlTitle = 'Favorites';
        this._powerBiClient.selectedRpt.backurl = '/my-favorite';
      }

      this._powerBiClient.selectedRpt.displayName = this.saveRptName;
      if (this._powerBiClient.selectedRpt.reportType === 'PowerBIReport') {
        this._powerBiClient.selectedRpt.viewMode = 'Edit';
      }

    });
    this.modalRef = this.modalService.show(template, { class: 'cf-modal cf-modal-sm success modal-dialog-centered' });

  }
  confirm(): void {
    this.modalRef.hide();
  }
  routeMyfav(): void {
    this.modalRef.hide();
    this.router.navigate(['/embed-report']);
  }

}
