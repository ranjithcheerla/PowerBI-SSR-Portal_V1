import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { filter } from 'rxjs/operators';
import { ConfigurationService } from './../../services/configuration.service';
import { MsalService } from './../../../../msal';
import { AppService } from './../../services/app.service';
declare const window: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() isPopover = true;
  popUser = false;
  user: Partial<User> = {
    upi: '',
    name: '',
    location: '',
    unit: '',
    designation: ''
  };
  showProfileButton = true;
  showSignoutButton = true;
  popSettings: boolean;
  userDetailsOnLaunch = true;
  constructor(
    private userService: UserService,
    private msalService: MsalService,
    private configService: ConfigurationService,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.userDetailsOnLaunch = this?.configService?.config?.appConfig?.graphCallOnAppLaunch ?? true;
    // If ems login is enabled and showUserProfile flag is set to true, then fire the graph call to fetch the user details!
    if (
      this.configService.config.appConfig.userProfile &&
      this.configService.config.appConfig.userProfile.showProfile &&
      this.userDetailsOnLaunch
    ) {
      this.graphCallToGetUserDetails();
    }
    if (this.configService.config.appConfig.userProfile) {
      this.showProfileButton = !!this.configService.config.appConfig.userProfile.profileButton;
      this.showSignoutButton = !!this.configService.config.appConfig.userProfile.signoutButton;
    }

    this.appService.showProfile$.asObservable().subscribe(() => {
      this.graphCallToGetUserDetails();
    });
  }

  graphCallToGetUserDetails() {
    if (this?.configService?.config?.enableMSAL) {
      this.getLoggedInUserDetails();
    } else {
      this.configService.config.appConfig.emsLoginEnabled ? this.getLoggedInUserDetails() : this.getUserDetails();
    }
  }

  setUser(loggedInUser: User) {
    this.user = {
      upi: loggedInUser.upi,
      name: loggedInUser.name.replace(/,/gi, ', '),
      location: loggedInUser.location,
      unit: loggedInUser.unit,
      designation: loggedInUser.designation
    };
  }

  getLoggedInUserDetails() {
    this.userService
      .getLoggedInUser()
      .pipe(filter(item => item !== undefined && item !== null))
      .subscribe(user => (this.user = user));
  }

  getUserDetails() {
    const user = this.userService.getExternalUser();
    this.setUser(user);
  }

  goToMyprofile() {
    const strWindowFeatures = 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';
    window.open(`https://intranet.worldbank.org/people/profile/${this.user.upi}`, 'World_Bank_Profile', strWindowFeatures);
  }

  signout() {
    this.msalService.logout();
  }
}
