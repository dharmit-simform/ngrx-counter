import { User } from "src/app/models/user.model";

export const AUTH_STATE_NAME = 'auth';

export interface AuthState {
  user: User | null
}

export const initialState: AuthState = {
  user: null
};
