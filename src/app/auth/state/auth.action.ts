import { createAction, props } from "@ngrx/store";
import { UserSignUp } from "src/app/models/user-signup.model";
import { User } from "src/app/models/user.model";

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_ERROR = '[auth page] login error';
export const REGISTER_START = '[auth page] register start';
export const REGISTER_SUCCESS = '[auth page] register success';
export const AUTO_LOGIN_ACTION = '[auth page] auto login';

export const loginStart = createAction(LOGIN_START, props<{ email: string, password: string }>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User }>());
export const registerStart = createAction(REGISTER_START, props<UserSignUp>());
export const registerSuccess = createAction(REGISTER_SUCCESS, props<{ user: User }>());
export const autoLogin = createAction(AUTO_LOGIN_ACTION);
