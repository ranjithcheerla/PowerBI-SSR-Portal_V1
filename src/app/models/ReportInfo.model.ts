export interface IReportInfo {
    name: string;
    displayName: string;
    appId: string;
    datasetId: string;
    embedUrl: string;
    id: string;
    isOwnedByMe: boolean;
    isDatasource: boolean;
    reportType: string;
    webUrl: string;
    backurl: string;
    backUrlTitle: string;
    viewMode: string;

    subjectArea: string;
    busArea: string;
    subBusArea: string;
    subBusAreaSort: 0;
    showBusLine: false;
    showBusArea: false;
    excelUrl: string;
    isTemplate: boolean;
    WebPart: string;
}
