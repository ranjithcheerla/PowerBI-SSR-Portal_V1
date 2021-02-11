import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankwideComponent } from './bankwide.component';

describe('BankwideComponent', () => {
  let component: BankwideComponent;
  let fixture: ComponentFixture<BankwideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankwideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankwideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
