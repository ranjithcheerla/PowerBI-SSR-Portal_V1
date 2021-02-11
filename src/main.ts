import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ApplicationInfo } from './index';

if (environment.production) {
  enableProdMode();
}

if (ApplicationInfo.includeOmniture) {
  document.write(
    '<script type="text/javascript"> if(window._satellite) { _satellite.pageBottom(); }</script>'
  );
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // tslint:disable-next-line:no-console
  .catch(err => console.log(err));
