import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CoursService } from 'src/app/services/cours.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  addNoteForm!: FormGroup;
  idC!: any;
  id!: any;
  noteEmoji: string = '🙂';
  noteColor: string = '#2c3e50';
  student: any = {};
  nameCours!: string;

  constructor(
    private fb: FormBuilder,
    private coursService: CoursService,
    private uService: UserService,
    private evalService: EvaluationService,
    private actv: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addNoteForm = this.fb.group({
      note: [10, [Validators.required, Validators.min(0), Validators.max(20)]],
      eval: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.addNoteForm.get('note')?.valueChanges.subscribe((val: number) => {
      if (val == null) return;

      if (val > 20) val = 20;
      if (val < 0) val = 0;

      if (val !== this.addNoteForm.get('note')?.value) {
        this.addNoteForm.get('note')?.setValue(val, { emitEvent: false });
      }

      if (val < 5) {
        this.noteEmoji = '😡';
        this.noteColor = 'red';
      } else if (val < 10) {
        this.noteEmoji = '😢';
        this.noteColor = 'orange';
      } else if (val < 15) {
        this.noteEmoji = '🙂';
        this.noteColor = '#2c3e50';
      } else if (val < 18) {
        this.noteEmoji = '😃';
        this.noteColor = 'green';
      } else {
        this.noteEmoji = '😍';
        this.noteColor = '#0f9d58';
      }
    });

    this.idC = this.actv.snapshot.paramMap.get('idC');
    this.coursService.getCoursName(this.idC).subscribe(
      (response) => this.nameCours = response.name
    );

    this.id = this.actv.snapshot.paramMap.get('id');
    this.uService.getStudentById(this.id).subscribe(
      (doc) => this.student = doc.userObj
    );
  }

  saveNote(classeId: any) {
    console.log("Note:", this.addNoteForm.get('note')?.value);
    console.log("Evaluation:", this.addNoteForm.get('eval')?.value);
    let token = sessionStorage.getItem("token");

    if (token) {
      let decoded: any = jwtDecode(token);
      console.log("here is user login id", decoded.id);
      const obj = {
        note: this.addNoteForm.value.note,
        eval: this.addNoteForm.value.eval,
        coursId: this.idC,
        teacherId: decoded.id,
        studentId: this.id,
        classeId: classeId,
      }

      this.evalService.addEval(obj).subscribe(
        (response) => {
          if (response.msg == "Evaluation added successfully") {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Evaluation added successfully!',
              confirmButtonColor: '#28a745'
            }).then(() => {
              this.router.navigate(['/studentsList/' + classeId._id + "/" + this.idC]); // ترجع للجدول
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

    }


  }
}
