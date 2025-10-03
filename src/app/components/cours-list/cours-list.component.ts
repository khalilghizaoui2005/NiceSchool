import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.css']
})
export class CoursListComponent implements OnInit {
  coursTab: any = [];
  id!: any
  constructor(
    private coursService: CoursService,
    private actv: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.actv.snapshot.paramMap.get('id');
    this.coursService.getCoursClasse(this.id).subscribe(
      (docs) => {
        console.log("here is courses from classe", docs.tab);
        this.coursTab = docs.tab;

      }
    )
  }
  deleteCours(id: string) {
    Swal.fire({
      title: 'Delete course?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.coursService.deleteCours(id).subscribe((res) => {
          if (res.msg) {
            this.coursTab = this.coursTab.filter((c:any) => c._id !== id);
            Swal.fire('Deleted!', 'The course has been deleted.', 'success');
          }
        });
      }
    });
  }

}
