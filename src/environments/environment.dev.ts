// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.

export const environment = {
  appEnv: 'local',
  appGroup: 'customApps',
  production: true,
  omnitureEnv: 'dev',
  analytics: {
    omniture: false,
    appInsights: false
  },
  isMSALAuth: true,
  // TODO: This holds the end points to resources which needs TOKENS.
  // This is a global handler and any other tokens required, the endpoint should be added here and the token will be fetched automatically!
  RESOURCES: [
    'https://analysis.windows.net/powerbi/api',
    'https://graph.windows.net',
    'https://apilicenserolemgmt.azurewebsites.net',
    'https://graph.microsoft.com',
    'https://isldev.crm.dynamics.com/',
    'https://onespaceqa.worldbank.org/portal',
    'https://wbgot.sharepoint.com',
    'https://wbgot.sharepoint.com',
    'https://api.powerbi.com/v1.0/myorg/reports',
    'https://api.powerbi.com/v1.0/myorg/groups/',
    'https://powerbiopsapidev.aseqa.worldbank.org',
    '5b2b35a4-2105-4572-a779-4538070fa7b5',
    'https://drcsearchapiqa.asestg.worldbank.org'
  ],
  // App teams can specify the resrouce urls which are not part of the URL's
  // Let's assume, you have an url - https://xyz.com/abc and you should acquire the token from the token resource -'api://rpc.worldbank.org'
  // which is not part of the URL. In such scenarios, you can use the below map to specify the token for the URL.
  //
  // NOTE: You should specify the key in `RESOURCES` array as well. You can see demo implementation for `https://graph.windows.net`
  resourceUrlMap: {
    'https://api.powerbi.com/v1.0/myorg/reports': {
      tokenUrl: 'https://analysis.windows.net/powerbi/api'
    },
    'https://api.powerbi.com/v1.0/myorg/groups/': {
      tokenUrl: 'https://analysis.windows.net/powerbi/api'
    }
  },
  adalConfig: {
    tenant: 'ad.WORLDBANK.ORG',
    // TODO: This is a dummy client ID which has been set to simulate the EMS authentication.
    // This ID has to be updated with your own ID.
    clientId: '69d3a723-22cb-45d1-bb30-a93ed9425b81',
    postLogoutRedirectUri: 'https://powerbiopsappdev.aseqa.worldbank.org/adalRedirect.html',
    endpoints: {
      graphApiUri: 'https://graph.microsoft.com'
    },
    cacheLocation: 'localStorage',
    redirectUri: 'https://powerbiopsappdev.aseqa.worldbank.org/adalRedirect.html',
    popUp: false
  },
  MSAL_RESOURCES: [
    {
      resource: 'https://graph.microsoft.com/v1.0/me',
      scope: ['user.read']
      // resource: 'https://api.powerbi.com/v1.0/myorg/groups',
      // scope: ['Tenant.Read.All']
    }
    ,
    {
      resource: 'https://api.powerbi.com/v1.0/myorg/groups',
      scope: ['https://analysis.windows.net/powerbi/api/.default']
    }
    ,
    {
      resource: 'https://api.powerbi.com/v1.0/myorg/reports',
      scope: ['https://analysis.windows.net/powerbi/api/.default']
    }
  ],
  msalConfig: {
    auth: {
      authority: 'https://login.microsoftonline.com/worldbank.org/',
      clientId: '69d3a723-22cb-45d1-bb30-a93ed9425b81',
      redirectUri: 'https://powerbiopsappdev.aseqa.worldbank.org',
      postLogoutRedirectUri: 'https://powerbiopsappdev.aseqa.worldbank.org',
      navigateToLoginRequestUrl: true
    },
    cache: {
      cacheLocation: 'sessionStorage'
    },
    logs: false
  },
  initialScope: 'user.read',
  appInsightsKey: 'b8fb4cbb-f449-4289-b692-3b27189775e6',
  crmLicenseHost: 'https://apilicenserolemgmt.azurewebsites.net',
  crmAppId: ''
};
