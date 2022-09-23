import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginBackgrounds = [
    '/assets/login-bg-2.jpg',
    '/assets/login-bg-3.jpg',
    '/assets/login-bg-4.jpg',
    '/assets/login-bg-5.jpg',
    '/assets/login-bg-6.jpg',
  ];

  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordFormControl = new FormControl('', [Validators.required]);

  public matcher = new MyErrorStateMatcher();

  constructor(private loginService: LoginService, private router: Router) {}

  // NOTE: this is not how this would be done in the real world...
  // just doing this to demo a login page and to have route guards.
  public formOnSubmit(): void {
    const username = this.emailFormControl.value;
    const password = this.passwordFormControl.value;

    if (username && password) {
      const userExists = this.loginService.authenticate(username, password);

      if (!userExists) {
        this.emailFormControl.setErrors({ incorrect: true });
        this.passwordFormControl.setErrors({ incorrect: true });
      } else {
        this.router.navigateByUrl('/app');
      }
    }
  }

  public forgotPasswordOnClick() {
    this.emailFormControl.setValue('user@your.company');
    this.passwordFormControl.setValue('welcome');
  }
}
