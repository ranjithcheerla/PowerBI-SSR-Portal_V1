import { Component, OnInit, TemplateRef, Renderer2 } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Header } from '@framework/models/header.model';
import { FrameworkService } from '@framework/services/framework.service';
import { FWRoot } from '@framework/core/base/FWRoot';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lending-template',
  templateUrl: './lending-template.component.html',
  styleUrls: ['./lending-template.component.scss']
})
export class LendingTemplateComponent extends FWRoot implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, public fwService:
    FrameworkService, private renderer: Renderer2, private modalService: BsModalService) {
    super(activatedRoute, fwService);
  }
  modalRef: BsModalRef;

  bussinessLine = [{
    img: 'visualisation-1.png',
    title: 'Operations'
  }, {
    img: 'visualisation-4.png',
    title: 'IBRD/IDA Lending Program'
  }, {
    img: 'visualisation-2.png',
    title: 'Lending Program Scheduling'
  }, {
    img: 'visualisation-1.png',
    title: 'Lending Project Details'
  }, {
    img: 'visualisation-3.png',
    title: 'Lending Program Scheduling'
  }, {
    img: 'visualisation-1.png',
    title: 'Lending Project Details'
  }];

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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-lg default-modal' }));
  }

}
