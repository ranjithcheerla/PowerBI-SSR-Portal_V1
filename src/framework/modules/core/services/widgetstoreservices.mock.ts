export const mockWidgetstoreService = {
  getWidgetdetails: () => {
    const data = {
      wsmsqlid: 22,
      widgetCategory: 'CRM',
      isWidDisable: false,
      ismobiledisabled: true,
      enableforupis: null,
      widJson: '{}',
      isWidMultiple: false,
      createddate: 'Jun 7, 2018 6:23:55 PM',
      modifieddate: 'Jun 8, 2018 12:10:27 PM',
      widgetPosition: '{"L1": "L1P1", "L2":"L2P1"}',
      widgetKey: 'WID0011',
      widgetName: 'Issue Log'
    };
    return data;
  },
  getWidgetName: widgetId => {
    return 'Issue Log';
  }
};

export const WidgetStoreMock = [
  {
    widgetCategory: 'General',
    isWidDisable: false,
    ismobiledisabled: false,
    enableforupis: null,
    isWidMultiple: true,
    widJson: '{}',
    widgetPosition: '{"L1":"L1P1","L4":"L4P1"}',
    siteappid: 'APP001',
    widgetKey: 'WID0020',
    widgetName: 'Dynamic Table',
    storeDisplayEnabled: true,
    createdby: 'Admin',
    lastmodifiedby: 'Admin',
    createddate: '2018-12-21 19:32:14.679396',
    modifieddate: '2018-12-21 19:37:34.121508'
  },
  {
    widgetCategory: 'General',
    isWidDisable: false,
    ismobiledisabled: true,
    enableforupis: null,
    isWidMultiple: true,
    widJson: '{}',
    widgetPosition: '{"L1":"L1P1","L4":"L4P1"}',
    siteappid: 'APP001',
    widgetKey: 'WID0018',
    widgetName: 'Dynamic Form',
    storeDisplayEnabled: true,
    createdby: 'Admin',
    lastmodifiedby: 'Admin',
    createddate: '2018-12-21 19:32:13.878334',
    modifieddate: '2018-12-21 19:37:32.521033'
  },
  {
    widgetCategory: 'General',
    isWidDisable: false,
    ismobiledisabled: false,
    enableforupis: null,
    isWidMultiple: true,
    widJson: '{}',
    widgetPosition: '{"L1":"L1P1","L4":"L4P1"}',
    siteappid: 'APP001',
    widgetKey: 'WID0022',
    widgetName: 'Button Bar',
    storeDisplayEnabled: true,
    createdby: 'Admin',
    lastmodifiedby: 'Admin',
    createddate: '2018-12-21 19:32:14.236551',
    modifieddate: '2018-12-21 19:37:33.246137'
  },
  {
    widgetCategory: 'General',
    isWidDisable: false,
    ismobiledisabled: true,
    enableforupis: null,
    isWidMultiple: false,
    widJson:
      '{"defaults":{"collapsed":false,"displayItems":5},"fields":{"displayItems":{"type":"dropdown","items":[5,10,15,20]}},"widgetStyles":{"backgroundColor":"#f38f19"},"metaData":{"icon":{"iconType":"fab","iconName":"500px"}}}',
    widgetPosition: '{"L1":"L1P1","L4":"L4P1"}',
    siteappid: 'APP001',
    widgetKey: 'WID0014',
    widgetName: 'test',
    storeDisplayEnabled: true,
    createdby: 'Admin',
    lastmodifiedby: 'Admin',
    createddate: '2018-11-06 17:24:24.43514',
    modifieddate: '2019-04-09 21:07:16.953403'
  },
  {
    widgetCategory: 'General',
    isWidDisable: false,
    ismobiledisabled: true,
    enableforupis: null,
    isWidMultiple: true,
    widJson: '{}',
    widgetPosition: '{"L1":"L1P2","L4":"L4P1"}',
    siteappid: 'APP001',
    widgetKey: 'WID00150',
    widgetName: 'Dynamic Link List',
    storeDisplayEnabled: true,
    createdby: 'Admin',
    lastmodifiedby: 'Admin',
    createddate: '2019-07-01 19:09:41.414567',
    modifieddate: null
  },
  {
    widgetCategory: 'General',
    isWidDisable: false,
    ismobiledisabled: true,
    enableforupis: null,
    isWidMultiple: false,
    widJson: '{}',
    widgetPosition: '{"L1":"L1P2","L4":"L4P1"}',
    siteappid: 'APP001',
    widgetKey: 'WID00160',
    widgetName: 'Initiate Process',
    storeDisplayEnabled: true,
    createdby: 'Admin',
    lastmodifiedby: 'Admin',
    createddate: '2019-07-26 21:22:48.895638',
    modifieddate: null
  },
  {
    widgetCategory: 'General',
    isWidDisable: false,
    ismobiledisabled: true,
    enableforupis: null,
    isWidMultiple: true,
    widJson: '{}',
    widgetPosition: '{"L1":"L1P1","L4":"L4P1"}',
    siteappid: 'APP001',
    widgetKey: 'WID0059',
    widgetName: 'Dynamic Tab Widget',
    storeDisplayEnabled: true,
    createdby: 'Admin',
    lastmodifiedby: 'Admin',
    createddate: '2019-02-04 01:38:57.367433',
    modifieddate: '2019-04-15 18:13:36.579936'
  }
];
