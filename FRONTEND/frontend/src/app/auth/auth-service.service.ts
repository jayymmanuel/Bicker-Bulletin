import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog for displaying errors
import { ErrorComponent } from '../error/error/error.component'; 

@Injectable({
  providedIn: 'root'
})
// This is a service class for handling user authentication and related functionality.
export class AuthServiceService {

  // Declarations
  // Private properties to store the authentication token and a Subject for tracking login status.
  private token: string | undefined;
  private loggedIn = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) { 
    // Check if an authentication token exists in localStorage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // If a token is found, set it and notify that the user is logged in.
      this.token = storedToken;
      this.loggedIn.next(true);
    }
  }

  // Signup method
  signup(userusername: string | null, userpassword: string | null, userdepartment: string | null) {
    // Create an AuthData object with user information.
    const authData: AuthData = { username: userusername, password: userpassword, department: userdepartment }
    
    // Send a POST request to the signup API endpoint.
    this.http.post('https://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
        // Redirect to the login page after successful signup.
        this.router.navigateByUrl('/login');
      });
  }

// Login method
login(userusername: string | null, userpassword: string | null) {
  const authData = { username: userusername, password: userpassword };

  this.http.post<{ token: string }>('https://localhost:3000/api/user/login', authData)
    .subscribe(
      response => {
        const token = response.token;
        this.token = token;
        this.loggedIn.next(true);
        localStorage.setItem('authToken', token);
        this.router.navigateByUrl('/posts');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Password is incorrect
          let errorMessage = 'Incorrect input, Email or Password is incorrect. Please try again.';
          this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
        } else {
          // Handle other errors as before
          let errorMessage = 'An Unknown Error has occurred';
          if (error.error.message) {
            errorMessage = error.error.message;
          }
          this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
        }
      }
    );
}

  
  // Method to return the authentication token.
  getToken() {
    return this.token;
  }

  // Method to check if a user is logged in based on the presence of a token.
  checkLogin() {
    if (!this.token) {
      return false;
    } else {
      return true;
    }
  }

  // Returns an observable to track login status changes.
  getUpdatedLogin() {
    return this.loggedIn.asObservable();
  }

  // Logout method
  logout() {
    // Clears the session token, removes it from localStorage, and updates the login status.
    this.token = undefined;
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }
}

