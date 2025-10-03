import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cours-table',
  templateUrl: './cours-table.component.html',
  styleUrls: ['./cours-table.component.css']
})
export class CoursTableComponent implements OnInit {
  coursTab: any[] = [];
  id!: string | null;
  isCours = true;
  isTeacher = true;
  isStudents = false;

  constructor(
    private cService: CoursService,
    private router: Router,
    private actv: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const url = this.router.url;

    if (url === "/dashbordAdmin") {
      this.cService.getAllCours().subscribe((docs) => {
        console.log("here is all cours", docs);
        this.coursTab = docs.tab;
      });

    } else if (url === "/dashbordTeacher") {
      this.isCours = true;
      this.isTeacher = false;
      this.isStudents = true;

      const token = sessionStorage.getItem("token");
      if (token) {
        const decoded: any = jwtDecode(token);
        console.log("here is teacher login id", decoded.id);

        this.cService.getCoursTeacher(decoded.id).subscribe((docs) => {
          console.log("here is all cours from teacher", docs);
          this.coursTab = docs.tab || [];
        });

      } else {
        console.log("No token found in sessionStorage");
        this.router.navigate(["/login"]);
      }

    } else {
      this.isTeacher = false;
      this.isCours = false;
      this.id = this.actv.snapshot.paramMap.get('id');

      if (this.id) {
        this.cService.getCoursTeacher(this.id).subscribe((docs) => {
          console.log("here is all cours from teacher", docs);
          this.coursTab = docs.tab || [];
        });
      }
    }
  }

  goToClasseList(id: string) {
    this.router.navigate(["classeList", id]);
  }

  goToClasseListT(id: any, idC: string) {
    const classeId = typeof id === 'object' ? id._id : id;

    if (!classeId || !idC) {
      console.error("⛔ classeCoursId or coursId is undefined!");
      return;
    }

    this.router.navigate(["classeTable", classeId, idC]);
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
        this.cService.deleteCours(id).subscribe((res) => {
          if (res.msg) {
            this.coursTab = this.coursTab.filter(c => c._id !== id);
            Swal.fire('Deleted!', 'The course has been deleted.', 'success');
          }
        });
      }
    });
  }
  goToEditCours(id: string) {
    this.router.navigate(["editCours/" + id]);
  }
}


