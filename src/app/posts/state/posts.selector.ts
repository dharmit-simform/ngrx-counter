import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState, postsAdapter } from "./posts.state";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const postSelector = postsAdapter.getSelectors();

export const getPosts = createSelector(getPostsState, postSelector.selectAll);
export const getPostEntities = createSelector(getPostsState, postSelector.selectEntities);

export const getPostById = createSelector(getPostEntities, getCurrentRoute, (posts, route: RouterStateUrl) => {
  return posts ? posts[route.params['id']] : null;
})
