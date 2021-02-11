import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '@framework/core/services/framework.service';
import { Header } from '@framework/core/models/header.model';
import { PowerbirestService } from 'app/services/powerbirest.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  constructor(public fwService: FrameworkService, public powerbirestService: PowerbirestService) { }
  searchTerm: any;
  isListFullScreen: any;

  ngOnInit(): void {

    const header: Header = {
      title: '',
      addWidget: false,
      resetWidget: false,
      addPages: false,
      breadcrumb: [{ label: 'Home', path: '/' }, { label: 'Operations', path: '/Operations' }],
      pageRefresh: true
    };
    this.fwService.apiSetHeader(header);

  }
  setCreateReportParam() {

    this.powerbirestService.setCreateRpt('Operations', 'Portfolio');

  }
  doserach(searchItem) {

  }
  toggleFullScreen() {

  }

}
