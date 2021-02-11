import { Component, OnInit, TemplateRef } from '@angular/core';
import { Header } from '@framework/models/header.model';
import { FrameworkService } from '@framework/services/framework.service';
import { FWRoot } from '@framework/core/base/FWRoot';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PowerbirestService } from './../../../services/powerbirest.service';
import { IReportInfo } from './../../../models/ReportInfo.model';

@Component({
  selector: 'app-portfolio-reports',
  templateUrl: './portfolio-reports.component.html',
  styleUrls: ['./portfolio-reports.component.scss']
})
export class PortfolioReportsComponent extends FWRoot implements OnInit {

  modalRef: BsModalRef;
  groupedReports: any[] = [];
  portfiloReports: any[] = [];
  saveRptName = '';
  saveReportReq: any = {};
  groupId = '6425b4fc-2524-4660-86a9-74242c6baa8a';
  savToFavRpt: IReportInfo = null;

  // tslint:disable-next-line:max-line-length
  constructor(public activatedRoute: ActivatedRoute, public fwService: FrameworkService, private modalService: BsModalService, private router: Router, private _powerBiClient: PowerbirestService) {
    super(activatedRoute, fwService);
  }


  ngOnInit(): void {
    this.fwService.apiToggleLeftNav(true);
    if (!(this._powerBiClient.groupedReports.length > 0)) {
      this.groupedReports = this._powerBiClient.groupedReports;
      // tslint:disable-next-line:forin
      for (const key in this.groupedReports) {

        if (key.split('$$')[0].indexOf('Operations') !== -1 && key.split('$$')[1].indexOf('Portfolio') !== -1) {
          this.portfiloReports.push({ group: key.split('$$')[2], reports: this.groupedReports[key] });
        }
      }


    }


    const header: Header = {
      title: '',
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


  selectedRpt(rptInfo) {
    this._powerBiClient.selectedRpt = null;
    rptInfo.backurl = '/operations/lending/portfolio';
    rptInfo.backUrlTitle = 'Operations / Lending / Portfolio';
    this._powerBiClient.selectedRpt = rptInfo;
  }

  openModal(template: TemplateRef<any>, selectedRepot) {
    this.modalRef = this.modalService.show(template, { class: 'cf-modal modal-dialog-centered' });
    this.savToFavRpt = selectedRepot;

  }
  opensuccessModal(template: TemplateRef<any>) {

    this.saveReportReq.name = this.saveRptName;
    this.saveReportReq.targetWorkspaceId = '00000000-0000-0000-0000-000000000000';
    this._powerBiClient.saveToFavs(this.saveReportReq, this.groupId, this.savToFavRpt.id).subscribe(data => {
      this._powerBiClient.selectedRpt = data;
      this._powerBiClient.selectedRpt.backUrlTitle = 'Favorites';
      this._powerBiClient.selectedRpt.backurl = '/my-favorite';
      this._powerBiClient.selectedRpt.displayName = this.saveRptName;
      this._powerBiClient.selectedRpt.viewMode = 'Edit';
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
