import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchToggle = false;
  @ViewChild('txtSearch', { static: false }) inputSearch: ElementRef;
  constructor() {}

  ngOnInit() {}

  focusSearchbox() {
    this.searchToggle = true;
    setTimeout(() => {
      this.inputSearch.nativeElement.focus();
    }, 0);
  }
}
