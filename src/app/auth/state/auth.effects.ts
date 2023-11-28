import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.action";
import { catchError, exhaustMap, map, of } from "rxjs";
import { AuthService } from "../auth.service";
import { CustomToastService } from "src/app/shared/service/custom-toast.service";

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private _authService: AuthService,
    private _customToast: CustomToastService,
  ) { }

  login$ = createEffect(() => {
    return this.action$.pipe(ofType(loginStart), exhaustMap((action) => {
      return this._authService.login(action.email, action.password).pipe(
        map((data) => {
          const user = data.responseObject.user;
          user['token'] = data.responseObject.token;
          this._customToast.success('Login Successful');
          return loginSuccess({ user });
        }),
        catchError((err) => {
          this._customToast.error(err.error.responseMessage);
          return of();
        })
      );
    }))
  })
}
