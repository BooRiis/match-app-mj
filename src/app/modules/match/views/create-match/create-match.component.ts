import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { Match } from '../../store/match.model';
import { MatchFacade } from '../../store/match.facade';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@UntilDestroy()
@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.scss'],
})
export class CreateMatchComponent {
  searchControl = new FormControl();
  form!: FormGroup;
  noResultsMessage = false;

  matchList$ = this.matchFacade.matches$;
  loading$ = this.matchFacade.loading$;
  filteredMatches$ = this.matchList$.pipe(startWith([]));

  constructor(
    public dialogRef: MatDialogRef<CreateMatchComponent>,
    private matchFacade: MatchFacade,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      possibleWinner: [''],
      startDate: [''],
      search: [''],
    });

    // this.searchControl.valueChanges
    //   .pipe(debounceTime(300), distinctUntilChanged(), untilDestroyed(this))
    //   .subscribe((searchTerm) => {
    //     this.filterMatches(searchTerm);
    //   });
  }

  onCreateMatch(name: string, startDate: string, possibleWinner: string) {
    const match: Match = {
      id: this.generateUniqueId(),
      name,
      startDate,
      possibleWinner,
      isCompleted: false,
    };
    this.form.reset();
    this.dialogRef.close(match);
  }

  // onMatchStatusChanged(id: string, isCompleted: boolean) {
  //   this.matchFacade.updateMatchStatus(id, isCompleted);
  // }

  // onLogout(): void {
  //   this.matchFacade.logout();
  // }

  // filterMatches(searchTerm: string) {
  //   this.filteredMatches$ = this.matchList$.pipe(
  //     map((matches) => {
  //       if (!searchTerm) {
  //         return matches;
  //       } else {
  //         const filteredMatches = matches.filter((match) =>
  //           match.name.toLowerCase().includes(searchTerm.toLowerCase())
  //         );
  //         this.noResultsMessage = filteredMatches.length === 0;
  //         return filteredMatches;
  //       }
  //     })
  //   );
  // }

  // onFilterChange(filter: string) {
  //   switch (filter) {
  //     case 'all':
  //       this.filteredMatches$ = this.matchFacade.matches$;
  //       break;
  //     case 'active':
  //       this.filteredMatches$ = this.matchFacade.matches$.pipe(
  //         map((matches) => matches.filter((matches) => !matches.isCompleted))
  //       );
  //       break;
  //     case 'done':
  //       this.filteredMatches$ = this.matchFacade.matches$.pipe(
  //         map((matches) => matches.filter((match) => match.isCompleted))
  //       );
  //       break;
  //     default:
  //       this.filteredMatches$ = this.matchFacade.matches$;
  //       break;
  //   }
  // }

  generateUniqueId(): string {
    const timestamp = new Date().getTime().toString(16);
    const randomNum = Math.random().toString(16).substring(2);
    return timestamp + randomNum;
  }
}
