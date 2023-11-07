import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.css']
})
export class NavComponentComponent implements OnInit {
  constructor(public authService: AuthServiceService, private router: Router) { }

// This private property is used to manage subscriptions to observables.
// It's marked as private, so it can only be accessed within this class.
private loginSub: Subscription = new Subscription;

// This property is a boolean flag used to track the user's login status.
// Initially set to false, indicating the user is not logged in.
isLoggedIn: boolean = false;


  ngOnInit(): void {
    // Update isLoggedIn based on the result of checkLogin
    this.isLoggedIn = this.authService.checkLogin();

    // Subscribe to changes in login status
    this.loginSub = this.authService.getUpdatedLogin().subscribe((value: boolean) => {
      this.isLoggedIn = value;
    });
  }

  onLogout() {
    // Show a confirmation dialog
    const userConfirmed = window.confirm("Are you sure you want to log out?");

    if (userConfirmed) {
      // Log out the user and navigate to the login page
      this.authService.logout();
      this.router.navigateByUrl('/login');
    }
  }
}
