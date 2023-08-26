import { createReducer, on } from '@ngrx/store';
import { MatchesState } from './match.model';
import * as MatchesActions from './match.actions';

export const MATCHES = 'matches';

export const initialState: MatchesState = {
  Matches: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(MatchesActions.loadMatches, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MatchesActions.loadMatchesSuccess, (state, { matches: matches }) => ({
    ...state,
    Matches: matches,
    loading: false,
  })),
  on(MatchesActions.loadMatchesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(MatchesActions.addMatchSuccess, (state, { match: match }) => ({
    ...state,
    Matches: [...state.Matches, match],
  })),
  on(MatchesActions.updateMatchSuccess, (state, { match: match }) => ({
    ...state,
    Matches: state.Matches.map((t) => (t.id === match.id ? match : t)),
  })),
  on(MatchesActions.deleteMatchSuccess, (state, { id }) => ({
    ...state,
    Matches: state.Matches.filter((t) => t.id !== id),
  })),
  on(MatchesActions.logout, (state) => ({
    ...state,
    token: null,
  }))
);
