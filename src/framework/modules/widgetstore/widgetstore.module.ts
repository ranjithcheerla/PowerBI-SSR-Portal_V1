import { CommonutilModule } from './../commonutil/commonutil.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullpageStoreComponent } from './components/fullpage-store/fullpage-store.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CommonutilModule,
    RouterModule.forChild([
      {
        path: '',
        component: FullpageStoreComponent
      }
    ])
  ],
  entryComponents: [],
  declarations: [FullpageStoreComponent]
})
export class WidgetStoreModule {}
