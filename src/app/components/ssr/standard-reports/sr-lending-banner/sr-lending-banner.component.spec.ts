import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrLendingBannerComponent } from './sr-lending-banner.component';

describe('SrLendingBannerComponent', () => {
  let component: SrLendingBannerComponent;
  let fixture: ComponentFixture<SrLendingBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrLendingBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrLendingBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
