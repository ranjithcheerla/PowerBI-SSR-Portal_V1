import { Component, OnInit } from '@angular/core';
import { ILabelValue } from '../../models/corefw-insights.model';
import { CfwinsightsService } from './cfwinsights.service';

@Component({
  selector: 'app-corefw-insights',
  templateUrl: './corefw-insights.component.html',
  styleUrls: ['./corefw-insights.component.scss']
})
export class CorefwInsightsComponent implements OnInit {
  corefwInsights: Array<ILabelValue>;
  constructor(private cfwInsightsService: CfwinsightsService) {}

  ngOnInit(): void {
    this.corefwInsights = this.cfwInsightsService.getAppDetails();
  }
}
