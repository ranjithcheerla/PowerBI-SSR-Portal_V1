import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { FrameworkService } from '@framework/core/services/framework.service';
import { Header } from '@framework/core/models/header.model';
import { PowerbirestService } from 'app/services/powerbirest.service';


@Component({
  selector: 'app-ras',
  templateUrl: './ras.component.html',
  styleUrls: ['./ras.component.scss']
})
export class RasComponent implements OnInit, AfterViewInit {

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  constructor(public fwService: FrameworkService, public powerbirestService: PowerbirestService) { }
  searchTerm: any;
  isListFullScreen: any;
  navslideopen = true;
  doserach(searchItem) {

  }
  toggleFullScreen() {

  }
  setCreateReportParam() {

    this.powerbirestService.setCreateRpt('Operations', 'Fiduciary');

  }
  ngOnInit(): void {
    const header: Header = {
      title: '',
      addWidget: false,
      resetWidget: false,
      addPages: false,
      breadcrumb: [{ label: 'Home', path: '/' }, { label: 'Operations', path: '/Operations' }, { label: 'Fiduciary', path: '/Operations/fiduciary' }],
      pageRefresh: true
    };
    this.fwService.apiSetHeader(header);
  }
  ngAfterViewInit(): void {
    this.staticTabs.tabs[0].active = true;
  }

}
