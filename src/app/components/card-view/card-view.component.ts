import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IReportInfo } from 'app/models/ReportInfo.model';
import { PowerbirestService } from 'app/services/powerbirest.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {

  reports: any[] = [];

  @Input() rptType: string;

  slideConfigLandingPage = {
    'slidesToShow': 5, 'arrows': true, 'infinite': false,
    'centerMode': false,
    'slidesToScroll': 1,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  constructor(private powerRestApi: PowerbirestService, private sanitizer: DomSanitizer) {

  }

  selectedRpt(rptInfo) {

    this.powerRestApi.selectedRpt = rptInfo;
  }
  ngOnInit(): void {
    this.powerRestApi.getStandardReports().subscribe(data => {
      this.reports = this.powerRestApi.getPowerBIReportsForType(this.rptType);
    });

  }

  checkSecurity(url) {


    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  embedPowerContent(htmlId, report) {

    // tslint:disable-next-line:prefer-const
    let htmlIdComp = <HTMLElement>(document.getElementById(htmlId));
    this.powerRestApi.embedPowerBIReport(htmlIdComp, report);
  }

  // visualizationsData = [
  //   {
  //     'title': 'Lending Outliers',
  //     'desc': 'Dashboard Templates',
  //     'pic': 'visualisation-1'
  //   },
  //   {
  //     'title': 'IBRD/IDA Lending Program',
  //     'desc': 'Dashboard Templates',
  //     'pic': 'visualisation-2'
  //   },
  //   {
  //     'title': 'Lending Program Scheduling',
  //     'desc': 'Dashboard Templates',
  //     'pic': 'visualisation-3'
  //   },
  //   {
  //     'title': 'Lending Project Details',
  //     'desc': 'Dashboard Templates',
  //     'pic': 'visualisation-4'
  //   }]
}
