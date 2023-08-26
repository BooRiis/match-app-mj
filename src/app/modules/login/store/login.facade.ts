import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { login } from './login.actions';
import { AuthState } from './login.model';
import { selectAuthError, selectAuthToken } from './login.selectors';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {
  isLoggedIn$: Observable<boolean>;
  token$ = this.store.pipe(select(selectAuthToken));
  loginError$ = this.store.pipe(select(selectAuthError));

  constructor(private store: Store<AuthState>) {
    this.isLoggedIn$ = this.store.pipe(
      select(selectAuthToken),
      map((token) => !!token)
    );
  }

  login(email: string, password: string): void {
    this.store.dispatch(login({ email, password }));
  }
}
