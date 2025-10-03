import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  usersTab: any = [];
  id!: any;
  isStudents = true;

  constructor(private router: Router,
    private uService: UserService,
    private actv: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.router.url == "/dashbordAdmin") {
      this.uService.getAllStudent().subscribe(
        (docs) => {
          console.log("here is all students", docs.tab);
          this.usersTab = docs.tab;
          this.isStudents = false;

        }
      )
    }
    else {
      this.id = this.actv.snapshot.paramMap.get('id');
      this.uService.getStudentsClasse(this.id).subscribe(
        (docs) => {
          console.log("here is students classe tab", docs.tab);
          this.usersTab = docs.tab;

        }
      )
    }

  }
  goToEdit(id: string) {
    this.router.navigate(["editUser/" + id]);
  }
  deleteStudent(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.uService.deleteUser(id).subscribe(res => {
          if (res.msg) {
            this.usersTab = this.usersTab.filter((s: any) => s._id !== id);
            Swal.fire(
              'Deleted!',
              'The student has been deleted.',
              'success'
            )
          } else {
            Swal.fire(
              'Error!',
              'Something went wrong.',
              'error'
            )
          }
        })
      }
    })
  }

}
