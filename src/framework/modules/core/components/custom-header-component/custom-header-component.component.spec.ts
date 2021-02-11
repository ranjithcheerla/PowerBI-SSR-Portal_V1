import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomHeaderComponentComponent } from './custom-header-component.component';

xdescribe('CustomHeaderComponentComponent', () => {
  let component: CustomHeaderComponentComponent;
  let fixture: ComponentFixture<CustomHeaderComponentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CustomHeaderComponentComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomHeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
