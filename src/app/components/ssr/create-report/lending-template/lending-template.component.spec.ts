import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingTemplateComponent } from './lending-template.component';

describe('LendingTemplateComponent', () => {
  let component: LendingTemplateComponent;
  let fixture: ComponentFixture<LendingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendingTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LendingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
