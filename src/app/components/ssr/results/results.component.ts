import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor() { }

  searchTerm: any;
  isListFullScreen: any;

  ngOnInit(): void {
  }
  doserach(searchItem) {

  }
  toggleFullScreen() {

  }


}
