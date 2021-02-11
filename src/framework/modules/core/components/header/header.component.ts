import { Component, Input, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { AppService } from './../../../core/services/app.service';
import { UserPreferenceService } from './../../services/userpreference.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter, delay } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  showHeader$: Observable<boolean>;
  showNotification = false;
  notificationMessage = '';
  constructor(private appService: AppService, private renderer: Renderer2, private userPreferenceService: UserPreferenceService) {}

  ngOnInit() {
    this.showHeader$ = this.appService.showHeader$.asObservable().pipe(delay(0));
    const maintenance = this.userPreferenceService.getMaintenanceMessage();
    if (maintenance.display) {
      this.showNotificationMessage(maintenance.message);
    }

    this.appService.maintenanceNotification$
      .pipe(
        delay(0),
        takeUntil(this.destroy$),
        filter(item => item.length > 0)
      )
      .subscribe((message: string) => {
        this.showNotificationMessage(message);
      });
  }

  closeNotify() {
    this.showNotification = false;
    this.renderer.removeClass(document.body, 'notify-open');
  }

  showNotificationMessage(message: string) {
    this.showNotification = true;
    this.renderer.addClass(document.body, 'notify-open');
    this.notificationMessage = message;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
