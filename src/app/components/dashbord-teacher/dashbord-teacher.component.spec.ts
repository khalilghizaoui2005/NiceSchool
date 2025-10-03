import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordTeacherComponent } from './dashbord-teacher.component';

describe('DashbordTeacherComponent', () => {
  let component: DashbordTeacherComponent;
  let fixture: ComponentFixture<DashbordTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
