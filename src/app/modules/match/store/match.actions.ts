import { createAction, props } from '@ngrx/store';
import { Match } from './match.model';

export const loadMatches = createAction('[Matches] Load Matches');

export const loadMatchesSuccess = createAction(
  '[Matches] Load Matches Success',
  props<{ matches: Match[] }>()
);

export const loadMatchesFailure = createAction(
  '[Matches] Load Matches Failure',
  props<{ error: string }>()
);

export const addMatch = createAction(
  '[Matches] Add Match',
  props<{ match: Match }>()
);

export const addMatchSuccess = createAction(
  '[Matches] Add Match Success',
  props<{ match: Match }>()
);

export const addMatchFailure = createAction(
  '[Matches] Add Match Failure',
  props<{ error: string }>()
);

export const updateMatch = createAction(
  '[Matches] Update Match',
  props<{ id: string; isCompleted: boolean }>()
);

export const updateMatchSuccess = createAction(
  '[Matches] Update Match Success',
  props<{ match: Match }>()
);

export const updateMatchFailure = createAction(
  '[Matches] Update Match Failure',
  props<{ error: string }>()
);

// Delete Match
export const deleteMatch = createAction(
  '[Matches] Delete Match',
  props<{ id: string }>()
);

export const deleteMatchSuccess = createAction(
  '[Matches] Delete Match Success',
  props<{ id: string }>()
);

export const deleteMatchFailure = createAction(
  '[Matches] Delete Match Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
