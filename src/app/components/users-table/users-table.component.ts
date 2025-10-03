import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  usersTab: any = [];
  constructor(
    private uService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.uService.getAllUser().subscribe(
      (docs) => {
        console.log("here is users tab", docs.tab);
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
          this.uService.getAllUser().subscribe(
            (docs) => {
              console.log("here is all users", docs.tab);
              this.usersTab = docs.tab;
            }
          )
        }


      }
    )

  }
  goToEdit(id: string) {
    this.router.navigate(["editUser/"+id]);
  }

}
