import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MatchesState } from './match.model';
import { MATCHES } from './match.reducer';

export const selectMatchesState = createFeatureSelector<MatchesState>(MATCHES);

export const selectMatches = createSelector(
  selectMatchesState,
  (state: MatchesState) => state.Matches
);

export const selectMatchesLoading = createSelector(
  selectMatchesState,
  (state: MatchesState) => state.loading
);

export const selectMatchesError = createSelector(
  selectMatchesState,
  (state: MatchesState) => state.error
);
