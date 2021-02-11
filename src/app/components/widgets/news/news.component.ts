import { WidgetOutput } from '@framework/core/models';
import { Api } from '@framework/services/api.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  initialized = false;
  newsItems: any[] = [];

  url = `https://onespaceqa.worldbank.org/portal/mobile/search/getIntranetContent.html?type=KIOSK&rowCount=5`;

  // Holds the widget configuration.
  @Input() widgetconfig;

  // Trigger this, to hide the loader after loading the data / response from Ajax call.
  @Output() hideLoader = new EventEmitter();

  // Trigger data to the header part of the widget to show extra information.
  // Ex 1: To show the count of items displayed next to the widget title.
  @Output() widgetOutput = new EventEmitter<WidgetOutput>();
  constructor(private api: Api) {}

  ngOnInit() {
    this.hideLoading();
  }

  hideLoading() {
    this.hideLoader.emit();
  }
}
