import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  usersTab: any = [];

  constructor(
    private uService: UserService,
    private router: Router,
    private coursService: CoursService,
  ) { }

  ngOnInit(): void {
    this.uService.getAllTeacher().subscribe(
      (docs) => {
        console.log("here is all teacher tab", docs.tab);
        this.usersTab = docs.tab;

      }
    )
  }
  viewCv(cv: string) {
    if (cv) {
      window.open("http://localhost:3000/cvs/" + cv);
    }
  }
  valideTeacher(id: string) {
    this.uService.valideTeacher(id).subscribe(
      (response) => {
        console.log("here is response valide Teacher", response.msg);
        if (response.msg == "Modifier with success") {
          this.uService.getAllTeacher().subscribe(
            (docs) => {
              console.log("here is all teachers", docs.tab);
              this.usersTab = docs.tab;
            }
          )
        }


      }
    )

  }
  goToEdit(id: string) {
    this.router.navigate(["editUser/" + id]);
  }
  goToCoursesList(id: string) {
    this.router.navigate(["coursesTeacher/" + id])
  }

  deleteTeacher(id: string) {
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
