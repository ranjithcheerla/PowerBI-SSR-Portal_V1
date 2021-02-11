import { Component, OnInit, ViewChild } from '@angular/core';
import { FrameworkService } from '@framework/core/services/framework.service';
import { PowerbirestService } from 'app/services/powerbirest.service';
import { Header } from '@framework/core/models/header.model';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-asa',
  templateUrl: './asa.component.html',
  styleUrls: ['./asa.component.scss']
})
export class AsaComponent implements OnInit {


  constructor(public fwService: FrameworkService, public powerbirestService: PowerbirestService) {

  }

  searchTerm: any;
  isListFullScreen: any;

  navslideopen = true;

  setCreateReportParam() {

    this.powerbirestService.setCreateRpt('Operations', 'ASA');

  }

  ngOnInit(): void {
    const header: Header = {
      title: '',
      addWidget: false,
      resetWidget: false,
      addPages: false,
      breadcrumb: [{ label: 'Home', path: '/' }, { label: 'Operations', path: '/Operations' }, { label: 'Advisory', path: '/Operations/advisory' }],
      pageRefresh: true
    };
    this.fwService.apiSetHeader(header);

    const widgetElement = <HTMLElement>(document.getElementById('lendingWidget'));
    // this.powerbirestService.getStandardReports().subscribe(data => {
    //   this.powerbirestService.embedPowerBIReport(widgetElement, 'ssr_Operations_ASA_[ASA001]');
    // });

  }


  doserach(searchItem) {

  }
  toggleFullScreen() {

  }


}
