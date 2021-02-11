import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { CommonutilModule } from './../commonutil/commonutil.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CommonutilModule,
    DragDropModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ]
})
export class ReorderModule {}
