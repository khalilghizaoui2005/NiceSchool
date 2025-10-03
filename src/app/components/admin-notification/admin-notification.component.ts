import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.css']
})
export class AdminNotificationComponent implements OnInit {
  notificationForm!: FormGroup;
  adminId = "ADMIN_ID_HERE"; 
  constructor(private fb: FormBuilder, private notifService: NotificationService) { }

  ngOnInit(): void {
    this.notificationForm = this.fb.group({
      title: [''],
      message: [''],
      recipients: [[]]
    });
  }

sendNotification() {
  const data = this.notificationForm.value;

  // لو اخترت أول دور فقط
  data.targetRole = data.recipients[0]; 
  delete data.recipients;

  data.adminId = this.adminId;

  this.notifService.addNotification(data).subscribe(res => {
    Swal.fire('Success!', 'Notification sent successfully', 'success');
    this.notificationForm.reset();
  }, err => {
    Swal.fire('Error!', 'Failed to send notification', 'error');
  });
}

}
