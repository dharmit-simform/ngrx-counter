import { createReducer, on } from "@ngrx/store";
import { addPostSuccess, deletePostSuccess, editPostSuccess, loadPostsSuccess } from "./posts.actions";
import { initialState } from "./posts.state";

const _postsReducer = createReducer(initialState,
  on(addPostSuccess, (state, action) => {
    let post = { ...action.post }
    return {
      ...state,
      posts: [...state.posts, post],
    }
  }),
  on(editPostSuccess, (state, action) => {
    const updatedPosts = state.posts.map(post => {
      return action.post._id === post._id ? action.post : post
    });

    return {
      ...state,
      posts: updatedPosts,
    }
  }),
  on(deletePostSuccess, (state, action) => {
    const updatedPosts = state.posts.filter(post => post._id !== action.postId)

    return {
      ...state,
      posts: updatedPosts,
    }
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts
    }
  })
);

export function postsReducer(state, action) {
  return _postsReducer(state, action);
}
