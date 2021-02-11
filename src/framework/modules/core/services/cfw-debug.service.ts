import { Injectable, Inject, VERSION, isDevMode, ApplicationRef } from '@angular/core';
import { WindowToken } from './window.service';
import { _ } from './../../../lodash';
import { CFW_INTERNAL } from '../../../framework.constant';

@Injectable({
  providedIn: 'root'
})
export class CfwDebugService {
  constructor(@Inject(WindowToken) private window: any, private appRef: ApplicationRef) {}

  init() {
    const cfw = {
      Version: CFW_INTERNAL.version,
      Angular: VERSION.full,
      isDevMode: isDevMode(),
      appRef: this.appRef,
      errors: [],
      info: []
    };
    this.setCfwWindowObject(cfw);
  }
  setCfwWindowObject(prop: { [key: string]: any }) {
    this.window['cfw'] = _.merge({}, this.window['cfw'], prop);
  }

  updateError(error: string) {
    this?.window?.['cfw']?.errors.push(error);
  }
  updateInfo(info: string) {
    this?.window?.['cfw']?.info.push(info);
  }
}
