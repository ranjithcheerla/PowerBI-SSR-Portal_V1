import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSpinnerComponent } from './page-spinner.component';

describe('PageSpinnerComponent', () => {
  let component: PageSpinnerComponent;
  let fixture: ComponentFixture<PageSpinnerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PageSpinnerComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
