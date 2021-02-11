import { BehaviorSubject } from 'rxjs';

export interface IActiveCapabilityContext {
  capabilityIdentifier?: string;
  capability1Identifier?: string;
  capability2Identifier?: string;
  capabilityModel?: any;
  capabilitySecurity?: any;
  capabilityAccess?: any;
  extraProperties?: any;
}

export interface IActiveSiteContext {
  appGroupIdentifier?: string;
  siteContextKey?: string;
  capRouteMapper?: ICapRouteMapper;
  siteSecurity?: any;
  siteAccess?: any;
  extraProperties?: any;
}

export interface IActiveContext {
  capability?: IActiveCapabilityContext;
  site?: IActiveSiteContext;
  extraProperties?: any;
}

export interface ICapRouteMapper {
  [key: string]: string;
}

export interface IActiveContextService {
  activeCapabilityReady$: BehaviorSubject<IActiveContext>;
  activeSiteReady$: BehaviorSubject<IActiveContext>;
  getActiveCapabilityContext(): IActiveCapabilityContext;
  setActiveCapabilityContext(capabilityContext?: IActiveCapabilityContext): any;
  getActiveSiteContext(): IActiveSiteContext;
  setActiveSiteContext(siteContext?: IActiveSiteContext): any;
}
