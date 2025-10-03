import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordStudentComponent } from './dashbord-student.component';

describe('DashbordStudentComponent', () => {
  let component: DashbordStudentComponent;
  let fixture: ComponentFixture<DashbordStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
