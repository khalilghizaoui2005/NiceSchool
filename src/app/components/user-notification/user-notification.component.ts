import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.css']
})
export class UserNotificationComponent implements OnInit {
  notifications: any[] = [];
  role = "student"; // هنا تقدر تجيب الدور من الـ session أو JWT

  constructor(private notifService: NotificationService) { }

  ngOnInit(): void {
    this.notifService.getNotifications(this.role).subscribe((res: any) => {
      console.log("Notifications fetched:", res);
      this.notifications = res; // ✅ هنا صح
    }, err => {
      console.error("Error fetching notifications", err);
    });
  }
}
