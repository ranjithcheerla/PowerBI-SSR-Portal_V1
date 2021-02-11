import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { CFW_INTERNAL } from '../../../framework.constant';
import { CfwDebugService } from './cfw-debug.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(private configService: ConfigurationService, private cfwDebugService: CfwDebugService) {
    this.log(`VERSION - ${CFW_INTERNAL.version}`);
  }

  log(message: any, byPassLogCheck = false): void {
    this.cfwDebugService.updateInfo(message);
    if (this.configService.config.logging || byPassLogCheck) {
      typeof message === 'string'
        ? // tslint:disable-next-line:no-console
          console.log(`%cCORE FW :  ${JSON.parse(JSON.stringify(message))}`, 'color: #ff6d00;font-size:12px;')
        : // tslint:disable-next-line:no-console
          console.log(`CORE FW: `, message);
    }
  }

  error(message: any): void {
    this.cfwDebugService.updateError(message);
    if (this.configService.config.logging) {
      // tslint:disable-next-line:no-console
      console.log(`%cCORE FW Error :  ${message}`, 'color: #ff0000;font-size:12px;');
    }
  }
}
