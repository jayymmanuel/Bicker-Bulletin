import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  public isBannerVisible: boolean = true; // Control the visibility of the banner

  constructor(@Inject (MAT_DIALOG_DATA) public data: {message:string}) { }

  ngOnInit() {
    // Add a timeout to hide the banner after 3 seconds
    setTimeout(() => {
      this.isBannerVisible = false;
    }, 3000); // 3000 milliseconds = 3 seconds
  }

}
