import { environment } from './environments/environment';
/** This settings will be read during index.html file creation and updated accordingly */
export const ApplicationInfo = {
    title: 'Data & Analytics',
    externalScriptAtEndOfFile: ``,
    externalScriptAtHeadOfFile: ``,
    includeAppInSights: environment.analytics.appInsights,
    includeOmniture: environment.analytics.omniture,
    omnitureExternalSites: false,
    baseHref: '/'
};
