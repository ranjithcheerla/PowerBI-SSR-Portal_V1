import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Header } from '@framework/core/models/header.model';
import { FrameworkService } from '@framework/core/services/framework.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PowerbirestService } from 'app/services/powerbirest.service';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { IReportInfo } from 'app/models/ReportInfo.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MsalInterceptor } from '@framework/msal/index';

@Component({
  selector: 'app-edc',
  templateUrl: './edc.component.html',
  styleUrls: ['./edc.component.scss']
})


export class EdcComponent implements OnInit, AfterViewInit {

  constructor(public fwService: FrameworkService, private route: ActivatedRoute,
    private powerBiRSApi: PowerbirestService, private router: Router, private modalService: BsModalService) {

  }


  myFavWorkspace = '00000000-0000-0000-0000-000000000000';
  saveEdcReport: any = {};
  favReports: IReportInfo[] = null;
  modalRef: BsModalRef;
  isProUser = null;
  isTemplate = true;
  userUpi = '';

  ngOnInit(): void {
    // If we don't want he left nav
    this.fwService.apiToggleLeftNav(false);

    const header: Header = {
      title: '',
      addWidget: false,
      resetWidget: false,
      addPages: false,
      breadcrumb: [{ label: 'Home', path: '/' }, { label: 'EDC', path: '/edc' }],
      pageRefresh: true
    };
    this.fwService.apiSetHeader(header);
    this.fwService.apiToggleHeaderControls({ settings: false, actions: false });
    setTimeout(() => {
      this.fwService.apiToggleSplashScreen(false);
    }, 0);

    this.powerBiRSApi.getProLicense().subscribe(dataPro => {
      this.isProUser = this.powerBiRSApi.isProUser;
      this.userUpi = this.powerBiRSApi.user.upi;
      this.route.queryParams.subscribe(params => {
        if (params.groupId) {
          // console.log(params.groupId);
          // console.log(params.reportId);
          if (params.edcTemplate) {
            this.isTemplate = false;
          }

          this.powerBiRSApi.saveEDCReportReq.dataset_id = params.dataset_id;
          this.powerBiRSApi.saveEDCReportReq.resource_id = params.resource_id;

          this.powerBiRSApi.getReportInGroup(params.groupId, params.reportId).subscribe(data => {
            if (data.embedUrl != null) {
              PowerbirestService.token = MsalInterceptor.accessToken;
              if (this.isProUser) {
                if (this.isTemplate) {
                  this.saveEdcReport.name = 'EDC_$#' + data.name;
                  this.powerBiRSApi.getMyReports().subscribe(favData => {
                    if (favData != null) {
                      this.favReports = favData.value;
                      const edcRpt = this.favReports.find(dataElement => dataElement.name === this.saveEdcReport.name);
                      if (edcRpt != null && edcRpt.embedUrl != null) {
                        this.powerBiRSApi.selectedRpt = edcRpt;
                        this.powerBiRSApi.selectedRpt.viewMode = 'Edit';
                        this.powerBiRSApi.selectedRpt.backUrlTitle = 'My Reports';
                        this.powerBiRSApi.selectedRpt.backurl = '/my-favorite';
                        this.powerBiRSApi.selectedRpt.displayName = this.saveEdcReport.name;
                        this.router.navigate(['/embed-report']);
                      } else {
                        this.saveEdcReport.targetWorkspaceId = this.myFavWorkspace;
                        this.powerBiRSApi.saveToFavs(this.saveEdcReport, params.groupId, params.reportId).subscribe(edcData => {

                          if (edcData.embedUrl != null) {
                            this.powerBiRSApi.selectedRpt = edcData;
                            this.powerBiRSApi.selectedRpt.viewMode = 'Edit';
                            this.powerBiRSApi.selectedRpt.backUrlTitle = 'My Reports';
                            this.powerBiRSApi.selectedRpt.backurl = '/my-favorite';
                            this.powerBiRSApi.selectedRpt.displayName = this.saveEdcReport.name;
                            this.router.navigate(['/embed-report']);

                          }
                        });
                      }

                    }

                  });


                } else {

                  const reportName = data.name.split('$$_#');
                  this.powerBiRSApi.selectedRpt = data;
                  if (reportName[0] === this.userUpi) {
                    this.powerBiRSApi.selectedRpt.viewMode = 'Edit';
                    this.powerBiRSApi.isEditGallery = true;
                  } else {
                    this.powerBiRSApi.selectedRpt.viewMode = 'View';
                    this.powerBiRSApi.isEditGallery = false;
                  }

                  this.powerBiRSApi.selectedRpt.backUrlTitle = 'EDC';
                  this.powerBiRSApi.selectedRpt.backurl = '/my-favorite';
                  this.powerBiRSApi.selectedRpt.displayName = this.saveEdcReport.name;
                  this.router.navigate(['/embed-report']);
                }
              } else {

                this.powerBiRSApi.selectedRpt = data;
                this.powerBiRSApi.selectedRpt.isTemplate = this.isTemplate;
                this.powerBiRSApi.selectedRpt.viewMode = 'View';
                this.powerBiRSApi.selectedRpt.backUrlTitle = 'EDC';
                this.powerBiRSApi.selectedRpt.backurl = '/my-favorite';
                this.powerBiRSApi.selectedRpt.displayName = this.saveEdcReport.name;
                this.router.navigate(['/embed-report']);
              }


            } else {
              this.router.navigate(['/error-page']);
            }
          },
            error => {
              this.powerBiRSApi.errorMessage = error;
              this.router.navigate(['/error-page']);
            });
        }

      });


    });

  }

  ngAfterViewInit(): void {

  }

}
