import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as MatchesActions from './match.actions';
import { Match, MatchesState } from './match.model';
import {
  selectMatches,
  selectMatchesError,
  selectMatchesLoading,
} from './match.selectors';
import { logout } from './match.actions';

@Injectable()
export class MatchFacade {
  matches$ = this.store.pipe(select(selectMatches));
  loading$ = this.store.pipe(select(selectMatchesLoading));
  error$ = this.store.pipe(select(selectMatchesError));

  constructor(private readonly store: Store<MatchesState>) {}

  loadMatches() {
    this.store.dispatch(MatchesActions.loadMatches());
  }

  addMatch(match: Match) {
    this.store.dispatch(MatchesActions.addMatch({ match: match }));
  }

  updateMatchStatus(id: string, isCompleted: boolean) {
    this.store.dispatch(MatchesActions.updateMatch({ id, isCompleted }));
  }

  deleteMatch(id: string) {
    this.store.dispatch(MatchesActions.deleteMatch({ id }));
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
