import { Component, OnInit, ViewChild } from '@angular/core';
import { Header } from '@framework/models/header.model';
import { FrameworkService } from '@framework/services/framework.service';
import { FWRoot } from '@framework/core/base/FWRoot';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-bankwide',
  templateUrl: './bankwide.component.html',
  styleUrls: ['./bankwide.component.scss']
})
export class BankwideComponent extends FWRoot implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  constructor(public activatedRoute: ActivatedRoute, public fwService: FrameworkService) {
    super(activatedRoute, fwService);
  }
  searchTerm: any;
  isListFullScreen: any;
  doserach(searchItem) {

  }
  toggleFullScreen() {

  }
  ngOnInit(): void {
    this.fwService.apiToggleLeftNav(true);

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
    this.staticTabs.tabs[0].active = true;
  }

}
