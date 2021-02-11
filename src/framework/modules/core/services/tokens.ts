import { InjectionToken } from '@angular/core';
import { IRootSite } from '../models/rootsite.model';
import { Configurations } from '../models/configurations';
import { IActiveContext } from '../models/context.model';

export const ROOT_SITE_ID = new InjectionToken<IRootSite>('ROOT_SITE_ID');
export const ConfigurationsInjectionService = new InjectionToken<Configurations>('Configurations');
export const ActiveContextService = new InjectionToken<IActiveContext>('ActiveContextService');
