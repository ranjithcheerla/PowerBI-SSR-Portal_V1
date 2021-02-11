import { Injectable, Inject } from '@angular/core';
import { Configurations } from './../models/configurations';
import { ConfigurationsInjectionService } from './tokens';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private configurations;
  constructor(@Inject(ConfigurationsInjectionService) private _config) {
    this.configurations = this._config;
  }

  public get config(): Configurations {
    return this.configurations;
  }
}
