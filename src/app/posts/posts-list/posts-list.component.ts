import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post.model';
import { AppState } from '../../store/app.state';
import { deletePost, loadPosts } from '../state/posts.actions';
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
    this.store.dispatch(loadPosts({ page: 1, limit: 10, sortBy: '_id' }));
    this.posts$ = this.store.select(getPosts);
  }

  onDelete(postId: string) {
    if (confirm("Are you sure you want to delete this post")) {
      this.store.dispatch(deletePost({ postId }));
    }
  }
}
