import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/posts.selector';
import { Post } from 'src/app/models/post.model';
import { Subscription } from 'rxjs';
import { editPost } from '../state/posts.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  post: Post;
  postSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.postSubscription = this.store.select(getPostById).subscribe(post => {
      if (post) {
        this.post = post;
        this.postForm.patchValue({
          title: this.post.title,
          body: this.post.body
        })
      }
    });
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      body: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    });
  }

  onEditPost() {
    if (this.postForm.valid) {
      const post = { ...this.post };
      post.title = this.postForm.value.title;
      post.body = this.postForm.value.body;


      this.store.dispatch(editPost({ post, postId: this.post._id }));
      this.router.navigate(['../posts']);
    }
  }

  ngOnDestroy(): void {
    this.postSubscription ? this.postSubscription.unsubscribe() : '';
  }
}
