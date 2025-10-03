import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { telParentValidator } from 'src/app/tel-parent.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;
  userRole!: string;

  imgFile: File | null = null;
  selectedImg: string | null = null;
  imgError: string = '';

  selectedCv: File | null = null;
  cvError: string | null = null;

  progress: number = 0;
  emailError = "Email is required";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private uService: UserService
  ) { }

  ngOnInit(): void {
    if (this.router.url == "/signupStudent") {
      this.userRole = "student";
      this.signupForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        tel: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        address: ['', Validators.required],
        password: ['', Validators.required],
        cnfPass: ['', Validators.required]
      }, { validator: this.passwordMatchValidator });

    } else if (this.router.url == "/signupTeacher") {
      this.userRole = "teacher";
      this.signupForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        tel: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        address: ['', Validators.required],
        speciality: ['', Validators.required],
        password: ['', Validators.required],
        cnfPass: ['', Validators.required],
      }, { validator: this.passwordMatchValidator });

    } else if (this.router.url == "/signupParent") {
      this.userRole = "parent";
      this.signupForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        tel: ['', {
          validators: [Validators.required, Validators.pattern(/^\d{8}$/)],
          asyncValidators: [telParentValidator(this.uService)],
          updateOn: 'blur'
        }],
        address: ['', Validators.required],
        password: ['', Validators.required],
        cnfPass: ['', Validators.required],
      }, { validator: this.passwordMatchValidator });
    }

    this.signupForm.valueChanges.subscribe(() => this.calculateProgress());
  }


  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const cnfPass = form.get('cnfPass')?.value;
    return password === cnfPass ? null : { mismatch: true };
  }

  calculateProgress() {
    let filled = 0;
    const controls = this.signupForm.controls;
    const totalFields = Object.keys(controls).length;

    Object.keys(controls).forEach(key => {
      const control = controls[key];
      if (control.valid && control.value) filled++;
    });

    let totalForProgress = totalFields;

    if (this.userRole === "student") {
      if (this.imgFile) filled++;
      totalForProgress += 1;
    }

    if (this.userRole === "teacher") {
      totalForProgress += 1;
      if (this.selectedCv) filled++;
    }


    this.progress = (filled / totalForProgress) * 100;
  }



  onImgSelected(event: any) {
    this.imgError = '';
    const file = event.target.files[0];

    if (!file) {
      this.imgError = 'Please select an image';
      this.imgFile = null;
      this.selectedImg = null;
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.imgError = 'Only image files are allowed';
      this.imgFile = null;
      this.selectedImg = null;
      return;
    }

    this.imgFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImg = reader.result as string;
      this.calculateProgress();
    };
    reader.readAsDataURL(file);
  }

  onCvSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      this.selectedCv = file;
      this.cvError = null;
      this.calculateProgress();
    } else {
      this.selectedCv = null;
      this.cvError = "Veuillez sélectionner un fichier PDF uniquement.";
    }
  }

  onSubmit() {
    if (this.userRole == "teacher") {
      if (this.selectedCv) {
        this.signupForm.value.role = "teacher";
        this.uService.addUserTeacher(this.signupForm.value, this.selectedCv).subscribe(
          (response) => {
            console.log("teacher response", response.msg);

            if (response.msg == "email already exist") {
              this.signupForm.controls['email'].setErrors({ emailExist: true });
            }
            else if (response.msg == "Add with success") {
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
              this.router.navigate(["login"]);
            }
          }
        );
      } else {
        this.cvError = "Please upload your CV";
      }

    } else if (this.userRole == "student") {
      if (!this.imgFile) {
        this.imgError = 'Please select an image';
        return;
      }
      if (this.signupForm.valid) {
        this.signupForm.value.role = "student";
        this.uService.addUser(this.signupForm.value, this.imgFile).subscribe(
          (response) => {
            console.log("student response", response.msg)
            if (response.msg == "email already exist") {
              this.signupForm.controls['email'].setErrors({ emailExist: true });
            }
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
            this.router.navigate(["login"]);

          }
        );
      } else {
        this.signupForm.markAllAsTouched();
      }

    } else if (this.userRole == "parent") {
      if (this.signupForm.valid) {
        this.signupForm.value.role = "parent";
        this.uService.adduserParent(this.signupForm.value).subscribe(
          (response) => {
            console.log("parent response", response.msg)
            if (response.msg == "email already exist") {
              this.signupForm.controls['email'].setErrors({ emailExist: true });
            }
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
            this.router.navigate(["loginParent"]);

          }
        );
      } else {
        this.signupForm.markAllAsTouched();
      }
    }
  }


}
