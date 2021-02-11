import { Component, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { Header } from '@framework/models/header.model';
import { FrameworkService } from '@framework/services/framework.service';
import { FWRoot } from '@framework/core/base/FWRoot';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent extends FWRoot implements OnInit {
  modalRef: BsModalRef;

  constructor(public activatedRoute: ActivatedRoute, public fwService:
    FrameworkService, private renderer: Renderer2, private modalService: BsModalService) {
    super(activatedRoute, fwService);
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'siteinfo-fullbg');

    const header: Header = {
      title: '',
      addWidget: false,
      resetWidget: false,
      addPages: false,
      breadcrumb: [{ label: 'Home', path: '' }]
    };

    this.fwService
      .apiToggleLeftNav(false)
      .apiSetHeader(header)
      .apiToggleHeaderControls({ settings: false, actions: false })
      .apiToggleSplashScreen(false);

    this.fwService.apiToggleSiteInfo(false);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'siteinfo-fullbg');
  }

  openCancelModal(templateerrorLarge: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateerrorLarge, {
      class: 'cf-modal modal-dialog cf-modal-lg modal-dialog-centered'
    });
  }

  openSuccessModal(templatesucess: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templatesucess, {
      class: 'cf-modal modal-dialog cf-modal-sm modal-dialog-centered'
    });
  }

}
