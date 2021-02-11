import { PrefMode } from '../models';
import { sitePreferencesMock } from './sitePreferences.mock';
import { WidgetStoreMock } from './widgetstoreservices.mock';

// tslint:disable-next-line:eofline
export const mockConfigurationService = {
  config: {
    siteName: 'page1',
    appKey: 'APP0023',
    preferencesMode: PrefMode.local,
    appGroup: 'customApps',
    appConfig: {
      wbTopAndBottom: true,
      appInsightsKey: 'b8fb4cbb-f449-4289-b692-3b27189775e6'
    },
    adalConfig: {
      tenant: 'TSTAD.WORLDBANK.ORG',
      clientId: '7bb1a976-1e0a-4e37-ae95-7a06a9269577',
      postLogoutRedirectUri: 'https://coreframeworkdev.worldbank.org/adalRedirect.html',
      endpoints: {
        graphApiUri: 'https://graph.microsoft.com'
      },
      cacheLocation: 'localStorage',
      redirectUri: 'https://coreframeworkdev.worldbank.org/adalRedirect.html'
    },
    preferencePath: {
      sitePreferencesPath: sitePreferencesMock,
      widgetPreferencesPath: WidgetStoreMock
    }
  }
};
