import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTelForm!: FormGroup
  coursTab: any = [];
  search: any = {}
  constructor(
    private coursService: CoursService,
    private uService: UserService,
  ) { }

  ngOnInit(): void {
    this.coursService.getAllCours().subscribe(
      (docs) => {
        console.log("here is all cours", docs.tab);
        this.coursTab = docs.tab;

      }
    )
  }
  searchResults: any[] = [];

  searchChild(tel: string) {
    console.log("here is tel,",tel);
    
    this.uService.getStudentEvalByTel(tel).subscribe(
      (res) => {
        console.log("Evaluations:", res.evaluations);
        this.searchResults = res.evaluations;
      },
      (err) => {
        console.error(err);
      }
    );
  }


}
