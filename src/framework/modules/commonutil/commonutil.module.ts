import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompSpinnerSectionComponent, CompSpinnerUserComponent, PageSpinnerComponent } from './components/spinners';
import { KeysPipe } from './pipes/keys.pipe';
import { LispCasePipe } from './pipes/lisp-case.pipe';
import { SafePipe } from './pipes/safe.pipe';

const components = [
  CompSpinnerUserComponent,
  CompSpinnerSectionComponent,
  PageSpinnerComponent,
  KeysPipe,
  LispCasePipe,
  SafePipe
];
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [...components],
  exports: [CommonModule, ...components],
  providers: []
})
export class CommonutilModule {}
