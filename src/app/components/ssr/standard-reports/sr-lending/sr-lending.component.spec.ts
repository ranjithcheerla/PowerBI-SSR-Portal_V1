import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrLendingComponent } from './sr-lending.component';

describe('SrLendingComponent', () => {
  let component: SrLendingComponent;
  let fixture: ComponentFixture<SrLendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrLendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrLendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
