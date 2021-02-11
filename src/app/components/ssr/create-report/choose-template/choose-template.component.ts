import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-choose-template',
  templateUrl: './choose-template.component.html',
  styleUrls: ['./choose-template.component.scss']
})
export class ChooseTemplateComponent implements OnInit {

  constructor() { }
  activeBussinessLine: number = null;
  activeBussinessArea: number = null;
  showBussionArea = false;

  // tslint:disable-next-line:member-ordering
  bussinessLine = [{
    icon: 'icon-operations',
    title: 'Operations'
  },
  {
    icon: 'icon-res-mang',
    title: 'Resource Management'
  },
  {
    icon: 'icon-human-resource',
    title: 'Human Resource'
  },
  {
    icon: 'icon-loans',
    title: 'Loans'
  },
  {
    icon: 'icon-trust-fund',
    title: 'Trust Funds'
  },
  {
    icon: 'icon-travel',
    title: 'Travel'
  },
  {
    icon: 'icon-wbg-portfolio',
    title: 'WBG Country Portfolio'
  },
  {
    icon: 'icon-miga',
    title: 'MIGA'
  }];

  bussinessArea = [{
    icon: 'icon-lending',
    title: 'Lending'
  },
  {
    icon: 'icon-portfolio',
    title: 'Portfolio'
  },
  {
    icon: 'icon-asa',
    title: 'ASA'
  },
  {
    icon: 'icon-ras',
    title: 'RAS'
  },
  {
    icon: 'icon-knowledge',
    title: 'Knowledge'
  },
  {
    icon: 'icon-cpf',
    title: 'CPF'
  },
  {
    icon: 'icon-trust-fund',
    title: 'Trust Funds'
  }];

  ngOnInit(): void {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {

  }

}
