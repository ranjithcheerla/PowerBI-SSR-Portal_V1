import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagenotfoundRoutingModule } from './pagenotfound-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PagenotfoundRoutingModule
  ]
})
export class PagenotfoundModule { }
