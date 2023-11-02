import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Post } from 'src/app/models/post.model';
import { getPosts } from '../state/posts.selector';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
  }
}
