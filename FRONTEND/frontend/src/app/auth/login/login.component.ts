import { Component, OnInit, SecurityContext } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../../../app/auth/auth-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../../error/error/error.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authservice: AuthServiceService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  // Declare error messages for form validation.
  emailError: string = 'Please enter a valid email address';
  passwordError: string = 'Enter your password';

  public showPassword: boolean = false; // A flag to toggle password visibility.

  // Method to toggle the visibility of the password component.
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {}

  // Method called when the user submits the login form.
  onlogin(form: NgForm) {
    if (form.invalid) {
      // Handle the case where the form is invalid.
      let errorMessage = 'Invalid form submission. Please check your inputs.';
      this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
    } else {
      // If the form is valid, sanitize input values and pass them to the AuthServiceService for login.
      this.authservice.login(
        this.sanitizer.sanitize(SecurityContext.HTML, form.value.enterusername),
        this.sanitizer.sanitize(SecurityContext.HTML, form.value.enterpassword)
      );
    }
  }
}
