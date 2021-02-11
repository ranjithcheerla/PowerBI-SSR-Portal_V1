import { Directive, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { LeftNav } from '../models/leftNav.model';
import { AppService } from '../services/app.service';

@Directive({
  selector: '[appFindActiveItem]'
})
export class FindActiveItemDirective implements OnChanges {
  @Input() appFindActiveItem: LeftNav;
  @Output() activeItem = new EventEmitter<LeftNav>();
  constructor(private appService: AppService) {}
  ngOnChanges() {
    if (this.appFindActiveItem !== null && !this.appService.getAppData('isFirstTime')) {
      this.activeItem.emit(this.appFindActiveItem);
      this.appService.setAppData('isFirstTime', 'yes', false);
    }
  }
}
