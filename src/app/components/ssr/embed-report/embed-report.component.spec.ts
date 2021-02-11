import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedReportComponent } from './embed-report.component';

describe('EmbedReportComponent', () => {
  let component: EmbedReportComponent;
  let fixture: ComponentFixture<EmbedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
