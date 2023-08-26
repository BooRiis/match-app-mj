import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './login.actions';
import { AuthState } from './login.model';

export const LOGIN_AUTH = 'loginAuth';

export const initialState: AuthState = {
  token: null,
  error: null,
};

export const loginReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    token: null,
    error,
  }))
);
