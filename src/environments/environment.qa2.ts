export const environment = {
  appEnv: 'qa2',
  appGroup: 'customApps',
  production: true,
  omnitureEnv: 'qa',
  analytics: {
    omniture: false,
    appInsights: true
  },
  // TODO: This holds the end points to resources which needs TOKENS.
  // This is a global handler and any other tokens required, the endpoint should be
  // added here and the token will be fetched automatically!
  RESOURCES: [
    'https://graph.windows.net'
    // 'https://graph.microsoft.com',
    // 'https://isldev.crm.dynamics.com/',
    // 'https://onespaceqa.worldbank.org/portal',
    // 'https://wbgot.sharepoint.com'
  ],
  // App teams can specify the resrouce urls which are not part of the URL's
  // Let's assume, you have an url - https://xyz.com/abc and you should acquire the token from the token resource -'api://rpc.worldbank.org'
  // which is not part of the URL. In such scenarios, you can use the below map to specify the token for the URL.
  //
  // NOTE: You should specify the key in `RESOURCES` array as well. You can see demo implementation for `https://graph.windows.net`
  resourceUrlMap: {
    'https://graph.windows.net': {
      tokenUrl: 'https://graph.windows.net'
    }
  },
  adalConfig: {
    tenant: 'WORLDBANK.ORG',
    // TODO: This is a dummy client ID which has been set to simulate the EMS authentication.
    // This ID has to be updated with your own ID.
    clientId: 'fa4c41c5-9a61-4679-b34b-94545327cc65',
    postLogoutRedirectUri:
      'https://coreframeworkqa2.worldbank.org/adalRedirect.html',
    endpoints: {
      graphApiUri: 'https://graph.microsoft.com'
    },
    cacheLocation: 'localStorage',
    redirectUri: 'https://coreframeworkqa2.worldbank.org/adalRedirect.html'
  },
  appInsightsKey: '1b6d0912-f78d-408d-856e-f778f8e7f409',
  crmLicenseHost: 'https://apilicenserolemgmtqa.azurewebsites.net',
  crmAppId: ''
};
