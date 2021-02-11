import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelReportsComponent } from './excel-reports.component';

describe('ExcelReportsComponent', () => {
  let component: ExcelReportsComponent;
  let fixture: ComponentFixture<ExcelReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
