import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
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
  mobileMenuOpen = false;

  constructor(private router: Router, private nService: NotificationService) { }

  ngOnInit(): void {
    this.loadUser();
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) this.loadUser();
    });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  loadUser() {
    const token = sessionStorage.getItem("token");
    if(token){
      const decoded: any = jwtDecode(token);
      this.user = decoded;
      this.isStudent = decoded.role==="student";
      this.isTeacher = decoded.role==="teacher";
      this.isParent = decoded.role==="parent";
      this.isAdmin = decoded.role==="admin";
      this.isNotCon = false;
    } else {
      this.isStudent = this.isTeacher = this.isParent = this.isAdmin = false;
      this.isNotCon = true;
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(["login"]);
  }

  goToEdit() {
    this.router.navigate(["/editUser/"+this.user.id]);
  }
}
