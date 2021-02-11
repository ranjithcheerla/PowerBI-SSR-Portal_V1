import { Injectable } from '@angular/core';
import { Api } from './../../framework/modules/core/services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { AdalService } from './../../framework/modules/core/services/adal.service';
import { Observable, throwError } from 'rxjs';
import { UserService } from './../../framework/modules/core/services/user.service';
import { User } from '@framework/core/models/user.model';
import { catchError, filter } from 'rxjs/operators';
import { MsalInterceptor } from '@framework/msal/index';
import { ConfigurationService } from '@framework/core/services';
import { NgxPowerBiService } from 'ngx-powerbi';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as pbi from 'powerbi-client';
import { IReportInfo } from 'app/models/ReportInfo.model';

@Injectable({
  providedIn: 'root'
})
export class PowerbirestService {

  static token: any;
  static header: any;
  public selectedRpt: IReportInfo = null;
  public selectedCreateRpt: IReportInfo = null;
  selbireporturl: SafeUrl;
  private powerBiService: NgxPowerBiService;

  public groupedDS: any[] = [];
  myReports: IReportInfo[] = null;
  standardReports: IReportInfo[] = null;
  favReports: IReportInfo[] = null;
  excelReports: IReportInfo[] = null;
  excelGroupedReports: any[] = [];
  parsedReports: any[] = [];
  parsedDS: any[] = [];
  dbReports: any[] = [];
  srDbReports: any[] = [];
  groupedReports: any[] = [];
  saveRptName = '';
  saveReportReq: any = {};
  saveEDCReportReq: any = {};
  groupId = '6425b4fc-2524-4660-86a9-74242c6baa8a';
  srGroupId = 'a39b0275-a716-4155-b7ec-27322ef3828c';
  edcGroupId = '';
  savToFavRpt: IReportInfo = null;
  public userWorkspace: IReportInfo = null;
  public errorMessage = '';
  isProUser = false;
  isProCheck = false;
  isEditGallery = false;
  private pbiModels: any;
  apiurl = '';
  edcApiUrl = '';
  proUserADGroup = 'LicPowerBIPro';
  user: Partial<User> = {
    upi: '',
    name: '',
    location: '',
    unit: '',
    vpuUnit: ''
  };


  constructor(private apiClient: Api, public userService: UserService, private configService: ConfigurationService,
    private sanitizer: DomSanitizer) {
    this.apiurl = this.configService.config.resources[10];
    this.edcGroupId = this.configService.config.resources[11];
    this.edcApiUrl = this.configService.config.resources[12];
    this.pbiModels = pbi.models;
    this.getInitialReports();
    this.getStandardReports();
    this.powerBiService = new NgxPowerBiService();
    this.getUserInfo().subscribe(user => {
      this.user = user;
      this.checkUserLicense(this.user.upi, this.proUserADGroup).subscribe(data => this.isProUser = data);
    });

  }




  groupReportsBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj.rpts);

      return acc;
    }, {});
  }
  groupReports(objectArray, property, sortKey) {
    return objectArray.reduce(function (acc, obj) {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      acc.sort(function (a, b) {
        return a[sortKey] === b[sortKey];
      });
      return acc;
    }, []);
  }
  groupByArray(xs, key, sortKey) {
    return xs.reduce(function (rv, x) {
      const v = key instanceof Function ? key(x) : x[key];
      const el = rv.find(r => r && r.key === v);

      if (el) {
        el.values.push(x);
        el.values.sort(function (a, b) {
          return a[sortKey] - b[sortKey];
        });
      } else {
        rv.push({ key: v, values: [x] });
      }

      return rv;
    }, []);
  }

  public setCreateRpt(BusLine, BusArea) {
    this.groupedDS.forEach(items => {
      if (items.key === BusLine) {
        const reports = items.values;
        reports.forEach(item => {
          if (item.busArea === BusArea) {
            this.selectedCreateRpt = item;
            this.selectedCreateRpt.showBusArea = false;
            this.selectedCreateRpt.showBusLine = false;
          }
        });
      }
    });
  }

  public getStandardReports() {

    return new Observable(observer => {

      if (this.standardReports === null) {
        this.getReportsInGroup(this.srGroupId).subscribe(data => {

          this.standardReports = data.value;
          // tslint:disable-next-line:no-console
          console.log(data);
          this.getStandardReportsInfo().subscribe(metaData => {
            this.srDbReports = metaData;
            this.srDbReports.sort(function (obj1, obj2) { return obj1.subBusAreaSort - obj2.subBusAreaSort; });

            this.srDbReports.forEach(report => {
              const webRpt = this.standardReports.find(({ id }) => report.id === id);
              if (webRpt) {
                report.webUrl = webRpt.webUrl;
                report.embedUrl = webRpt.embedUrl;
                report.isOwnedByMe = webRpt.isOwnedByMe;
                report.datasetId = webRpt.datasetId;
              }
            });
            // this.groupedDS = this.groupByArray(this.parsedDS, 'subjectArea', 'subBusAreaSort');
            PowerbirestService.token = MsalInterceptor.accessToken;
            observer.next(this.srDbReports);
            observer.complete();
            // Changed the location of getting the token


          });


        });
      } else {
        observer.next(this.groupedDS);
        observer.complete();
      }
    });

  }

  public embedPowerBIReport(htmlComponent, report: IReportInfo) {

    const mode = this.pbiModels.ViewMode.View;

    if (PowerbirestService.token) {
      // Get the Embed token before embedding the report/dashboard
      // this.powerBiRSApi.getEmbedToken();
      // const webRpt = this.standardReports.find(({ name }) => reportName === name);
      const config = {
        type: 'report',
        embedUrl: report.embedUrl,
        accessToken: PowerbirestService.token,
        permissions: this.pbiModels.Permissions.ReadWrite,
        datasetId: report.datasetId,
        contrastMode: 0,
        //  permissions: this.pbiModels.Permissions.All,
        viewMode: mode,
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: false,
          personalBookmarksEnabled: false,
          panes: {
            bookmarks: {
              visible: false
            }
          }
        }
      };

      this.powerBiService.embed(htmlComponent, config);
    }


  }

  public embedPowerBITile(htmlComponent, groupId, dashboardId, tileId) {

    if (PowerbirestService.token) {
      this.getTileInGroup(groupId, dashboardId, tileId).subscribe(data => {
        const config = {
          type: 'tile',
          embedUrl: data.embedUrl,
          tokenType: this.pbiModels.TokenType.Aad,
          accessToken: PowerbirestService.token,
          id: data.id,
          dashboardId: dashboardId
        };
        this.powerBiService.embed(htmlComponent, config);
      }
      );
    }


  }

  public getInitialReports() {

    return new Observable(observer => {

      if (this.myReports === null) {
        this.getReportsInGroup(this.groupId).subscribe(data => {

          this.myReports = data.value;
          // tslint:disable-next-line:no-console
          console.log(data);
          this.getPowerBIReportsInfo().subscribe(metaData => {
            this.dbReports = metaData;
            this.parsedDS = this.dbReports.filter(report => (report.reportType === 'DataSource'));
            this.dbReports = this.dbReports.filter(report => (report.reportType === 'PowerBIReport'
              || report.reportType === 'PaginatedReport'));

            this.dbReports.forEach(report => {
              const webRpt = this.myReports.find(({ id }) => report.id === id);
              if (webRpt) {
                report.webUrl = webRpt.webUrl;
                report.embedUrl = webRpt.embedUrl;
                report.isOwnedByMe = webRpt.isOwnedByMe;
                report.datasetId = webRpt.datasetId;
                report.reportType = webRpt.reportType;
              }

            });

            this.dbReports.sort(function (obj1, obj2) { return obj1.subBusAreaSort - obj2.subBusAreaSort; });

            this.groupedDS = this.groupByArray(this.parsedDS, 'subjectArea', 'subBusAreaSort');

            observer.next(this.groupedDS);
            observer.complete();
            // Changed the location of getting the token
            PowerbirestService.token = MsalInterceptor.accessToken;

          });


        });
      } else {
        observer.next(this.groupedDS);
        observer.complete();
      }
    });

  }

  getProLicense() {


    return new Observable(proObserver => {

      if (this.user.upi !== '' && this.isProCheck) {
        proObserver.next(this.isProUser);
        proObserver.complete();
      } else {
        this.getUserInfo().subscribe(data => {
          this.checkUserLicense(this.user.upi, this.proUserADGroup).subscribe(dataPro => {
            this.isProUser = dataPro;
            this.isProCheck = true;
            proObserver.next(this.isProUser);
            proObserver.complete();
          });

        });

      }
    });

  }

  public getPowerBIReportsForType(rptType) {

    if (this.srDbReports.length > 0) {

      return this.srDbReports.filter(report => report.reportType === rptType);
    }

  }
  public getPowerBIReportsForBusArea(busArea, rptType) {

    if (this.dbReports.length > 0) {
      this.processReports(busArea, rptType);
      // tslint:disable-next-line:no-console
      console.log('Grouped reports ->' + this.groupedReports);
      return this.groupedReports;
    }

  }
  public getExcelReportsForBusArea(busArea) {

    return new Observable(observer => {

      if (this.excelReports === null) {
        this.getExcelReportsInfo().subscribe(data => {
          this.excelReports = data;
          this.processExcelReports(busArea);
          observer.next(this.excelGroupedReports);
          observer.complete();
        });

      } else {
        this.processExcelReports(busArea);
        observer.next(this.excelGroupedReports);
        observer.complete();
      }
    });



  }

  private processExcelReports(busArea: any) {
    this.excelGroupedReports = this.excelReports;
    this.excelGroupedReports = this.groupByArray(this.excelGroupedReports.filter(report => report.busArea === busArea), 'subBusArea', 'subBusAreaSort');
    // tslint:disable-next-line:no-console
    console.log(this.excelGroupedReports);
  }
  private processReports(busArea: any, rptType: any) {
    this.groupedReports = this.groupByArray
      (this.dbReports.filter(report => report.busArea === busArea && report.reportType === rptType), 'subBusArea', 'subBusAreaSort');
    // tslint:disable-next-line:no-console
    console.log('This is sorrted-->' + this.groupedReports);

  }

  public getToken() {

    // return new Observable(embedObj => {
    //   if (!PowerbirestService.token) {

    //     this.getEmbedToken().subscribe(data => {
    //       PowerbirestService.token = data.token;
    //       embedObj.next(data);
    //       embedObj.complete();
    //     });

    //   } else {

    //     embedObj.next(PowerbirestService.token);
    //     embedObj.complete();
    //   }

    // });


    return new Observable(embedObj => {

      if (!PowerbirestService.token) {

        PowerbirestService.token = MsalInterceptor.accessToken;
      } else {

        embedObj.next(PowerbirestService.token);
        embedObj.complete();
      }


    });




  }

  public getUserWorkspaceInfo() {
    return new Observable(obj => {
      if (this.user != null && this.userWorkspace != null) {

        obj.next(this.userWorkspace);
        obj.complete();
      } else {

        this.getUserInfo().subscribe(user => {
          if (this.user.vpuUnit !== '') {
            this.user = user;
            this.getUserWorkspace(this.user.vpuUnit + 'VP').subscribe(data => {
              this.userWorkspace = data;
              obj.next(data);
              obj.complete();
            });

          }
        });


      }

    });

  }
  getUserInfo() {
    return new Observable(userObj => {
      this.userService.getLoggedInUser().pipe(filter(item => item !== undefined && item !== null))
        .subscribe(user => {
          this.user = user;
          userObj.next(this.user);
          userObj.complete();
        }
        );

    });

  }


  public checkUserLicense(upi: string, proUserADGroup: string) {

    return this.apiClient.get(this.apiurl + '/api/PowerBIAD/checkUserGroup?pUserName='
      + upi + '&pGroupName=' + proUserADGroup)
      .pipe(catchError(this.handleError));

  }


  public getExcelReportsInfo() {
    return this.apiClient.get(this.apiurl + '/api/ReportMetadata/exelReports');
  }

  public exportReport(groupId, reportId) {
    const header = {
      headers: new HttpHeaders()
        .set('responseType', 'blob')
        .set('observe', 'response')
    };

    return this.apiClient.get('https://api.powerbi.com/v1.0/myorg/groups/' + groupId + '/reports/' + reportId + '/Export',
      { responseType: 'blob' });
  }


  public exportMyReport(reportId) {
    const header = {
      headers: new HttpHeaders()
        .set('responseType', 'blob')
        .set('observe', 'response')
    };

    return this.apiClient.get('https://api.powerbi.com/v1.0/myorg/reports/' + reportId + '/Export',
      { responseType: 'blob' });
  }
  public getUserWorkspace(userVpu) {
    return this.apiClient.get(this.apiurl + '/api/ReportMetadata/userWorkspace?userVpu=' + userVpu);
  }

  public getEmbedToken() {
    return this.apiClient.get(this.apiurl + '/api/PowerBIRS/embedToken');
  }
  public getPowerBIReportsInfo() {
    return this.apiClient.get(this.apiurl + '/api/ReportMetadata/powerBIReports');
  }
  public getStandardReportsInfo() {
    return this.apiClient.get(this.apiurl + '/api/ReportMetadata/standardReports');
  }

  public getMyReports() {
    return this.apiClient.get('https://api.powerbi.com/v1.0/myorg/reports');

  }

  public getReportsInGroup(groupName) {

    return this.apiClient.get('https://api.powerbi.com/v1.0/myorg/groups/' + groupName + '/reports');
  }
  public getReportInGroup(groupName, reportId) {

    return this.apiClient.get('https://api.powerbi.com/v1.0/myorg/groups/' + groupName + '/reports/' + reportId)
      .pipe(catchError(this.handleError));
  }

  public getDashboardInGroup(groupName, dashboardId) {

    return this.apiClient.get('https://api.powerbi.com/v1.0/myorg/groups/' + groupName + '/dashboards/' + dashboardId);
  }

  public getTileInGroup(groupName, dashboardId, tileId) {

    return this.apiClient.get('https://api.powerbi.com/v1.0/myorg/groups/' + groupName + '/dashboards/' + dashboardId + '/tiles/' + tileId);
  }

  public saveToFavs(data, groupName, reportId) {

    // tslint:disable-next-line:max-line-length
    return this.apiClient.post('https://api.powerbi.com/v1.0/myorg/groups/' + groupName + '/reports/' + reportId + '/Clone', data);

  }

  public publishToEDC(data) {
    return this.apiClient.post(this.edcApiUrl + '/inbound/addvisualization', data);
  }

  public shareToVpu(data, reportId) {

    // tslint:disable-next-line:max-line-length
    return this.apiClient.post('https://api.powerbi.com/v1.0/myorg/reports/' + reportId + '/Clone', data);

  }


  public deleteReport(reportId) {

    return this.apiClient.delete('https://api.powerbi.com/v1.0/myorg/reports/' + reportId);

  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.errorMessage = errorMessage;
    return throwError(errorMessage);
  }
}
