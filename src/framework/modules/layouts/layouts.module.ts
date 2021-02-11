import { EmptyContainerComponent } from './components/empty-container/empty-container.component';
import { CommonutilModule } from './../commonutil/commonutil.module';
import { CommonModule } from '@angular/common';
import { DynamicIoModule } from 'ng-dynamic-component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { DragulaModule } from 'ng2-dragula';
import { LayoutComponent } from './components/layout/layout.component';
import { WidgetComponent } from './components/widget/widget.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PlatformModule } from '@angular/cdk/platform';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    CommonutilModule,
    // DragulaModule.forRoot(),
    DynamicIoModule,
    FormsModule,
    DragDropModule,
    PopoverModule.forRoot(),
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    PlatformModule
  ],
  declarations: [LayoutComponent, EmptyContainerComponent, WidgetComponent],
  entryComponents: [],
  exports: [LayoutComponent, CommonModule, FormsModule]
})
export class LayoutsModule {}
