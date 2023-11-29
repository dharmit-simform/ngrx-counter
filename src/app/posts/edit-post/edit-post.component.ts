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
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.postSubscription = this.store.select(getPostById(id)).subscribe(post => {
        this.post = post;
        this.createForm();
      })

    });
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required, Validators.minLength(6)]),
      body: new FormControl(this.post.body, [Validators.required, Validators.minLength(10)]),
    });
  }

  onEditPost() {
    if (this.postForm.valid) {
      const post: Post = {
        _id: this.post._id,
        title: this.postForm.value.title,
        body: this.postForm.value.body,
      }

      this.store.dispatch(editPost({ post }));
      this.router.navigate(['../posts']);
    }
  }

  ngOnDestroy(): void {
    this.postSubscription ? this.postSubscription.unsubscribe() : '';
  }
}
