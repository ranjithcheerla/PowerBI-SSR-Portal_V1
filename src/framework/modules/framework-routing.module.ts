import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { EMSGuard } from './core/guards/ems.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
  },
  {
    path: 'pagenotfound',
    loadChildren: () => import('./pagenotfound/pagenotfound.module').then(m => m.PagenotfoundModule)
  },
  {
    path: 'widgetstore',
    loadChildren: () => import('./widgetstore/widgetstore.module').then(m => m.WidgetStoreModule),
    canLoad: [EMSGuard]
  },
  {
    path: 'capabilities',
    loadChildren: () => import('./capabilities/capabilities.module').then(m => m.CapabilitiesModule),
    canLoad: [EMSGuard]
  },
  {
    path: 'reorder',
    loadChildren: () => import('./reorder/reorder.module').then(m => m.ReorderModule),
    canLoad: [EMSGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FrameworkRoutingModule {}
