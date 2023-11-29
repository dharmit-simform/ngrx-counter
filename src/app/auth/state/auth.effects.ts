import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { autoLogin, autoLogout, loginStart, loginSuccess, registerStart, registerSuccess } from "./auth.action";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "../auth.service";
import { CustomToastService } from "src/app/shared/service/custom-toast.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private _authService: AuthService,
    private _customToast: CustomToastService,
    private router: Router
  ) { }

  login$ = createEffect(() => {
    return this.action$.pipe(ofType(loginStart), exhaustMap((action) => {
      return this._authService.login(action.email, action.password).pipe(
        map((data) => {
          const user = data.responseObject.user;
          user['token'] = data.responseObject.token;
          this._authService.saveUser(user);
          this._customToast.success('Login Successful');
          this.router.navigate(['/']);
          return loginSuccess({ user });
        }),
        catchError((err) => {
          this._customToast.error(err.error.responseMessage);
          return of();
        })
      );
    }))
  });

  register$ = createEffect(() => {
    return this.action$.pipe(
      ofType(registerStart),
      exhaustMap((action) => {
        return this._authService.register(action).pipe(
          map((data) => {
            const user = data.responseObject.user;
            user['token'] = data.responseObject.token;
            this._customToast.success('Registration Successful');
            this.router.navigate(['/']);
            return registerSuccess({ user })
          }),
          catchError((err) => {
            this._customToast.error(err.error.responseMessage);
            return of();
          })
        )
      })
    )
  });

  autoLogin$ = createEffect(() => {
    return this.action$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this._authService.getUser();
        return of(loginSuccess({ user }));
      })
    )
  })

  logout$ = createEffect(() => {
    return this.action$.pipe(
      ofType(autoLogout),
      map((action) => {
        this._authService.logout();
        this.router.navigate(['/auth']);
      })
    )
  }, { dispatch: false })
}
