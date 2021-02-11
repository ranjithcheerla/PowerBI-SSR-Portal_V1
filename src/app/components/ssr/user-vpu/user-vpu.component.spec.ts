import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVpuComponent } from './user-vpu.component';

describe('UserVpuComponent', () => {
  let component: UserVpuComponent;
  let fixture: ComponentFixture<UserVpuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVpuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
