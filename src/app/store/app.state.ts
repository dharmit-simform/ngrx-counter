import { authReducer } from "../auth/state/auth.reducer";
import { AUTH_STATE_NAME, AuthState } from "../auth/state/auth.state";
import { counterReducer } from "../counter/state/counter.reducer";
import { COUNTER_STATE_NAME } from "../counter/state/counter.selector";
import { CounterState } from "../counter/state/counter.state";
import { postsReducer } from "../posts/state/posts.reducer";
import { POST_STATE_NAME } from "../posts/state/posts.selector";
import { PostsState } from "../posts/state/posts.state";

export interface AppState {
  [AUTH_STATE_NAME]: AuthState
}

export const appReducer = {
  [AUTH_STATE_NAME]: authReducer
}
