import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdalService } from '../../services/adal.service';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  siteName: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adalSrv: AdalService,
    private configService: ConfigurationService
  ) {}

  ngOnInit() {
    this.siteName = this.configService.config.siteName;
    if (
      this.adalSrv.isLogged ||
      !this.configService.config.appConfig.emsLoginEnabled
    ) {
      const returnUrl =
        this.route.snapshot.queryParams['returnUrl'] ||
        this.configService.config.landingPageUrlPattern;
      this.router.navigateByUrl(returnUrl);
    } else {
      this.adalSrv.context.login();
    }
  }
}
