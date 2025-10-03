import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursTableStudentComponent } from './cours-table-student.component';

describe('CoursTableStudentComponent', () => {
  let component: CoursTableStudentComponent;
  let fixture: ComponentFixture<CoursTableStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursTableStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursTableStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
