export const environment = {
  appEnv: 'prod',
  appGroup: 'projects',
  production: true,
  omnitureEnv: 'prod',
  analytics: {
    omniture: false,
    appInsights: true
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
    'https://powerbiopsapi.worldbank.org',
    '4d162f62-75df-4ee8-baa9-f847aa90abc5',
    'https://drcsearchapi.ase.worldbank.org'
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
    },
    'https://drcsearchapi.ase.worldbank.org/inbound/addvisualization': {
      tokenUrl: 'https://drcsearchapi.ase.worldbank.org/'
    }
  },
  adalConfig: {
    tenant: 'ad.WORLDBANK.ORG',
    // TODO: This is a dummy client ID which has been set to simulate the EMS authentication.
    // This ID has to be updated with your own ID.
    clientId: 'aaf37401-511f-4560-b483-0b5202a985f9',
    postLogoutRedirectUri: 'https://powerbiopsapp.worldbank.org/adalRedirect.html',
    endpoints: {
      graphApiUri: 'https://graph.microsoft.com'
    },
    cacheLocation: 'sessionStorage',
    redirectUri: 'https://coreframework.worldbank.org/adalRedirect.html',
    extraQueryParameter: 'domain_hint=WORLDBANK.ORG'
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
    },

    {
      resource: 'https://drcsearchapi.ase.worldbank.org/inbound/addvisualization',
      scope: ['https://drcsearchapi.ase.worldbank.org/user_impersonation']
    }

  ],
  msalConfig: {
    auth: {
      authority: 'https://login.microsoftonline.com/worldbank.org/',
      clientId: 'aaf37401-511f-4560-b483-0b5202a985f9',
      redirectUri: 'https://powerbiopsapp.worldbank.org',
      postLogoutRedirectUri: 'https://powerbiopsapp.worldbank.org',
      navigateToLoginRequestUrl: true
    },
    cache: {
      cacheLocation: 'sessionStorage'
    },
    logs: false
  },
  initialScope: 'user.read',
  appInsightsKey: 'b8fb4cbb-f449-4289-b692-3b27189775e6',
  crmLicenseHost: 'https://itsocapilicenserolemgmt.azurewebsites.net',
  crmAppId: ''
};
