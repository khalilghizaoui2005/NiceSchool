import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isStudent = false;
  isTeacher = false;
  isParent = false;
  isAdmin = false;
  isNotCon = false;
  user: any = {};
  notifications: any[] = [];
  showNotifications = false;

  constructor(private router: Router,
    private nService: NotificationService
  ) { }

 ngOnInit(): void {
  this.loadUser();
  
  // Reload notifications on every route change
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.loadUser();
    }
  });
}


  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
  loadUser() {
  let token = sessionStorage.getItem("token");
  if (token) {
    const decoded: any = jwtDecode(token);
    this.user = decoded;

    // Role flags
    this.isStudent = decoded.role === "student";
    this.isTeacher = decoded.role === "teacher";
    this.isParent = decoded.role === "parent";
    this.isAdmin = decoded.role === "admin";
    this.isNotCon = false;

    // Load notifications
    this.nService.getNotifications(decoded.role).subscribe(
      (res: any) => this.notifications = res,
      err => console.error(err)
    );
  } else {
    this.isStudent = this.isTeacher = this.isParent = this.isAdmin = false;
    this.isNotCon = true;
    this.notifications = [];
  }
}


  checkRole() {
    this.isStudent = false;
    this.isTeacher = false;
    this.isParent = false;
    this.isAdmin = false;
    this.isNotCon = false;

    let token = sessionStorage.getItem("token");
    if (token) {
      let decoded: any = jwtDecode(token);
      this.user = decoded
      if (decoded.role == "student") {
        this.isStudent = true;
      } else if (decoded.role == "teacher") {
        this.isTeacher = true;
      } else if (decoded.role == "parent") {
        this.isParent = true;
      }
      if (decoded.role == "admin") {
        this.isAdmin = true;
      }
    } else {
      this.isNotCon = true;
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(["login"]);
  }
  goToEdit() {
    this.router.navigate(["/editUser/" + this.user.id]);
  }
  goToNot(){
    this.router.navigate(["userNot"])
  }
}
