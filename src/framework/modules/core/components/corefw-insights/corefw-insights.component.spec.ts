import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CfwinsightsService } from './cfwinsights.service';

import { CorefwInsightsComponent } from './corefw-insights.component';

describe('CorefwInsightsComponent', () => {
  let component: CorefwInsightsComponent;
  let fixture: ComponentFixture<CorefwInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorefwInsightsComponent],
      providers: [
        {
          provide: CfwinsightsService,
          useValue: { getAppDetails: () => {} }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorefwInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
