import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-leaderbord',
  templateUrl: './leaderbord.component.html',
  styleUrls: ['./leaderbord.component.css']
})
export class LeaderbordComponent implements OnInit {
  students: any[] = [];
  currentStudentId: string = '';
  constructor(
    private uService: UserService,
  ) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      this.currentStudentId = decoded.id;

      this.uService.getStudentsClasse(decoded.classeId).subscribe((docs) => {
        this.students = docs.tab || [];

        this.students.sort((a: any, b: any) => Number(b.moyenne) - Number(a.moyenne));

        console.log("students", this.students);
      });
    }
  }
}
