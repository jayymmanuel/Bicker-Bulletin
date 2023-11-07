import { Component, OnInit, SecurityContext } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../app/auth/auth-service.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
// This is a component class for handling user signup functionality.
export class SignupComponent implements OnInit {

  // Initialize the selectedDepartment with an empty string.
  selectedDepartment: string = '';

  // Declare error messages for form validation.
  usernameError: string = 'Please enter a valid username';
  passwordError: string = 'Please enter a password that contains lowercase, uppercase letters, and at least one number';
  departmentError: string = 'Please select a Department';
  enterusername: string = ''; // Initialize with an empty string

  constructor(public authservice: AuthServiceService, private router: Router, private sanitizer: DomSanitizer) { }

  public showPassword: boolean = false; // A flag to toggle password visibility.

  // Method to toggle the visibility of the password component.
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    // Initialization code, if any, can be placed here.
  }

  // Method called when the user submits the signup form.
  onsignup(signupform: NgForm) {
    if (signupform.invalid) {
      // If the form is invalid, do nothing.
      return;
    } else {
      // If the form is valid, sanitize input values and pass them to the AuthServiceService for signup.
      const username = this.sanitizer.sanitize(SecurityContext.HTML, signupform.value.enterusername);
      const password = this.sanitizer.sanitize(SecurityContext.HTML, signupform.value.enterpassword);
      const department = this.selectedDepartment;

      this.authservice.signup(username, password, department);

      // Show an alert message indicating successful account creation.
      alert('Account: ' + username + ' has successfully been created.\nPlease Log In.');
    }
  }
}

