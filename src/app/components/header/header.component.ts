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
  isNotCon = true;
  user: any = {};
  notifications: any[] = [];
  showNotifications = false;
  mobileMenuOpen = false; // <--- القائمة للهاتف

  constructor(private router: Router, private nService: NotificationService) {}

  ngOnInit(): void {
    this.loadUser();

    // إعادة تحميل بيانات المستخدم عند تغيير المسار
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadUser();
      }
    });
  }

  loadUser() {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.user = decoded;

      this.isStudent = decoded.role === 'student';
      this.isTeacher = decoded.role === 'teacher';
      this.isParent = decoded.role === 'parent';
      this.isAdmin = decoded.role === 'admin';
      this.isNotCon = false;

      // تحميل الإشعارات
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

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  goToEdit() {
    this.router.navigate(['/editUser/' + this.user.id]);
  }
}
