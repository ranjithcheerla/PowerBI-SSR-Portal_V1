import { Injectable, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'cf-modal modal-dialog-centered cf-modal-lg' });
  }
  openSuccessModal(templatesucess: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templatesucess, {
      class: 'cf-modal modal-dialog cf-modal-sm modal-dialog-centered'
    });
  }
  openErrorModal(templateerror: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateerror, {
      class: 'cf-modal modal-dialog cf-modal-sm modal-dialog-centered'
    });
  }
  openErrorModalLarge(templateerrorLarge: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateerrorLarge, {
      class: 'cf-modal modal-dialog cf-modal-lg modal-dialog-centered'
    });
  }

  closeModal() {
    this?.modalRef?.hide();
  }
}
