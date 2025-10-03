import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;
  user: any = {};
  id: any;
  errorMsg = "";

  constructor(
    private uService: UserService,
    private router: Router,
    private actv: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.actv.snapshot.paramMap.get("id");
    this.uService.getUserById(this.id).subscribe(
      (doc) => {
        console.log("here is user by id", doc.userObj);
        this.user = doc.userObj;

      }
    )

  }
  editUser() {
    this.uService.editUser(this.user).subscribe(
      (response) => {
        if (response.msg) {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Utilisateur modifié avec succès!',
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
  }
}
