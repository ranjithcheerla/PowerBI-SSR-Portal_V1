import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  modalRef: BsModalRef;
  toggleCheckEntry = true;
  checkEntry = [
    {
      title: 'Basic Information',
      hasChild: true,
      isOpen: true,
      activeChild: false,
      child: ['Full Name', 'Short Name', 'Project Status', 'Requesting Unit (e.g.OPCDR)']
    },
    {
      title: 'Development Objective',
      hasChild: true,
      activeChild: false,
      isOpen: true,
      child: ['Full Name', 'Short Name', 'Project Status', 'Requesting Unit (e.g.OPCDR)']
    },
    {
      title: 'Processing',
      isOpen: true
    },
    {
      title: 'Cost & Financing',
      hasChild: true,
      activeChild: false,
      isOpen: true,
      child: ['Full Name', 'Short Name', 'Project Status', 'Requesting Unit (e.g.OPCDR)']
    },
    {
      title: 'Financing Sources',
      hasChild: true,
      activeChild: false,
      isOpen: true,
      child: ['Full Name', 'Short Name', 'Project Status', 'Requesting Unit (e.g.OPCDR)']
    },
    {
      title: 'Details',
      hasChild: true,
      activeChild: false,
      isOpen: true,
      child: ['Full Name', 'Short Name', 'Project Status', 'Requesting Unit (e.g.OPCDR)']
    },
    {
      title: 'Enviornmental & Social',
      hasChild: true,
      activeChild: false,
      isOpen: true,
      child: ['Full Name', 'Short Name', 'Project Status', 'Requesting Unit (e.g.OPCDR)']
    },
    {
      title: 'Milestones',
      isOpen: true
    }
  ];

  constructor(private modalService: BsModalService) {}

  ngOnInit() {}

  validateCheckEntry() {
    this.toggleCheckEntry = !this.toggleCheckEntry;
  }
  openerrormodal(templateerror: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateerror, {
      class: 'cf-modal modal-dialog cf-modal-sm modal-dialog-centered'
    });
  }

  checkEntryToggle(currItem, i) {
    if (currItem.hasChild) {
      if (currItem.activeChild) {
        this.checkEntry.forEach(function(index) {
          index.activeChild = false;
          index.isOpen = true;
        });
      } else {
        this.checkEntry.forEach(function(index) {
          index.isOpen = false;
          index.activeChild = false;
        });
        this.checkEntry[i].isOpen = true;
        this.checkEntry[i].activeChild = true;
      }
    }
  }
}
