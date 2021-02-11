import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserPreferenceService } from '../../services/userpreference.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { App } from '../../models/launcher.model';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-globalnav',
  templateUrl: './globalnav.component.html',
  styleUrls: ['./globalnav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate(200, style({ opacity: 1 }))]),
      transition(':leave', [animate(200, style({ opacity: 0 }))])
    ])
  ],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class GlobalnavComponent implements OnInit {
  _showAllApps = false;
  showLauncher = true;
  launcherApps: App[] = [];
  favApps: App[] = [];
  filteredApps: App[] = [];
  customApps: App[] = this?.configService?.config?.appConfig?.customLauncherApps ?? [];
  @Input() launcher: boolean;
  @Output() globalNavStatus = new EventEmitter<boolean>();
  constructor(private userPreferenceService: UserPreferenceService, private configService: ConfigurationService) {}

  ngOnInit() {
    const launcherApps = [...this.userPreferenceService.getLauncherApps(), ...this.customApps];
    this.showLauncher = launcherApps.length > 0;
    this.launcherApps = launcherApps || [];
    this.favApps = this.launcherApps.filter(app => app.isFavorite);
    this.filteredApps = this.launcherApps;
  }

  searchApps(searchTxt: string) {
    const apps = this.launcherApps;
    this.filteredApps = apps.filter(app => {
      return app.appName.toLowerCase().indexOf(searchTxt.toLowerCase()) > -1;
    });
  }

  toggleAppsView() {
    this._showAllApps = !this._showAllApps;
    this.filteredApps = this.launcherApps;
  }

  public enableGlobalNav(value: boolean) {
    this.globalNavStatus.emit(value);
  }
}
