import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cours',
  templateUrl: './edit-cours.component.html',
  styleUrls: ['./edit-cours.component.css']
})
export class EditCoursComponent implements OnInit {
  cours: any = {}; 
  teachers: any[] = []; 
  id!: any;
  errorMsg = "";

  constructor(
    private coursService: CoursService,
    private uService: UserService,
    private actv: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = this.actv.snapshot.paramMap.get('id');
    this.coursService.getCoursById(this.id).subscribe(
      (res) => {
        console.log("Cours by id:", res.doc);
        this.cours = res.doc;
      }
    );

    this.uService.getAllTeacher().subscribe(
      (res: any) => {
        this.teachers = res.tab;
      }
    );
  }
  editCours() {
    this.coursService.editCours(this.cours).subscribe(
      (response: any) => {
        if (response.msg) {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Cours modifié avec succès!',
            confirmButtonColor: '#28a745'
          }).then(() => {
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Échec de la modification!'
          });
        }
      }
    );
  }



}
