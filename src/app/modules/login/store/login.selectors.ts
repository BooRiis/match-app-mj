import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './login.model';
import { LOGIN_AUTH } from './login.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(LOGIN_AUTH);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state) => state.token
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
