import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-search-keyword',
  templateUrl: './search-keyword.component.html',
  styleUrls: ['./search-keyword.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({ height: '0px', overflow: 'hidden' })),
      state('false', style({ height: '*' })),
      transition('1 => 0', animate('300ms ease-in')),
      transition('0 => 1', animate('300ms ease-out'))
    ])
  ]
})
export class SearchKeywordComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  showquicklink = false;
  showbrowseby = false;
  windowsize;
  searchdata = [];
  searchdataArraylength: number;
  searchdataDisplayCount = 3;
  searchdataDisplayItems: number;
  searchDisplayAll = false;

  searchdataLocal = [
    { id: 1, name: 'Top other countries by project co-financing amount' },
    { id: 2, name: 'Top real country flags by project IBRD commitments' },
    { id: 3, name: 'top blend countries by project TF cumulative expenses' },
    { id: 4, name: 'Top other countries by project co-financing amount' },
    { id: 5, name: 'Top real country flags by project IBRD commitments' },
    { id: 6, name: 'top blend countries by project TF cumulative expenses' }
  ];
  selectedItem: string;

  ngOnInit(): void {
    this.document.body.classList.add('landing-page');

    this.searchdataArraylength = this.searchdataLocal.length;

    if (this.searchdataLocal.length > this.searchdataDisplayCount) {
      this.searchToggle(false);
    } else {
      this.searchToggle(true);
    }
  }

  searchToggle(e: boolean) {
    this.searchdata = [];
    this.searchDisplayAll = e;
    if (e) {
      this.searchdata = this.searchdataLocal.slice(0, this.searchdataArraylength);
    } else {
      this.searchdata = this.searchdataLocal.slice(0, this.searchdataDisplayCount);
    }
  }

  showmorequick() {
    this.showquicklink = !this.showquicklink;
  }

  showmorebrowseby() {
    this.showbrowseby = !this.showbrowseby;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowsize = event.target.innerWidth;
    if (this.windowsize > 767) {
      this.showquicklink = false;
      this.showbrowseby = false;
    } else {
      this.showquicklink = true;
      this.showbrowseby = true;
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.document.body.classList.remove('landing-page');
  }



}
