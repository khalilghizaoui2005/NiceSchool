import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user: any = {};
  errormsg: String = "";

  constructor(
    private uService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  login() {
    console.log('Form submitted:', this.user);

    if (this.router.url === "/loginParent") {
      this.uService.loginParent(this.user).subscribe(
        (res) => {
          if (res.msg === "welecome") {
            sessionStorage.setItem("token", res.user);

            Swal.fire({
              icon: 'success',
              title: 'Welcome!',
              text: 'Login successful',
              showConfirmButton: false,
              timer: 1500
            });

            this.router.navigate([""]);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res.msg
            });
          }
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Please try again later.'
          });
        }
      );
    } else {
      this.uService.login(this.user).subscribe(
        (response) => {
          console.log("here is response login", response);

          if (response.msg === "welecome") {
            sessionStorage.setItem("token", response.user); // أو response.token حسب backend

            let decodedToken: any = jwtDecode(response.user); // أو response.token
            console.log("decodedToken", decodedToken);

            Swal.fire({
              icon: 'success',
              title: 'Welcome ' + decodedToken.firstName + '!', // عدل الاسم
              text: 'Login successful',
              showConfirmButton: false,
              timer: 1500
            });

            if (decodedToken.role === "student") {
              this.router.navigate(["dashbordStudent"]);
            } else if (decodedToken.role === "teacher") {
              this.router.navigate(["dashbordTeacher"]);
            } else if (decodedToken.role === "admin") {
              this.router.navigate(["dashbordAdmin"]);
            }
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.msg
            });
          }
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Please try again later.'
          });
        }
      );
    }
  }

}
