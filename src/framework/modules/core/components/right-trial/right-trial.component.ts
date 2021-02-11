import { LoggerService } from './../../../core/services/logger.service';
import { AppService } from './../../../core/services/app.service';
import { Component, OnInit, ComponentRef, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-right-trial',
  templateUrl: './right-trial.component.html',
  styleUrls: ['./right-trial.component.scss']
})
export class RightTrialComponent implements OnInit, OnDestroy {
  toggleSetting = false;
  fitScreen = false;
  currentComponent: any;
  rightNavTitle: string;
  outputData = {
    completed: (result: string) => {
      this.logger.log(result);
    }
  };
  destroy$: Subject<boolean> = new Subject<boolean>();
  componentInstance: ComponentRef<any>;
  compInput: any;
  constructor(public appService: AppService, private logger: LoggerService) {}

  ngOnInit() {
    /* Subscribe the rightSide loaded compnent details*/
    this.appService.loadRightNavPage$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.rightNavTitle = data.title;
        this.toggleSetting = data.status === false ? data.status : true;
        this.currentComponent = data.component;
        this.compInput = data.input;
      });

    /* Subscribe the RightNav toggle status */
    this.appService.toggleRightNav$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((status: boolean) => {
        if (status !== undefined) {
          this.toggleSetting = status;
        } else {
          this.toggleSetting = this.toggleSetting === status ? !status : status;
        }
      });
  }

  toggleSettings() {
    this.toggleSetting = !this.toggleSetting;
    if (this.componentInstance) {
      this.componentInstance.destroy();
      this.componentInstance = null;
    }
  }

  componentCreated(compRef: any) {
    this.componentInstance = compRef;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
