import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.action";
import { exhaustMap, map } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private _authService: AuthService,
  ) { }

  login$ = createEffect(() => {
    return this.action$.pipe(ofType(loginStart), exhaustMap((action) => {
      return this._authService.login(action.email, action.password).pipe(
        map((data) => {
          console.log(data);
          return loginSuccess();
        })
      );
    }))
  })
}