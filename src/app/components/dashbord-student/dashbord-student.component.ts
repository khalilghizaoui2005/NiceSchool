import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { EvaluationService } from 'src/app/services/evaluation.service';

@Component({
  selector: 'app-dashbord-student',
  templateUrl: './dashbord-student.component.html',
  styleUrls: ['./dashbord-student.component.css']
})
export class DashbordStudentComponent implements OnInit {

  constructor(
    private evalService: EvaluationService,
  ) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem("token");

    if (token) {
      let decoded: any = jwtDecode(token);
      console.log("here is user login id", decoded.id);
      this.evalService.compareEvalCours(decoded.classeId, decoded.id).subscribe(
        (response) => {
          console.log("here is compare eval and cours");
          if (response.result) {
            this.evalService.calculMoy(decoded.id).subscribe(
              (response1) => {
                console.log("here is moyenne", response1.moyenne);
              }
            )
          }

        }
      )

    }

  }
}
