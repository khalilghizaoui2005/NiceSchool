import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasseService } from 'src/app/services/classe.service';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-classe',
  templateUrl: './add-classe.component.html',
  styleUrls: ['./add-classe.component.css']
})
export class AddClasseComponent implements OnInit {
  classeForm!: FormGroup;

  // Students
  allStudents: any[] = [];
  filteredStudents: any[] = [];
  selectedStudents: string[] = [];
  studentDropdownOpen = false;

  // Courses
  allCourses: any[] = [];
  filteredCourses: any[] = [];
  selectedCourses: string[] = [];
  dropdownOpenCourses = false;
  add = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private courseService: CoursService,
    private classeService: ClasseService
  ) { }

  ngOnInit(): void {
    this.classeForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
    });

    this.loadStudents();
    this.loadCourses();
  }

  // Students
  loadStudents() {
    this.userService.getAllStudent().subscribe((docs) => {
      this.allStudents = docs.tab;
      this.filteredStudents = [...this.allStudents];
    });
  }

  toggleStudentDropdown() {
    this.studentDropdownOpen = !this.studentDropdownOpen;
  }

  onSearchStudents(event: any) {
    const term = event.target.value.toLowerCase();
    this.filteredStudents = this.allStudents.filter(s =>
      s.firstName.toLowerCase().includes(term) ||
      s.lastName.toLowerCase().includes(term)
    );
  }

  onSelectStudent(studentId: string) {
    if (this.selectedStudents.includes(studentId)) {
      this.selectedStudents = this.selectedStudents.filter(id => id !== studentId);
    } else {
      this.selectedStudents.push(studentId);
    }
  }

  getStudentName(id: string): string {
    const s = this.allStudents.find(st => st._id === id);
    return s ? `${s.firstName} ${s.lastName}` : '';
  }

  // Courses
  loadCourses() {
    this.courseService.getAllCours().subscribe((docs) => {
      this.allCourses = docs.tab;
      this.filteredCourses = [...this.allCourses];
    });
  }

  toggleDropdownCourses() {
    this.dropdownOpenCourses = !this.dropdownOpenCourses;
  }

  onSearchCourses(event: any) {
    const term = event.target.value.toLowerCase();
    this.filteredCourses = this.allCourses.filter(c =>
      c.name.toLowerCase().includes(term)
    );
  }

  onSelectCourse(courseId: string) {
    if (this.selectedCourses.includes(courseId)) {
      this.selectedCourses = this.selectedCourses.filter(id => id !== courseId);
    } else {
      this.selectedCourses.push(courseId);
    }
  }

  getCourseName(id: string): string {
    const c = this.allCourses.find(crs => crs._id === id);
    return c ? c.name : '';
  }

  // Submit
  onSubmit() {
    if (this.classeForm.invalid || this.selectedStudents.length === 0 || this.selectedCourses.length === 0) {
      return;
    }

    const classeData = {
      ...this.classeForm.value,
      students: this.selectedStudents,
      courses: this.selectedCourses
    };

    this.classeService.addClasse(classeData).subscribe((res) => {
      console.log("Classe added:", res.msg);
        if (res.msg == "Add with success") {
               Swal.fire({
                 icon: 'success',
                 title: 'Succès',
                 text: 'Evaluation added successfully!',
                 confirmButtonColor: '#28a745'
               }).then(() => {
               });
             }
             else {
               Swal.fire({
                 icon: 'error',
                 title: 'Erreur',
                 text: 'Échec de la modification!'
               });
             }
    });
  }

}
