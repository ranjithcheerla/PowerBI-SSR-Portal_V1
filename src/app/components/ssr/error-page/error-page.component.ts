import { Component, OnInit } from '@angular/core';
import { PowerbirestService } from 'app/services/powerbirest.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor(private powerBIRSApi: PowerbirestService) { }
  errorMessage = null;
  showError = false;

  ngOnInit(): void {

    this.errorMessage = this.powerBIRSApi.errorMessage;
  }
  toggleErrorMsg() {
    if (!this.showError) {
      this.showError = true;
    }
  }
}
