import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {
  signupAdminForm!: FormGroup
  user: any = {}
  constructor(
    private uService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.uService.addAdmin(this.user).subscribe(
      (response) => {
        console.log("here is response admin signup", response.msg);
        if (response.msg == "Add with success") {
          Swal.fire({
            title: 'Success!',
            text: 'You have signed up successfully 🎉',
            icon: 'success',
            confirmButtonText: 'Great!',
            confirmButtonColor: '#38f9d7',
            background: '#f0fff4',
            timer: 2500,
            timerProgressBar: true
          });
          this.router.navigate(["/dashbordAdmin"]);


        }

      }
    )

  }

}
