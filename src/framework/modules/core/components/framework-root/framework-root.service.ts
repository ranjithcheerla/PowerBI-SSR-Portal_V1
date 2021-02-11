import { Injectable, RendererFactory2, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { ConfigurationService } from './../../services/configuration.service';
import { LoggerService } from './../../services/logger.service';
import { SplashscreenService } from './../../services/splashscreen.service';
import { Observable } from 'rxjs';
import { RootSiteService } from '../../services/root-site.service';
import { AppInsightsService } from '@framework/core/services/app-insights.service';
import { UserService } from '@framework/core/services/user.service';
import { ROOT_SITE_ID } from '@framework/core/services/tokens';

@Injectable({
  providedIn: 'root'
})
export class FrameworkRootService {
  private renderer: Renderer2;
  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: any,
    public platform: Platform,
    private configService: ConfigurationService,
    private logger: LoggerService,
    @Inject(ROOT_SITE_ID) private rootSiteService: RootSiteService,
    private splashscreenService: SplashscreenService,
    private appInsightsService: AppInsightsService,
    private userService: UserService
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  init() {
    this.splashscreenService.show();
    this.appInsightsService.init();
    this.validateForAppId();
  }

  updateFooter(flag: boolean): void {
    if (!flag) {
      this.renderer.addClass(this.document.body, 'no-footer');
    } else {
      this.renderer.removeClass(this.document.body, 'no-footer');
    }
  }

  isMobile() {
    const windowWidth = window.innerWidth;
    return windowWidth < 1021 || this.platform.IOS || this.platform.ANDROID;
  }

  getBaseTemplate(): Observable<string> {
    return this.rootSiteService.getSiteId();
  }

  setUserForAppInsights() {
    const upiOrEmail = this.configService.config.appConfig.emsLoginEnabled
      ? this.userService.getLoggedUserEmail()
      : this.userService.getUniqueCode();
    this.appInsightsService.setUserContext(upiOrEmail);
  }

  // Warn users if they're using the default AppId & App Insights key!
  validateForAppId(): void {
    if (this.configService.config.appKey === 'APP0023' && /customApps/i.test(this.configService.config.appGroup)) {
      this.logger.log(
        `Looks like you haven't registered your application with Core Framework Team.
      ${this.configService.config.appKey} key is intended for demoing Core Framework and shouldn't be used in applications!`,
        true
      );
    }
  }
}
