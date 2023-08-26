import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginService } from './login.service';
import * as AuthActions from './login.actions';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.loginService.login(action.email, action.password).pipe(
          tap((response) => {
            localStorage.setItem('token', response.token);
          }),
          map((response) =>
          AuthActions.loginSuccess({ token: response.token })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router
  ) {}
}
