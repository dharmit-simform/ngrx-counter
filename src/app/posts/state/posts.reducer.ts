import { createReducer, on } from "@ngrx/store"
import { initialState } from "./posts.state"
import { addPost, deletePost, editPost, loadPostsSuccess } from "./posts.actions";

const _postsReducer = createReducer(initialState,
  on(addPost, (state, action) => {
    let post = { ...action.post }
    post._id = (state.posts.length + 1).toString();
    return {
      ...state,
      posts: [...state.posts, post],
    }
  }),
  on(editPost, (state, action) => {
    const updatedPosts = state.posts.map(post => {
      return action.post._id === post._id ? action.post : post
    });

    return {
      ...state,
      posts: updatedPosts,
    }
  }),
  on(deletePost, (state, action) => {
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
