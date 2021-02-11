import { Component, OnInit, Input } from '@angular/core';
import { PowerbirestService } from 'app/services/powerbirest.service';
import { IReportInfo } from 'app/models/ReportInfo.model';


@Component({
  selector: 'app-excel-reports',
  templateUrl: './excel-reports.component.html',
  styleUrls: ['./excel-reports.component.scss']
})
export class ExcelReportsComponent implements OnInit {

  @Input() busArea: string;
  excelReports: any;
  constructor(private _powerBiClient: PowerbirestService) { }

  ngOnInit(): void {

    this._powerBiClient.getExcelReportsForBusArea(this.busArea).subscribe(data => {

      this.excelReports = data;

    });

  }
}
