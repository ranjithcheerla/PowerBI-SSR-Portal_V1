import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavoriteReportsComponent } from './my-favorite-reports.component';

describe('MyFavoriteReportsComponent', () => {
  let component: MyFavoriteReportsComponent;
  let fixture: ComponentFixture<MyFavoriteReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFavoriteReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFavoriteReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
