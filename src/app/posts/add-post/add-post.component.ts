import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
  }

  onAddPost() {
    if (this.postForm.valid) {
      const post: Post = this.postForm.value;
      this.store.dispatch(addPost({ post }));
      this.postForm.reset();
    }
  }
}
