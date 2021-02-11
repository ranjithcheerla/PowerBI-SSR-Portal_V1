import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '@framework/services/framework.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private fwService: FrameworkService) {}
  ngOnInit() {
    this.observeNavigateBack();
    this.observeBreadcrumbClick();
    // setTimeout(() => {
    //   // The below method to be invoked if the EMS authentication is set to false.
    //   // Send UPI / unique code of user to Framework to store the user preferences.
    //   this.fwService.apiSetExternalUser({
    //     upi: '000527065',
    //     name: 'Roopesh Chinnakampalli',
    //     location: 'Washington DC',
    //     unit: 'ITSDT',
    //     designation: 'ET Consultant'
    //   });
    // }, 0);

    this.fwService
      .apiPlatformReady()
      .pipe(filter((isReady: boolean) => isReady))
      .subscribe((isReady: boolean) => {});
  }

  observeNavigateBack() {
    this.fwService.menuBack$.subscribe(data => {
      // Application specific logic to be written here
      /*const settings = data.settings;
      if (data && settings && settings.leftNavType === 'drilldown' && settings.collapsed) {
        alert('execute ur code if u want');
      } else {
        alert('do nothing');
      }*/
    });
  }

  observeBreadcrumbClick() {
    this.fwService.apiBreadcrumbClick$.subscribe(data => {
      /*console.log('breadcurmb data');
      console.log(data);*/
    });
  }
}
