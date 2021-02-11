import { Component, OnInit, ViewChild } from '@angular/core';
import { Header } from '@framework/models/header.model';
import { FrameworkService } from '@framework/services/framework.service';
import { FWRoot } from '@framework/core/base/FWRoot';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { PowerbirestService } from 'app/services/powerbirest.service';
import { IReportInfo } from 'app/models/ReportInfo.model';


@Component({
  selector: 'app-user-vpu',
  templateUrl: './user-vpu.component.html',
  styleUrls: ['./user-vpu.component.scss']
})
export class UserVpuComponent extends FWRoot implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  constructor(public activatedRoute: ActivatedRoute, public fwService: FrameworkService, public powerbirestService: PowerbirestService) {
    super(activatedRoute, fwService);
  }
  searchTerm: any;
  isListFullScreen: any;
  userWorkspace: any = null;
  doserach(searchItem) {

  }
  toggleFullScreen() {

  }
  ngOnInit(): void {
    this.fwService.apiToggleLeftNav(true);

    this.powerbirestService.getUserWorkspaceInfo().subscribe(data => {
      this.userWorkspace = data;
    });


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
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    if (this.userWorkspace != null) {
      this.staticTabs.tabs[0].active = true;
    }

  }

}
