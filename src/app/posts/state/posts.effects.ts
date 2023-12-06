import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { CustomToastService } from "src/app/shared/service/custom-toast.service";
import { PostsService } from "../posts.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, editPost, editPostSuccess, loadPosts, loadPostsSuccess } from "./posts.actions";

@Injectable()
export class PostsEffects {
  constructor(
    private action$: Actions,
    private _postsService: PostsService,
    private _customToast: CustomToastService,
    private router: Router,
  ) { }

  loadPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadPosts),
      exhaustMap((action) => {
        return this._postsService.getAllPosts(action.page, action.limit, action.sortBy).pipe(
          map((data) => {
            const posts = data.responseObject.posts;
            return loadPostsSuccess({ posts });
          }),
          catchError((err) => {
            console.log(err);
            return of();
          })
        )
      })
    )
  });

  addPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this._postsService.addPost(action.post).pipe(
          map((data) => {
            const post = data.responseObject.post;
            console.log(post);
            return addPostSuccess({ post });
          }),
          catchError((err) => {
            console.log(err);
            return of();
          })
        )
      })
    )
  });

  editPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(editPost),
      mergeMap((action) => {
        return this._postsService.editPost(action.post, action.postId).pipe(
          map((data) => {
            const post = data.responseObject.post;
            return editPostSuccess({ post: action.post })
          }),
          catchError((err) => {
            console.log(err);
            return of();
          })
        )
      })
    )
  });

  deletePost = createEffect(() => {
    return this.action$.pipe(
      ofType(deletePost),
      mergeMap((action) => {
        return this._postsService.deletePost(action.postId).pipe(
          map((data) => {
            return deletePostSuccess({ postId: action.postId });
          }),
          catchError((err) => {
            console.log(err);
            return of();
          })
        )
      })
    )
  })
}
