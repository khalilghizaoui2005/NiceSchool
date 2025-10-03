import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from 'src/app/services/classe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classe-table',
  templateUrl: './classe-table.component.html',
  styleUrls: ['./classe-table.component.css']
})
export class ClasseTableComponent implements OnInit {
  classeTab: any = [];
  id!: any;
  idC!: any;
  is = true;
  constructor(
    private classeService: ClasseService,
    private router: Router,
    private actv: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.router.url == "/dashbordAdmin") {
      this.classeService.getAllClasse().subscribe(
        (docs) => {
          console.log("here is all classe", docs);
          this.classeTab = docs.tab;

        }
      )
    }
    else {
      this.is = false;
      this.id = this.actv.snapshot.paramMap.get('id');
      this.classeService.getClasse(this.id).subscribe(
        (docs) => {
          console.log("here is classe", docs.tab);
          this.classeTab = docs.tab

        }
      )
    }

  }
  goToStudentList(id: string) {
    this.router.navigate(["studentsList/" + id]);
  }
  goToStudentListT(id: string) {
    this.idC = this.actv.snapshot.paramMap.get('idC');
    this.router.navigate(["studentsList/" + id + "/" + this.idC]);
  }
  goToCoursesList(id: string) {
    this.router.navigate(["coursesList/" + id])
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
  goToEditClasse(id: string) {
    this.router.navigate(["editClasse/" + id])
  }
}

