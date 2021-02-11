import { Injectable, Renderer2, RendererFactory2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class SplashscreenService {
  private renderer: Renderer2;
  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: any,
    private configService: ConfigurationService
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  show() {
    if (this?.configService?.config?.appConfig?.splashScreen) {
      setTimeout(() => {
        this.renderer.addClass(this.document.body, 'apploader');
      }, 0);
    }
  }

  hide() {
    if (this?.configService?.config?.appConfig?.splashScreen) {
      setTimeout(() => {
        this.renderer.removeClass(this.document.body, 'apploader');
      }, 0);
    }
  }
}
