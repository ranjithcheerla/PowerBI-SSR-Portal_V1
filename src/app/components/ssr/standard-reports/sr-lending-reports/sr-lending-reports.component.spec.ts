import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrLendingReportsComponent } from './sr-lending-reports.component';

describe('SrLendingReportsComponent', () => {
  let component: SrLendingReportsComponent;
  let fixture: ComponentFixture<SrLendingReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrLendingReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrLendingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
