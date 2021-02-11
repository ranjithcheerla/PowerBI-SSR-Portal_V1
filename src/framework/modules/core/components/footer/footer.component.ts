import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { SitePreferenceService } from '../../services/sitepreference.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit, AfterViewInit {
  bottomJson: any = {};
  constructor(
    private sitePrefService: SitePreferenceService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this.bottomJson = this.sitePrefService.getFooterData();
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }
}
