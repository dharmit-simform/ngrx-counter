import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import { authReducer } from "../auth/state/auth.reducer";
import { AUTH_STATE_NAME, AuthState } from "../auth/state/auth.state";

export interface AppState {
  [AUTH_STATE_NAME]: AuthState,
  router: RouterReducerState
}

export const appReducer = {
  [AUTH_STATE_NAME]: authReducer,
  router: routerReducer
}
