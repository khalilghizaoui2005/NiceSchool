import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-cours-table-student',
  templateUrl: './cours-table-student.component.html',
  styleUrls: ['./cours-table-student.component.css']
})
export class CoursTableStudentComponent implements OnInit {
  coursTab: any = [];
  id!: any
  constructor(
    private coursService: CoursService,
  ) { }

  ngOnInit(): void {

    let token = sessionStorage.getItem("token");
    if (token) {
      let decoded: any = jwtDecode(token);
      this.coursService.getCoursStudent(decoded.classeId).subscribe(
        (docs) => {
          console.log("here is courses from classe", docs.tab);
          this.coursTab = docs.tab;

        }
      )
    }
  }

}
