import { createReducer, on } from "@ngrx/store";
import { addPostSuccess, deletePostSuccess, editPostSuccess, loadPostsSuccess } from "./posts.actions";
import { initialState, postsAdapter } from "./posts.state";

const _postsReducer = createReducer(initialState,
  on(addPostSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, state);
  }),
  on(editPostSuccess, (state, action) => {
    return postsAdapter.updateOne(action.post, state);
  }),
  on(deletePostSuccess, (state, { postId }) => {
    return postsAdapter.removeOne(postId, state);
  }),
  on(loadPostsSuccess, (state, action) => {
    return postsAdapter.setAll(action.posts, state);
  })
);

export function postsReducer(state, action) {
  return _postsReducer(state, action);
}
