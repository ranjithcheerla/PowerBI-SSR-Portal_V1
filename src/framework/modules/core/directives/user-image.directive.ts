import { Directive, ElementRef, Input, OnChanges, HostListener } from '@angular/core';

@Directive({
  selector: '[appUserImage]'
})
export class UserImageDirective implements OnChanges {
  @Input() appUserImage: string;
  defaultImgUrl = '/framework/assets/images/no-user.png';

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (!this.appUserImage) {
      this.el.nativeElement.src = this.defaultImgUrl;
    } else {
      this.el.nativeElement.src = `https://zoom.worldbank.org/photo/people/${this.appUserImage}.jpg`;
    }
  }

  @HostListener('error') showDefaults() {
    this.el.nativeElement.src = this.defaultImgUrl;
  }
}
