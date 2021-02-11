import { Component, OnInit } from '@angular/core';
import { Header } from '@framework/models/header.model';
import { FrameworkService } from '@framework/services/framework.service';
import { FWRoot } from '@framework/core/base/FWRoot';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends FWRoot implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, public fwService: FrameworkService) {
    super(activatedRoute, fwService);
  }

  shareData = [
    {
      'title': 'Forecasting',
      'desc': 'Apply predictive forecasting to determine possible trends in the future.'
    },
    {
      'title': 'Forecasting',
      'desc': 'Apply predictive forecasting to determine possible trends in the future.'
    },
    {
      'title': 'Forecasting',
      'desc': 'Apply predictive forecasting to determine possible trends in the future.'
    },
    {
      'title': 'Forecasting',
      'desc': 'Apply predictive forecasting to determine possible trends in the future.'
    }
  ];


  ngOnInit() {

    const header: Header = {
      title: 'Data & Analytics',
      addWidget: false,
      resetWidget: false,
      addPages: false,
      breadcrumb: [{ label: 'Home', path: '' }]
    };

    this.fwService
      .apiToggleLeftNav(false)
      .apiSetHeader(header)
      .apiToggleHeaderControls({ settings: true, actions: true })
      .apiToggleSplashScreen(false);
  }
}
