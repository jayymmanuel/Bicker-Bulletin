import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../../auth/auth-service.service';
import { PostServiceService } from '../post-service.service';
@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})

export class PostDisplayComponent implements OnInit {

  showLoader = true; // Initially, show the loader

  posts: { _id: string, _username: string, username: string, _date: string, date: string, _department: string, department: string, _postContent: string, postContent: string, __v: string }[] = [];

  constructor(public postservice: PostServiceService, public authService: AuthServiceService) { }

  private postSubscription!: Subscription;

  //private loginSub: Subscription = new Subscription;
  isLoggedIn: boolean = false;

  ngOnInit(): void {

        // Simulate a delay of 3 seconds before displaying the content
        setTimeout(() => {
          this.showLoader = false; // Hide the loader after 3 seconds
        }, 3000);

    this.isLoggedIn = this.authService.checkLogin();

    this.postservice.getPostService();
    this.postSubscription = this.postservice.getUpdatedListener()
      .subscribe((posts: { _id: string, _username: string, username: string, _date: string, date: string, _department: string, department: string, _postContent: string, postContent: string, __v: string }[]) => {
        this.posts = posts;
      });
      
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  onDelete(postID: string) {
    console.log(postID);
    this.postservice.deletePostService(postID);
  }



}