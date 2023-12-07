import { createAction, props } from "@ngrx/store";
import { Post } from "../../models/post.model";
import { Update } from "@ngrx/entity";

export const ADD_POST_ACTION = '[posts page] add post';
export const ADD_POST_SUCCESS = '[posts page] add post success';
export const EDIT_POST_ACTION = '[posts page] edit post';
export const EDIT_POST_SUCCESS = '[posts page] edit post success';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const DELETE_POST_SUCCESS = '[posts page] delete post success';
export const LOAD_POST_ACTION = '[posts page] get posts';
export const LOAD_POSTS_SUCCESS = '[posts page] get posts success';


export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());
export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{ post: Post }>());
export const editPost = createAction(EDIT_POST_ACTION, props<{ post: Post, postId: string }>());
export const editPostSuccess = createAction(EDIT_POST_SUCCESS, props<{ post: Update<Post> }>());
export const deletePost = createAction(DELETE_POST_ACTION, props<{ postId: string }>());
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{ postId: string }>());
export const loadPosts = createAction(LOAD_POST_ACTION, props<{ page: number, limit: number, sortBy: string }>());
export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS, props<{ posts: Post[] }>());
