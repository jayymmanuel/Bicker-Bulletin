import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
// This is a class declaration for HeaderComponentComponent.
// It implements the OnInit interface, suggesting that it will have an ngOnInit method.
export class HeaderComponentComponent implements OnInit {

  constructor(public authService: AuthServiceService, private router: Router) { }

  // Declarations
  // Private property for managing subscriptions to observables.
  private loginSub: Subscription = new Subscription;

  // Public property for tracking the user's login status, initially set to false.
  isLoggedIn: boolean = false;

  // This method is part of the OnInit interface and is called when the component is initialized.
  ngOnInit(): void {
    // Calls the checkLogin method from the authService.
    this.authService.checkLogin();

    // Subscribes to an observable returned by getUpdatedLogin method in authService.
    // When the observable emits a boolean value, it updates the isLoggedIn property.
    this.loginSub = this.authService.getUpdatedLogin().subscribe((value: boolean) => {
      this.isLoggedIn = value;
    })
  }
}

