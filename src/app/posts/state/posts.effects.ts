import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { CustomToastService } from "src/app/shared/service/custom-toast.service";
import { PostsService } from "../posts.service";
import { loadPostsSuccess, loadPosts } from "./posts.actions";

@Injectable()
export class PostsEffects {
  constructor(
    private action$: Actions,
    private _postsService: PostsService,
    private _customToast: CustomToastService,
    private router: Router,
  ) { }

  posts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadPosts),
      exhaustMap((action) => {
        return this._postsService.getAllPosts(action.page, action.limit, action.sortBy).pipe(
          map((data) => {
            const posts = data.responseObject.posts;
            return loadPostsSuccess({ posts, count: data.responseObject.totalElements, pages: data.responseObject.totalPages });
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
