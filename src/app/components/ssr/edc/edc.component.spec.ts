import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdcComponent } from './edc.component';

describe('EdcComponent', () => {
  let component: EdcComponent;
  let fixture: ComponentFixture<EdcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
