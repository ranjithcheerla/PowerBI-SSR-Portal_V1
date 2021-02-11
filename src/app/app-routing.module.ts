import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { EMSGuard } from '@framework/guards/ems.guard';
import { LayoutComponent } from '@framework/layout/layout.component';
import { AppLandingComponent } from './components/app-landing/app-landing.component';
import { CRMGuard } from '@framework/core/guards/crm.guard';
import { HomeComponent } from './components/home/home.component';
import { LendingComponent } from './components/ssr/lending/lending.component';
import { MyFavoriteComponent } from './components/ssr/my-favorite/my-favorite.component';
import { MyFavoriteReportsComponent } from './components/ssr/my-favorite-reports/my-favorite-reports.component';
import { EmbedReportComponent } from './components/ssr/embed-report/embed-report.component';
import { CreateReportComponent } from './components/ssr/create-report/create-report.component';
import { PortfolioComponent } from './components/ssr/portfolio/portfolio.component';
import { AsaComponent } from './components/ssr/Advisory/asa.component';
import { RasComponent } from './components/ssr/trust-funds/ras.component';
import { KnowledgeComponent } from './components/ssr/cross-cutting/knowledge.component';
import { CpfComponent } from './components/ssr/fiduciary/cpf.component';
import { EvaluationComponent } from './components/ssr/other-products/evaluation.component';
import { ResultsComponent } from './components/ssr/results/results.component';
import { RisksComponent } from './components/ssr/risks/risks.component';
import { UserVpuComponent } from './components/ssr/user-vpu/user-vpu.component';
import { BankwideComponent } from './components/ssr/bankwide/bankwide.component';
import { EdcComponent } from './components/ssr/edc/edc.component';
import { ErrorPageComponent } from './components/ssr/error-page/error-page.component';
import { from } from 'rxjs';
import { MsalGuard } from '@framework/msal/msal.guard';
import { LandingPageComponent } from './components/ssr/standard-reports/landing-page/landing-page.component';
import { LendingTemplateComponent } from './components/ssr/create-report/lending-template/lending-template.component';
import { ViewReportComponent } from './components/ssr/view-report/view-report.component';
import { SrLendingComponent } from './components/ssr/standard-reports/sr-lending/sr-lending.component';
import { SrLendingReportsComponent } from './components/ssr/standard-reports/sr-lending-reports/sr-lending-reports.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [MsalGuard]
  },
  {
    path: 'null',
    redirectTo: 'home',
    canActivate: [MsalGuard]
  },
  {
    path: 'home',
    redirectTo: 'home',
    canActivate: [MsalGuard]
  },
  // #route1 : This is route for a sample full page lazy-loaded module
  {
    path: 'fullpage',
    loadChildren: () => import('app/modules/fullpage/fullpage.module').then(m => m.FullpageModule),
    canLoad: [MsalGuard]
  },
  // #route2: This route navigates to sample landing page, to configured to "landingPageUrlPattern" property in Configurations object.
  {
    path: 'app-landing',
    component: AppLandingComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'operations/lending',
    component: LendingComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'operations/fiduciary',
    component: CpfComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'operations/cross-cutting',
    component: KnowledgeComponent,
    canActivate: [EMSGuard]
  },
  {
    path: 'operations/trust-funds',
    component: RasComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'operations/other-products',
    component: EvaluationComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'operations/advisory',
    component: AsaComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'operations/advisory/ras',
    component: RasComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'operations/lending/evaluation',
    component: EvaluationComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'operations/knowledge',
    component: KnowledgeComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'its-vpu',
    component: UserVpuComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'all-wb',
    component: BankwideComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'operations/lending/completion',
    component: CpfComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'my-favorite',
    component: MyFavoriteComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'operations/lending/results',
    component: ResultsComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'error-page',
    component: ErrorPageComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'operations/lending/risk',
    component: RisksComponent,
    canActivate: [EMSGuard]
  },
  {
    path: 'embed-report',
    component: EmbedReportComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'edc',
    component: EdcComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'myfavorite-reports',
    component: MyFavoriteReportsComponent
  },
  {
    path: 'create-report',
    component: CreateReportComponent
  },
  {
    path: 'lending-template',
    component: LendingTemplateComponent
  },
  {
    path: 'view-report',
    component: ViewReportComponent
  },
  {
    path: 'standard-reports',
    component: LandingPageComponent
  },
  {
    path: 'sr-lending',
    component: SrLendingComponent
  },
  {
    path: 'sr-lending-reports',
    component: SrLendingReportsComponent
  },
  // #route3: This route navigates to each layout mentioned in site configuration json.
  // Variable ":section" is mandatory.
  {
    path: ':section',
    component: LayoutComponent,
    canActivate: [MsalGuard, CRMGuard]
  },
  {
    path: ':section/:subsection1',
    component: LayoutComponent,
    canActivate: [MsalGuard]
  },
  {
    path: ':section/:subsection1/:subsection2',
    component: LayoutComponent,
    canActivate: [MsalGuard]
  },
  // #route4: wild card route
  {
    path: '**',
    loadChildren: () => import('@framework/pagenotfound/pagenotfound.module').then(m => m.PagenotfoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
