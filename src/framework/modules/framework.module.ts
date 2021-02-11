import { CommonutilModule } from './commonutil/commonutil.module';
import { LayoutsModule } from './layouts/layouts.module';
import { CoreModule } from './core/core.module';
import { FrameworkRoutingModule } from './framework-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { Configurations } from './core/models/configurations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigurationsInjectionService } from './core/services/tokens';

const moduleArray = [CoreModule, LayoutsModule, CommonutilModule, FrameworkRoutingModule, BrowserAnimationsModule];

@NgModule({
  imports: [
    ...moduleArray,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      disableTimeOut: false,
      toastClass: 'customtoast'
    })
  ],
  exports: [...moduleArray]
})
export class FrameworkModule {
  static configurations(config: Configurations): ModuleWithProviders<FrameworkModule> {
    return {
      ngModule: FrameworkModule,
      providers: [{ provide: ConfigurationsInjectionService, useValue: config }]
    };
  }

  /* Make sure Framework is imported only by one NgModule the AppModule */
  constructor(@Optional() @SkipSelf() frameworkModule: FrameworkModule) {
    if (frameworkModule) {
      throw new Error('Framework Module is already loaded. Import only in AppModule');
    }
  }
}
