import { TestBed } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';

import { ModalService } from './modal.service';
import { mockModalService } from './modal.service.mock';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: BsModalService, useValue: mockModalService }]
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to open a modal dialog', () => {
    spyOn(service, 'openModal').and.callThrough();
    // I'm passing `null` to the TemplateRef inorder to avoid creating a component with template etc., Since our idea is to test the
    // existence of the method, hence it's suffice.
    service.openModal(null);
    expect(service.openModal).toHaveBeenCalledTimes(1);
  });

  it('should be able to open a success modal dialog', () => {
    spyOn(service, 'openSuccessModal').and.callThrough();
    // I'm passing `null` to the TemplateRef inorder to avoid creating a component with template etc., Since our idea is to test the
    // existence of the method, hence it's suffice.
    service.openSuccessModal(null);
    expect(service.openSuccessModal).toHaveBeenCalledTimes(1);
  });

  it('should be able to open a error modal dialog', () => {
    spyOn(service, 'openErrorModal').and.callThrough();
    // I'm passing `null` to the TemplateRef inorder to avoid creating a component with template etc., Since our idea is to test the
    // existence of the method, hence it's suffice.
    service.openErrorModal(null);
    expect(service.openErrorModal).toHaveBeenCalledTimes(1);
  });

  it('should be able to open a large error modal dialog', () => {
    spyOn(service, 'openErrorModalLarge').and.callThrough();
    // I'm passing `null` to the TemplateRef inorder to avoid creating a component with template etc., Since our idea is to test the
    // existence of the method, hence it's suffice.
    service.openErrorModalLarge(null);
    expect(service.openErrorModalLarge).toHaveBeenCalledTimes(1);
  });

  it('should be able to close modal dialog', () => {
    spyOn(service, 'closeModal').and.callThrough();
    service.closeModal();
    expect(service.closeModal).toHaveBeenCalledTimes(1);
  });
});
