import { environment } from '@env/environment';
import { IOmnitureConfig, IOmniturePages } from '@framework/omniture/omniture.model';


// Holds the Omniture Configurations. Below values are for demo purpose. please change accordingly to your app needs!
export const Config: IOmnitureConfig = {
    siteLanguage: 'en',
    siteCountry: '',
    siteEnv: environment.omnitureEnv,
    cmsType: 'java',
    bussVPUnit: 'its',
    bussUnit: 'itsoc',
    bussUserGroup: 'external',
    bussAgency: 'ibrd',
    siteType: 'esf search tool'
};

// Holds the Omniture Page Configurations. Below values are for demo purpose. please change accordingly to your app needs!
// List all your app pages and their respective details, which will be sent to Omniture.
export const Pages: IOmniturePages = {
    'home': {
        pageName: 'appLanding',
        pageCategory: 'home',
        pageUid: 'coreframeworkhome',
        channel: 'ITS esfhome EXT',
        contentType: 'homepage',
        pageFirstPub: '10-01-2018',
        pageLastMod: '10-01-2018',
        siteSection: 'home',
        bussVPUnit: 'its',
        bussUnit: 'itsoc'
    }
};
