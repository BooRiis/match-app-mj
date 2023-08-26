import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { MatchService } from './match.service';
import * as MatchesActions from './match.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class MatchEffects {
  loadMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchesActions.loadMatches),
      mergeMap(() =>
        this.matchService.fetchMatches().pipe(
          map((todos) => MatchesActions.loadMatchesSuccess({ matches: todos })),
          catchError((error) =>
            of(MatchesActions.loadMatchesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchesActions.addMatch),
      mergeMap(({ match: todo }) =>
        this.matchService.addMatch(todo).pipe(
          map((addedTodo) => MatchesActions.addMatchSuccess({ match: addedTodo })),
          catchError((error) =>
            of(MatchesActions.addMatchFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchesActions.updateMatch),
      mergeMap(({ id, isCompleted }) =>
        this.matchService.updateMatchStatus(id, isCompleted).pipe(
          map((updatedTodo) =>
            MatchesActions.updateMatchSuccess({ match: updatedTodo })
          ),
          catchError((error) =>
            of(MatchesActions.updateMatchFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchesActions.deleteMatch),
      mergeMap(({ id }) =>
        this.matchService.deleteMatch(id).pipe(
          map(() => MatchesActions.deleteMatchSuccess({ id })),
          catchError((error) =>
            of(MatchesActions.deleteMatchFailure({ error: error.message }))
          )
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MatchesActions.logout),
        tap(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private matchService: MatchService,
    private router: Router
  ) {}
}
