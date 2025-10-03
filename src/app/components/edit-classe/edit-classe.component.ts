import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from 'src/app/services/classe.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-classe',
  templateUrl: './edit-classe.component.html',
  styleUrls: ['./edit-classe.component.css']
})
export class EditClasseComponent implements OnInit {
  classe: any = {};
  id: any;
  constructor(
    private cService: ClasseService,
    private router: Router,
    private actv: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.actv.snapshot.paramMap.get("id");
    this.cService.getClasseById(this.id).subscribe(
      (res) => {
        this.classe = res.doc; 
      },
      (err) => console.error(err)
    );
  }

  editClasse() {
    this.cService.editClasse(this.classe).subscribe(
      (res) => {
        if (res.msg) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Classe updated successfully!',
            confirmButtonColor: '#28a745'
          }).then(() => this.router.navigate(['/dashbordAdmin']));
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update classe!'
          });
        }
      },
      (err) => {
        console.error(err);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Server error!' });
      }
    );
  }


}
