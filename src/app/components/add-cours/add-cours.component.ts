import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent implements OnInit {
  courseForm!: FormGroup;
  teachers: any = [];
  classes: any = [];
  add = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private uService: UserService,
    private cService: CoursService
  ) { }

  ngOnInit(): void {
    this.uService.getAllTeacher().subscribe(
      (docs) => {
        console.log("here is all teacher ", docs.tab);
        this.teachers = docs.tab;
      }
    )
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      teacher: ['', Validators.required],
      coeff: ['', [Validators.required, Validators.min(1), Validators.max(4)]], // ✅ إضافة coff
    });

  }

  onSubmit() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }
    this.cService.addCours(this.courseForm.value).subscribe(
      (response) => {
        if (response.msg == "Add with success") {
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

      }
    )
    console.log('Course Data:', this.courseForm.value);

  }
}
