import { Component, OnInit } from '@angular/core';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-cours-student',
  templateUrl: './cours-student.component.html',
  styleUrls: ['./cours-student.component.css']
})
export class CoursStudentComponent implements OnInit {
  coursTab: any[] = [];
  moyenne!: number;

  constructor(
    private evalService: EvaluationService,
    private uService: UserService
  ) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log("here is user login id", decoded.id);

      this.evalService.getEval(decoded.id).subscribe((docs) => {
        this.coursTab = docs.obj;
      });

      this.uService.getStudentById(decoded.id).subscribe((doc) => {
        console.log("here is student", doc.userObj);
        this.moyenne = doc.userObj.moyenne;

        document.documentElement.style.setProperty("--moyenne", this.moyenne.toString());
      });
    }
  }
}
