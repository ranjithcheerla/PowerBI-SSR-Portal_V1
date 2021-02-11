import { MsalService, MSAL_INSTANCE, MsalGuard, MsalInterceptor, MsalBroadcastService } from '@framework/msal/index';
import { IPublicClientApplication, PublicClientApplication, InteractionType, LogLevel } from '@azure/msal-browser';
import { MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG } from '@framework/msal/index';
import { MsalGuardConfiguration } from '@framework/msal/index';
import { MsalInterceptorConfig } from '@framework/msal/index';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '@env/environment';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: environment.msalConfig.auth,
    cache: environment.msalConfig.cache,
    system: {
      loggerOptions: {
        loggerCallback: (level: LogLevel, message: string, containsPii: boolean): void => {
          if (containsPii || !environment.msalConfig.logs) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              // tslint:disable-next-line:no-console
              console.info(message);
              return;
            case LogLevel.Verbose:
              // tslint:disable-next-line:no-console
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
          }
        },
        logLevel: LogLevel.Verbose,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfig {
  const protectedResourceMap = new Map<string, Array<string>>();
  environment.MSAL_RESOURCES.forEach(resources => {
    protectedResourceMap.set(resources.resource, resources.scope);
  });
  // protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);
  // protectedResourceMap.set('https://graph.windows.net/me?api-version=1.6', ['https://graph.windows.net/User.Read.All']);
  // protectedResourceMap.set('https://rapqa.crm.dynamics.com', ['https://rapqa.crm.dynamics.com/user_impersonation']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export const MSAL_SERVICES = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },
  {
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory
  },
  {
    provide: MSAL_GUARD_CONFIG,
    useValue: {
      interactionType: InteractionType.Redirect
    } as MsalGuardConfiguration
  },
  {
    provide: MSAL_INTERCEPTOR_CONFIG,
    useFactory: MSALInterceptorConfigFactory
  },
  MsalService,
  MsalGuard,
  MsalBroadcastService
];
