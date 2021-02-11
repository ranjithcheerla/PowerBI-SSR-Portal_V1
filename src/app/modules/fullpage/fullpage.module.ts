import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FullpageRoutingModule } from './fullpage-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FullpageRoutingModule,
  ],
  declarations: [HomeComponent],
  providers: []
})
export class FullpageModule { }
