import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrameworkModule } from '@framework/framework.module';
import { Configurations, Environments, PrefMode, appGroups, Layouts, Themes } from '@framework/core/models/configurations';
import { environment } from '@env/environment';
import { AppLandingComponent } from './components/app-landing/app-landing.component';
import { PageConfigComponent } from './components/page-config/page-config.component';
import { SiteTitleComponent } from './components/site-title/site-title.component';
import { appWidgets, widgetCategories } from './components/widgets/app-widget.constant';
import { BannerComponent } from './components/banner/banner.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Config, Pages } from './analytics/omniture.data';
import { SiteType } from '@framework/omniture/omniture.model';
import { SearchComponent } from './components/search/search.component';
import { CustomActionsComponent } from './components/custom-actions/custom-actions.component';
import { NewsComponent } from './components/widgets/news/news.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './components/home/home.component';
import { LendingComponent } from './components/ssr/lending/lending.component';
import { MyFavoriteComponent } from './components/ssr/my-favorite/my-favorite.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MyFavoriteReportsComponent } from './components/ssr/my-favorite-reports/my-favorite-reports.component';
import { PowerbirestService } from './services/powerbirest.service';
import { NgxPowerBiModule } from 'ngx-powerbi';
import { EmbedReportComponent } from './components/ssr/embed-report/embed-report.component';
import { CreateReportComponent } from './components/ssr/create-report/create-report.component';
import { PortfolioComponent } from './components/ssr/portfolio/portfolio.component';
import { PortfolioReportsComponent } from './components/ssr/portfolio-reports/portfolio-reports.component';
import { AsaComponent } from './components/ssr/Advisory/asa.component';
import { RasComponent } from './components/ssr/trust-funds/ras.component';
import { KnowledgeComponent } from './components/ssr/cross-cutting/knowledge.component';
import { CpfComponent } from './components/ssr/fiduciary/cpf.component';
import { EvaluationComponent } from './components/ssr/other-products/evaluation.component';
import { ResultsComponent } from './components/ssr/results/results.component';
import { RisksComponent } from './components/ssr/risks/risks.component';
import { ExcelReportsComponent } from './components/ssr/excel-reports/excel-reports.component';
import { PowerbiReportsComponent } from './components/ssr/powerbi-reports/powerbi-reports.component';
import { UserVpuComponent } from './components/ssr/user-vpu/user-vpu.component';
import { BankwideComponent } from './components/ssr/bankwide/bankwide.component';
import { EdcComponent } from './components/ssr/edc/edc.component';
import { ErrorPageComponent } from './components/ssr/error-page/error-page.component';
import { MSAL_SERVICES } from './msal.config';
import { CardViewComponent } from './components/card-view/card-view.component';
import { SearchKeywordComponent } from './components/search-keyword/search-keyword.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LandingPageComponent } from './components/ssr/standard-reports/landing-page/landing-page.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { ChooseTemplateComponent } from './components/ssr/create-report/choose-template/choose-template.component';
import { LendingTemplateComponent } from './components/ssr/create-report/lending-template/lending-template.component';
import { SrLendingComponent } from './components/ssr/standard-reports/sr-lending/sr-lending.component';
import { SrLendingReportsComponent } from './components/ssr/standard-reports/sr-lending-reports/sr-lending-reports.component';
import { SrLendingBannerComponent } from './components/ssr/standard-reports/sr-lending-banner/sr-lending-banner.component';


const config: Configurations = {
  siteName: 'Data & Analytics',
  landingPageUrlPattern: '/home',
  appKey: 'APP00157',
  appGroup: appGroups[environment.appGroup],
  adalConfig: environment.adalConfig,
  resources: environment.RESOURCES,
  resourcesTokenUrlMap: environment.resourceUrlMap,
  pageConfigComponent: PageConfigComponent as Component,
  omniture: {
    config: Config,
    pageInfo: Pages,
    siteType: SiteType.Intranet,
    disableOmnitureReporting: false
  },
  appConfig: {
    enableInterceptor: false,
    appEnv: Environments[environment.appEnv],
    emsLoginEnabled: true,
    authorizations: {
      crmLicenseCheck: false,
      crmHostUrl: environment.crmLicenseHost,
      crmAppId: environment.crmAppId
    },
    defaultLayout: Layouts.FLUID,
    theme: Themes.THEME1,
    wbTopAndBottom: {
      header: true,
      footer: true
    },
    adminUrl: '/admin',
    userProfile: {
      showProfile: true,
      signoutButton: true,
      profileButton: true
    },
    customAction: { component: CustomActionsComponent as Component, input: { a: 1 } },
    customLeftNavMenu: false,
    splashScreen: true,
    flyOutSubMenu: false,
    appInsightsKey: environment.appInsightsKey,
    appInfo: {
      buildDate: '10 Mar 2020',
      version: '1.0.0'
    }
  },
  logging: false,
  widgets: appWidgets,
  widgetCategories: widgetCategories,
  pageBanners: { page3: BannerComponent as Component },

  preferencesMode: PrefMode.local,
  preferencePath: {
    sitePreferencesPath: '../../assets/json/sitePreferences.json',
    widgetPreferencesPath: '../../assets/json/widgetPreferences.json'
  },
  preferenceSecure: false,
  enableMSAL: true
};

// All the widgets which App Teams develops, should be added here inorder to dynamically inject it, when those are added via Widget Store.
const dynamicComponents = [
  AppComponent,
  NewsComponent,
  AppLandingComponent,
  AppLandingComponent,
  SearchComponent,
  AppHeaderComponent,
  BannerComponent,
  CustomActionsComponent,
  PageConfigComponent,
  SiteTitleComponent
];

@NgModule({
  declarations: [AppComponent, AppLandingComponent, ...dynamicComponents, AppHeaderComponent, HomeComponent,
    LendingComponent, MyFavoriteComponent,
    MyFavoriteReportsComponent, EmbedReportComponent, CreateReportComponent, PortfolioComponent,
    ChooseTemplateComponent,
    LendingTemplateComponent,
    PortfolioReportsComponent, AsaComponent, RasComponent,
    KnowledgeComponent, CpfComponent,
    EvaluationComponent, ResultsComponent,
    RisksComponent, ExcelReportsComponent,
    PowerbiReportsComponent, UserVpuComponent, BankwideComponent,
    EdcComponent, ErrorPageComponent, CardViewComponent, SearchKeywordComponent, LandingPageComponent, SrLendingComponent, SrLendingReportsComponent, SrLendingBannerComponent],
  entryComponents: [...dynamicComponents],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPowerBiModule,
    NgSelectModule,
    SlickCarouselModule,
    FrameworkModule.configurations(config),
    BsDropdownModule,
    AppRoutingModule,
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AgGridModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: false // envrionment.production -> By default disabled to prevent App Teams forgot to
      // disable and project may not need service worker functionality!
    })
  ],
  providers: [...MSAL_SERVICES, PowerbirestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
