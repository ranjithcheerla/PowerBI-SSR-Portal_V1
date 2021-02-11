import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullpageStoreComponent } from './fullpage-store.component';

xdescribe('FullpageStoreComponent', () => {
  let component: FullpageStoreComponent;
  let fixture: ComponentFixture<FullpageStoreComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FullpageStoreComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FullpageStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
