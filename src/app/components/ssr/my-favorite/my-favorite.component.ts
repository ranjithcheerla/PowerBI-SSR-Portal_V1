import { Component, OnInit, Inject, HostListener, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FWRoot } from '@framework/core/base/FWRoot';
import { Header } from '@framework/models/header.model';
import { FrameworkService } from '@framework/services/framework.service';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrls: ['./my-favorite.component.scss']
})
export class MyFavoriteComponent extends FWRoot implements OnInit {
  constructor(public activatedRoute: ActivatedRoute, public fwService: FrameworkService, private renderer: Renderer2) {
    super(activatedRoute, fwService);
    this.getRowHeight = function (params) {
      return 40;
    };
    this.headerHeight = 42;
  }
  getRowHeight;
  headerHeight;
  defaultColDef;
  mode = 'list';
  favmode = 'card';


  // tslint:disable-next-line:member-ordering
  cardData = [
    {
      name: 'L1.9.4 Lending Outliers',
      bline: 'Operations',
      barea: 'Lending',
      createdate: 'May 05, 2020 at 11:38 AM'
    },
    {
      name: 'L1.9.4 Lending Outliers',
      bline: 'Operations',
      barea: 'Lending',
      createdate: 'May 05, 2020 at 11:38 AM'
    },
    {
      name: 'L1.9.4 Lending Outliers',
      bline: 'Operations',
      barea: 'Lending',
      createdate: 'May 05, 2020 at 11:38 AM'
    },
    {
      name: 'L1.9.4 Lending Outliers',
      bline: 'Operations',
      barea: 'Lending',
      createdate: 'May 05, 2020 at 11:38 AM'
    },
    {
      name: 'L1.9.4 Lending Outliers',
      bline: 'Operations',
      barea: 'Lending',
      createdate: 'May 05, 2020 at 11:38 AM'
    },
    {
      name: 'L1.9.4 Lending Outliers',
      bline: 'Operations',
      barea: 'Lending',
      createdate: 'May 05, 2020 at 11:38 AM'
    },
    {
      name: 'L1.9.4 Lending Outliers',
      bline: 'Operations',
      barea: 'Lending',
      createdate: 'May 05, 2020 at 11:38 AM'
    },
    {
      name: 'L1.9.4 Lending Outliers',
      bline: 'Operations',
      barea: 'Lending',
      createdate: 'May 05, 2020 at 11:38 AM'
    }
  ];

  // tslint:disable-next-line:member-ordering
  columnDefs = [
    {
      field: 'requesttype', headerName: 'Name', cellRenderer: function (params) {
        return '<a href="javascript:;">' + params.value + '</a>';
      }, width: 500
    },
    { field: 'bline', headerName: 'Business Line', width: 200 },

    {
      field: 'barea', headerName: 'Business Area', width: 200
    },
    {
      field: 'createdate', headerName: 'Created on', width: 300
    }
  ];

  rowData = [
    {
      requesttype: 'L1.9.4 Lending Outliers',
      bline: 'Operations',
      barea: 'Lending',
      createdate: '05/05/2020 11:38 AM'
    },
    {
      requesttype: 'Niger Investment Climate Support',
      bline: 'Resource Management',
      barea: 'Lending',
      createdate: '05/05/2020 11:38 AM'
    },
    {
      requesttype: 'Guinea Project for Results in Early Childhood and Basic Education',
      bline: 'Human Resource',
      barea: 'Lending',
      createdate: '05/05/2020 11:38 AM'
    },
    {
      requesttype: 'Kenya Social and Economic Inclusion Project',
      bline: 'Trust Funds',
      barea: 'Lending',
      createdate: '05/05/2020 11:38 AM'
    },
    {
      requesttype: 'Niger Investment Climate Support',
      bline: 'Resource Management',
      barea: 'Lending',
      createdate: '05/05/2020 11:38 AM'
    },
    {
      requesttype: 'Guinea Project for Results in Early Childhood and Basic Education',
      bline: 'Human Resource',
      barea: 'Lending',
      createdate: '05/05/2020 11:38 AM'
    },
    {
      requesttype: 'Kenya Social and Economic Inclusion Project',
      bline: 'Trust Funds',
      barea: 'Lending',
      createdate: '05/05/2020 11:38 AM'
    }

  ];

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'siteinfo-fullbg');

    this.fwService.apiToggleLeftNav(false);
    const header: Header = {
      title: 'My Reports',
      addWidget: false,
      resetWidget: false,
      addPages: false,
      breadcrumb: [{ label: 'Home', path: '/home' }, { label: 'My Reports', path: '' }]
    };
    this.fwService.apiSetHeader(header);
    this.fwService.apiToggleHeaderControls({ search: true, settings: true, actions: true });
    this.fwService.apiToggleSiteInfo(true);

    setTimeout(() => {
      this.fwService.apiToggleSplashScreen(false);
    }, 0);

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'siteinfo-fullbg');
  }
}








// import { Component, OnInit, ViewChild } from '@angular/core';
// import { Header } from '@framework/models/header.model';
// import { FrameworkService } from '@framework/services/framework.service';
// import { FWRoot } from '@framework/core/base/FWRoot';
// import { ActivatedRoute, Router } from '@angular/router';
// import { TabsetComponent } from 'ngx-bootstrap/tabs';
// import { PowerbirestService } from './../../../services/powerbirest.service';
// @Component({
//   selector: 'app-my-favorite',
//   templateUrl: './my-favorite.component.html',
//   styleUrls: ['./my-favorite.component.scss']
// })

// export class MyFavoriteComponent extends FWRoot implements OnInit {
//   @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
//   constructor(public activatedRoute: ActivatedRoute, public fwService: FrameworkService, private router: Router,
//     private _powerBiClient: PowerbirestService) {
//     super(activatedRoute, fwService);
//   }
//   searchTerm: any;
//   isListFullScreen: any;
//   doserach(searchItem) {

//   }
//   toggleFullScreen() {

//   }
//   openCreateReport() {

//     this._powerBiClient.selectedCreateRpt = null;
//     this.router.navigate(['/create-report']);
//   }
//   ngOnInit(): void {
//     this.fwService.apiToggleLeftNav(true);

//     const header: Header = {
//       title: '',
//       addWidget: false,
//       resetWidget: false,
//       addPages: false,
//       breadcrumb: [{ label: 'Home', path: '' }]
//     };
//     this.fwService.apiSetHeader(header);

//     this.fwService.apiToggleHeaderControls({ settings: false, actions: false });
//     setTimeout(() => {
//       this.fwService.apiToggleSplashScreen(false);
//     }, 0);
//   }
//   // tslint:disable-next-line:use-life-cycle-interface
//   ngAfterViewInit(): void {
//     this.staticTabs.tabs[0].active = true;
//   }
// }
