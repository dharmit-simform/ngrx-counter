import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./posts.state";

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts;
});

export const getPostById = (postId) => createSelector(getPostsState, (state) => {
  const post = state.posts.find(post => post.id === postId);
  return post ? post : null;
})
