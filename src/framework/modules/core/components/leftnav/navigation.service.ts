import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
  constructor(@Inject(DOCUMENT) private document: any) {}

  calculateMenuHeight(event: any, isFlyOutSubmenu: boolean): string | null {
    // Check current menu has child menu
    const childCls = event?.currentTarget?.className?.split(' ');
    if (childCls.length && childCls.indexOf('has-child-menu') === -1) {
      return null;
    }

    this.stopEventBubling(event);
    const bodyHeight = this?.document?.body?.scrollHeight;
    const wrapperHeight = this?.document?.body?.querySelector('.main-wrapper')?.clientHeight ?? 0;
    const footerHeight = this?.document?.body?.querySelector('.footer')?.clientHeight ?? 0;
    const headerHeight = this.document.body.querySelector('.header-container').clientHeight ?? 0;
    let menuHeight = '100%';

    // Height difference after sub menu opening
    const newScrollHeight = bodyHeight - (wrapperHeight + footerHeight + headerHeight);

    // Check if scroll height changed
    if (newScrollHeight > 0) {
      // set new height for left nav
      menuHeight = wrapperHeight + newScrollHeight + 'px';
    }
    this.flyOutMenuFooter(isFlyOutSubmenu);
    return menuHeight;
  }

  stopEventBubling(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  flyOutMenuFooter(flyoutSubmenu: boolean) {
    if (flyoutSubmenu) {
      this?.document?.body?.querySelector('.footer')?.classList?.add('flyover-menu-footer');
    } else {
      this?.document?.body?.querySelector('.footer')?.classList?.remove('flyover-menu-footer');
    }
  }

  scrollIntoView() {
    setTimeout(() => {
      this?.document?.body?.querySelector('.lhs-menu li.active')?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, 10);
  }
}
