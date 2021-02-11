import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonutilModule } from './../commonutil/commonutil.module';
import { TokenInterceptor } from './../core/interceptors/tokenInterceptor';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from './components/footer/footer.component';
import { FrameworkRootComponent } from './components/framework-root/framework-root.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SiteInfoComponent } from './components/site-info/site-info.component';
import { RightTrialComponent } from './components/right-trial/right-trial.component';
import { DynamicIoModule } from 'ng-dynamic-component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { LeftnavComponent } from './components/leftnav/leftnav.component';
import { UserComponent } from './components/user/user.component';
import { ActionsComponent } from './components/actions/actions.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserImageDirective } from './directives/user-image.directive';
import { WindowToken, windowProvider } from './services/window.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PlatformModule } from '@angular/cdk/platform';
import { InPageStoreComponent } from './components/in-page-store/in-page-store.component';
import { CustomHeaderComponentComponent } from './components/custom-header-component/custom-header-component.component';
import { ROOT_SITE_ID } from './services/tokens';
import { RootSiteService } from './services/root-site.service';
import { FindActiveItemDirective } from './directives/find-active-item.directive';
import { GlobalnavComponent } from './components/globalnav/globalnav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CorefwInsightsComponent } from './components/corefw-insights/corefw-insights.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    CommonutilModule,
    PopoverModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    DynamicIoModule,
    PlatformModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SiteInfoComponent,
    LoginComponent,
    FrameworkRootComponent,
    RightTrialComponent,
    SiteHeaderComponent,
    LeftnavComponent,
    UserComponent,
    ActionsComponent,
    SettingsComponent,
    UserImageDirective,
    BreadcrumbComponent,
    InPageStoreComponent,
    CustomHeaderComponentComponent,
    FindActiveItemDirective,
    GlobalnavComponent,
    CorefwInsightsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [FrameworkRootComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: WindowToken, useFactory: windowProvider },
    {
      provide: ROOT_SITE_ID,
      useClass: RootSiteService
    }
  ]
})
export class CoreModule {}
