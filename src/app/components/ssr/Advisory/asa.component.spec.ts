import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsaComponent } from './asa.component';

describe('AsaComponent', () => {
  let component: AsaComponent;
  let fixture: ComponentFixture<AsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
