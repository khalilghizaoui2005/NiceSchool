import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from 'src/app/services/classe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classe-list',
  templateUrl: './classe-list.component.html',
  styleUrls: ['./classe-list.component.css']
})
export class ClasseListComponent implements OnInit {
  classeTab: any = [];
  id!: any;
  constructor(
    private actv: ActivatedRoute,
    private classeService: ClasseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.actv.snapshot.paramMap.get('id');
    this.classeService.getClasse(this.id).subscribe(
      (docs) => {
        console.log("here is classe from cours", docs.tab);
        this.classeTab = docs.tab;

      }
    )

  }
  goToStudentList(id: string) {
    this.router.navigate(["studentsList/" + id]);
  }
  deleteClasse(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Deleting this class will remove it and its relations!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.classeService.delteClasse(id).subscribe((res) => {
          if (res.msg) {
            this.classeTab = this.classeTab.filter((c: any) => c._id !== id);
            Swal.fire('Deleted!', 'The class has been deleted.', 'success');
          } else {
            Swal.fire('Error!', 'Something went wrong.', 'error');
          }
        });
      }
    });
  }

}
