import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { autoLogout, loginSuccess, registerSuccess } from "./auth.action";

const _authReducer = createReducer(initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    }
  }),
  on(registerSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    }
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      user: null
    }
  })
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
