import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalnavComponent } from './globalnav.component';

xdescribe('GlobalnavComponent', () => {
  let component: GlobalnavComponent;
  let fixture: ComponentFixture<GlobalnavComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GlobalnavComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
