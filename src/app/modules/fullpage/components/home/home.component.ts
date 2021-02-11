import { Component, OnInit, TemplateRef } from '@angular/core';
import { Header } from '@framework/models/header.model';
import { FWRoot } from '@framework/core/base/FWRoot';
import { ActivatedRoute } from '@angular/router';
import { FrameworkService } from '@framework/services/framework.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LeftNav, LeftNavBack } from '@framework/core/models/leftNav.model';
declare const window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends FWRoot implements OnInit {
  upi = '';
  modalRef: BsModalRef;
  constructor(public _route: ActivatedRoute, public fwService: FrameworkService, private modalService: BsModalService) {
    super(_route, fwService);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'cf-modal modal-dialog-centered cf-modal-lg' });
  }
  opensuccessmodal(templatesucess: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templatesucess, {
      class: 'cf-modal modal-dialog cf-modal-sm modal-dialog-centered'
    });
  }
  openerrormodal(templateerror: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateerror, {
      class: 'cf-modal modal-dialog cf-modal-sm modal-dialog-centered'
    });
  }
  openerrormodalLarge(templateerrorLarge: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateerrorLarge, {
      class: 'cf-modal modal-dialog cf-modal-lg modal-dialog-centered'
    });
  }

  ngOnInit() {
    // this.updateLeftNav();
    const header: Header = {
      title: 'Fullpage Module',
      // widgetsAccess: false,
      addWidget: false,
      resetWidget: false,
      breadcrumb: [
        { label: 'Home', path: '' },
        { label: 'FullPage', path: '/fullpage' }
      ],
      addPages: false,
      pageRefresh: true
    };
    this.fwService.apiSetHeader(header);
    this.fwService.apiToggleLeftMenuItem('Costs & Financing');

    this.fwService.apiActionMenuToggle(false);

    this.fwService.apiToggleHeaderControls({ settings: true, actions: false });

    this.fwService.apiToggleLeftNav(true);
    this.fwService.apiGetLoggedInUser().subscribe(user => {
      this.upi = user.employeeId;
      this.sendAnalytics();
    });

    this.fwService.apiToggleAppHeader(false);

    setTimeout(() => {
      // this.fwService.apiShowNotificationMessage('system will be down!');
      this.fwService.apiToggleSplashScreen(false);
    }, 0);
  }

  sendAnalytics() {
    // const email = this.fwService.apiGetLoggedUserEmail();
    this.fwService.apiTrackMyPageWithAppInsights('Full Page Module', '/home/fullpage', window.location, this.upi);
  }

  openRightTrial() {
    this.fwService.apiLoadRightNavDynamicPage('Test Page', null);
  }

  updateLeftNav() {
    const childLeftNavNodel: LeftNav = {
      active: true,
      key: 'fullpage',
      page: '/fullpage',
      route: '/fullpage/testnode',
      text: 'Child Node',
      managable: false,
      routeActive: true
    };
    const model: LeftNav = {
      active: true,
      key: 'fullpage',
      page: '/fullpage',
      route: '/fullpage',
      text: 'My custom full page',
      managable: false,
      routeActive: true,
      settings: {
        leftNavType: 'expand',
        loadPage: false,
        collapsed: false
      },
      children: [childLeftNavNodel]
    };

    const leftNavModel: Array<LeftNav> = [];
    const back: LeftNavBack = {
      text: 'Back to app',
      route: '/app-landing'
    };

    leftNavModel.push(model);
    this.fwService.apiSetLeftNavModel(leftNavModel, back);
  }
}
