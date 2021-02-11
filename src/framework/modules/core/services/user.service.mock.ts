export const mockUserService = {
  setExternalUPI: code => {},
  getLoggedUserEmail: () => 'rchinnakampalli@worldbankgroup.org',
  getLoggedInUser: () => {
    return 'user';
  },
  getExternalUser: () => {
    return true;
  },
  setExternalUser: () => {},
  getLoggedInUserUpi: () => Promise.resolve('000527065')
};

export const mockGraphResponse = {
  'odata.metadata': 'https://graph.windows.net/WORLDBANK.ORG/$metadata#directoryObjects/@Element',
  'odata.type': 'Microsoft.DirectoryServices.User',
  objectType: 'User',
  objectId: '379736f6-116c-4a75-809b-508678cb657d',
  deletionTimestamp: null,
  accountEnabled: true,
  ageGroup: null,
  assignedLicenses: [
    {
      disabledPlans: [
        'aebd3021-9f8f-4bf8-bbe3-0ed2f4f047a1',
        '21b439ba-a0ca-424f-a6cc-52f954a5b111',
        '0feaeb32-d00e-4d66-bd5a-43b5b83db82c'
      ],
      skuId: '05e9a617-0261-4cee-bb44-138d3ef5d965'
    },
    { disabledPlans: [], skuId: 'b30411f5-fea1-4a59-9ad9-3db7c7ead579' },
    { disabledPlans: ['bf6f5520-59e3-4f82-974b-7dbbc4fd27c7'], skuId: '26124093-3d78-432b-b5dc-48bf992543d5' },
    {
      disabledPlans: [
        '65cc641f-cccd-4643-97e0-a17e3045e541',
        'd2d51368-76c9-4317-ada2-a12c004c432f',
        '9d0c4ee5-e4a1-4625-ab39-d82b619b1a34',
        'e26c2fcc-ab91-4a61-b35c-03cdc8dddf66',
        '46129a58-a698-46f0-aa5b-17f6586297d9',
        '6db1f1db-2b46-403f-be40-e39395f08dbb',
        '6dc145d6-95dd-4191-b9c3-185575ee6f6b',
        '41fcdd7d-4733-4863-9cf4-c65b83ce2df4',
        '2f442157-a11c-46b9-ae5b-6e39ff4e5849',
        'c4801e8a-cb58-4c35-aca6-f2dcc106f287',
        '617b097b-4b93-4ede-83de-5f075bb5fb2f',
        'efb0351d-3b08-4503-993d-383af8de41e3',
        'b1188c4c-1b36-4018-b48b-ee07604f6feb',
        '4de31727-a228-4ec3-a5bf-8e45b5ca48cc',
        '9f431833-0334-42de-a7dc-70aa40db46db'
      ],
      skuId: '184efa21-98c3-4e5d-95ab-d07053a96e67'
    },
    { disabledPlans: [], skuId: 'f30db892-07e9-47e9-837c-80727f46fd3d' }
  ],
  assignedPlans: [
    {
      assignedTimestamp: '2020-08-17T16:31:28Z',
      capabilityStatus: 'Enabled',
      service: 'CRM',
      servicePlanId: '95b76021-6a53-4741-ab8b-1d1f3d66a95a'
    },
    {
      assignedTimestamp: '2020-08-05T02:30:44Z',
      capabilityStatus: 'Enabled',
      service: 'ProjectProgramsAndPortfolios',
      servicePlanId: '31b4e2fc-4cd6-4e7d-9c1b-41407303bd66'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'MicrosoftStream',
      servicePlanId: '9e700747-8b1d-45e5-ab8d-ef187ceec156'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'Sway',
      servicePlanId: 'a23b959c-7ce8-4e57-9140-b90eb88a9e97'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'exchange',
      servicePlanId: 'efb87545-963c-4e0d-99df-69c6916d9eb0'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'PowerAppsService',
      servicePlanId: 'c68f8d98-5534-41c8-bf36-22fa496fa792'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'MicrosoftOffice',
      servicePlanId: '43de0ff5-c92c-492b-9116-175376d08c38'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'Deskless',
      servicePlanId: '8c7d2df8-86f0-4902-b2ed-a0458298f3b3'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'ProjectWorkManagement',
      servicePlanId: 'b737dad2-2f6c-4c65-90e3-ca563267e8b9'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'OfficeForms',
      servicePlanId: '2789c901-c14e-48ab-a76a-be334d9d793a'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'CRM',
      servicePlanId: '4ff01e01-1ba7-4d71-8cf8-ce96c3bbcf14'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'SharePoint',
      servicePlanId: '5dbe027f-2339-4123-9542-606e4d348a72'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'To-Do',
      servicePlanId: 'c87f142c-d1e9-4363-8630-aaea9c4d9ae5'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'WhiteboardServices',
      servicePlanId: '94a54592-cd8b-425e-87c6-97868b000b91'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'exchange',
      servicePlanId: '5136a095-5cf0-4aff-bec3-e84448b38ea5'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'ProcessSimple',
      servicePlanId: '76846ad7-7776-4c40-a281-a386362dd1b9'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'exchange',
      servicePlanId: '33c4f319-9bdd-48d6-9c4d-410b750a4a5a'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'exchange',
      servicePlanId: '199a5c09-e0ca-4e37-8f7c-b05d533e1ea2'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'RMSOnline',
      servicePlanId: 'bea4c11e-220a-4e6d-8eb8-8ea15d019f90'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'TeamspaceAPI',
      servicePlanId: '57ff2da0-773e-42df-b2af-ffb7a2317929'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'SharePoint',
      servicePlanId: 'e95bec33-7c88-4a70-8e19-b10bd9d0c014'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Deleted',
      service: 'MicrosoftKaizala',
      servicePlanId: 'aebd3021-9f8f-4bf8-bbe3-0ed2f4f047a1'
    },
    {
      assignedTimestamp: '2020-07-22T14:07:47Z',
      capabilityStatus: 'Enabled',
      service: 'YammerEnterprise',
      servicePlanId: '7547a3fe-08ee-4ccb-b430-5077c5041653'
    },
    {
      assignedTimestamp: '2020-07-16T11:26:55Z',
      capabilityStatus: 'Enabled',
      service: 'Office365InsiderRisk',
      servicePlanId: 'd587c7a3-bda9-4f99-8776-9bcf59c84f75'
    },
    {
      assignedTimestamp: '2020-07-16T11:26:55Z',
      capabilityStatus: 'Enabled',
      service: 'MicrosoftEndpointDLP',
      servicePlanId: '64bfac92-2b17-4482-b5e5-a0304429de3e'
    },
    {
      assignedTimestamp: '2020-07-04T08:55:48Z',
      capabilityStatus: 'Enabled',
      service: 'SCO',
      servicePlanId: 'c1ec4a95-1f05-45b3-a911-aa3fa01094f5'
    },
    {
      assignedTimestamp: '2020-06-11T12:24:12Z',
      capabilityStatus: 'Enabled',
      service: 'MicrosoftThreatProtection',
      servicePlanId: 'bf28f719-7844-4079-9c78-c1307898e192'
    },
    {
      assignedTimestamp: '2020-06-01T01:11:21Z',
      capabilityStatus: 'Enabled',
      service: 'AADPremiumService',
      servicePlanId: '41781fb2-bc02-4b7c-bd55-b576c07bb09d'
    },
    {
      assignedTimestamp: '2020-06-01T01:11:21Z',
      capabilityStatus: 'Enabled',
      service: 'MultiFactorService',
      servicePlanId: '8a256a2b-b617-496d-b51b-e76466e88db0'
    },
    {
      assignedTimestamp: '2020-06-01T01:11:21Z',
      capabilityStatus: 'Enabled',
      service: 'RMSOnline',
      servicePlanId: '6c57d4b6-3b23-47a5-9bc9-69f17b4947b3'
    },
    {
      assignedTimestamp: '2020-06-01T01:11:21Z',
      capabilityStatus: 'Enabled',
      service: 'Adallom',
      servicePlanId: '932ad362-64a8-4783-9106-97849a1a30b9'
    },
    {
      assignedTimestamp: '2020-05-31T21:42:29Z',
      capabilityStatus: 'Enabled',
      service: 'AADPremiumService',
      servicePlanId: 'eec0eb4f-6444-4f95-aba0-50c24d67f998'
    },
    {
      assignedTimestamp: '2020-05-31T21:42:29Z',
      capabilityStatus: 'Enabled',
      service: 'RMSOnline',
      servicePlanId: '5689bec4-755d-4753-8b61-40975025187c'
    },
    {
      assignedTimestamp: '2020-05-31T21:42:29Z',
      capabilityStatus: 'Enabled',
      service: 'AzureAdvancedThreatAnalytics',
      servicePlanId: '14ab5db5-e6c4-4b20-b4bc-13e36fd2227f'
    },
    {
      assignedTimestamp: '2020-05-31T21:42:29Z',
      capabilityStatus: 'Enabled',
      service: 'Adallom',
      servicePlanId: '2e2ddb96-6af9-4b1d-a3f0-d6ecfd22edb2'
    },
    {
      assignedTimestamp: '2020-05-16T11:49:02Z',
      capabilityStatus: 'Enabled',
      service: 'ProcessSimple',
      servicePlanId: 'dc789ed8-0170-4b65-a415-eb77d5bb350a'
    },
    {
      assignedTimestamp: '2020-05-16T11:49:02Z',
      capabilityStatus: 'Enabled',
      service: 'CRM',
      servicePlanId: '6ea4c1ef-c259-46df-bce2-943342cd3cb2'
    },
    {
      assignedTimestamp: '2020-05-16T11:49:02Z',
      capabilityStatus: 'Enabled',
      service: 'PowerAppsService',
      servicePlanId: 'ea2cf03b-ac60-46ae-9c1d-eeaeb63cec86'
    },
    {
      assignedTimestamp: '2020-05-10T14:17:15Z',
      capabilityStatus: 'Enabled',
      service: 'exchange',
      servicePlanId: '8e0c0a52-6a6c-4d40-8370-dd62790dcd70'
    },
    {
      assignedTimestamp: '2020-05-10T14:17:15Z',
      capabilityStatus: 'Enabled',
      service: 'WindowsDefenderATP',
      servicePlanId: '871d91ec-ec1a-452b-a83f-bd76c7d770ef'
    },
    {
      assignedTimestamp: '2019-01-08T17:13:05Z',
      capabilityStatus: 'Enabled',
      service: 'ProcessSimple',
      servicePlanId: '50e68c76-46c6-4674-81f9-75456511b170'
    },
    {
      assignedTimestamp: '2019-01-08T17:13:05Z',
      capabilityStatus: 'Enabled',
      service: 'CRM',
      servicePlanId: '17ab22cd-a0b3-4536-910a-cb6eb12696c0'
    }
  ],
  city: 'WASHINGTON',
  companyName: 'IBRD',
  consentProvidedForMinor: null,
  country: null,
  createdDateTime: '2017-10-26T05:50:37Z',
  creationType: null,
  department: 'ITSDT',
  dirSyncEnabled: true,
  displayName: 'Roopesh Chinnakampalli',
  employeeId: '000527065',
  facsimileTelephoneNumber: null,
  givenName: 'Roopesh',
  immutableId: '4/FPZXvM90CIVKkXwvd8gA==',
  isCompromised: null,
  jobTitle: 'IT Analyst, Business Solutions',
  lastDirSyncTime: '2020-06-22T13:16:39Z',
  legalAgeGroupClassification: null,
  mail: 'rchinnakampalli@worldbankgroup.org',
  mailNickname: 'rchinnakampalli',
  mobile: null,
  onPremisesDistinguishedName: null,
  onPremisesSecurityIdentifier: 'S-1-5-21-88094858-919529-1617787245-698859',
  otherMails: [],
  passwordPolicies: 'DisablePasswordExpiration',
  passwordProfile: null,
  physicalDeliveryOfficeName: 'I 11-220T',
  postalCode: null,
  preferredLanguage: null,
  provisionedPlans: [
    { capabilityStatus: 'Enabled', provisioningStatus: 'Success', service: 'SharePoint' },
    { capabilityStatus: 'Enabled', provisioningStatus: 'Success', service: 'SharePoint' },
    { capabilityStatus: 'Enabled', provisioningStatus: 'Success', service: 'exchange' },
    { capabilityStatus: 'Enabled', provisioningStatus: 'Success', service: 'exchange' },
    { capabilityStatus: 'Enabled', provisioningStatus: 'Success', service: 'exchange' },
    { capabilityStatus: 'Enabled', provisioningStatus: 'Success', service: 'exchange' },
    { capabilityStatus: 'Enabled', provisioningStatus: 'Success', service: 'CRM' },
    { capabilityStatus: 'Enabled', provisioningStatus: 'Success', service: 'CRM' },
    { capabilityStatus: 'Enabled', provisioningStatus: 'Success', service: 'exchange' },
    { capabilityStatus: 'Enabled', provisioningStatus: 'Success', service: 'CRM' }
  ],
  provisioningErrors: [],
  proxyAddresses: [
    'x500:/o=ExchangeLabs/ou=Exchange Administrative Group (FYDIBOHF23SPDLT)/cn=Recipients/cn=143d2fae19084bc6be0d6314ccb90097-000527065',
    'X500:/o=WBG/ou=Exchange Administrative Group (FYDIBOHF23SPDLT)/cn=Recipients/cn=000527065686',
    'smtp:rchinnakampalli@worldbankgroup.onmicrosoft.com',
    'smtp:rchinnakampalli@worldbankgroup.mail.onmicrosoft.com',
    'smtp:rchinnakampalli@domino.worldbankgroup.org',
    'SMTP:rchinnakampalli@worldbankgroup.org'
  ],
  refreshTokensValidFromDateTime: '2020-06-22T13:14:47Z',
  showInAddressList: null,
  signInNames: [],
  sipProxyAddress: '527065@worldbank.org',
  state: null,
  streetAddress: null,
  surname: 'Chinnakampalli',
  telephoneNumber: '522037162',
  'thumbnailPhoto@odata.mediaEditLink':
    'directoryObjects/379736f6-116c-4a75-809b-508678cb657d/Microsoft.DirectoryServices.User/thumbnailPhoto',
  'thumbnailPhoto@odata.mediaContentType': 'image/Jpeg',
  usageLocation: 'US',
  userIdentities: [],
  userPrincipalName: 'rchinnakampalli@worldbankgroup.org',
  userState: null,
  userStateChangedOn: null,
  userType: 'Member',
  extension_d1f2c0509aca4d48927c1e519198c9f1_VPU: 'ITS',
  extension_d1f2c0509aca4d48927c1e519198c9f1_SUPERVISORID: '000086225',
  extension_d1f2c0509aca4d48927c1e519198c9f1_CURCNTRYLOCCDW: 'WAS',
  extension_d1f2c0509aca4d48927c1e519198c9f1_extensionAttribute2: 'TR',
  extension_d1f2c0509aca4d48927c1e519198c9f1_employeeType: 'TERM',
  extension_d1f2c0509aca4d48927c1e519198c9f1_extensionAttribute3: '09928',
  extension_d1f2c0509aca4d48927c1e519198c9f1_division: '09928',
  extension_d1f2c0509aca4d48927c1e519198c9f1_extensionAttribute14: '000527065',
  extension_d1f2c0509aca4d48927c1e519198c9f1_extensionAttribute13: '87065',
  extension_d1f2c0509aca4d48927c1e519198c9f1_extensionAttribute12: 'ITS',
  extension_d1f2c0509aca4d48927c1e519198c9f1_employeeNumber: '527065',
  extension_d1f2c0509aca4d48927c1e519198c9f1_c: 'US'
};
