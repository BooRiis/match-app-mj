import { Component } from '@angular/core';
import { MatchFacade } from '../../store/match.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Match } from '../../store/match.model';
import { MatDialog } from '@angular/material/dialog';
import { MatchModalComponent } from '../../components/match-modal/match-modal.component';
import { CreateMatchComponent } from '../../components/create-match/create-match.component';

@UntilDestroy()
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent {
  matchesByDate: { [date: string]: Match[] } = {};
  matchesByDateKeys: string[] = [];
  nameStatus: { [name: string]: { opened: boolean; past: boolean } } = {};
  nameUpdateStatus: { [name: string]: boolean } = {};

  constructor(private matchFacade: MatchFacade, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.matchFacade.loadMatches();
    this.matchFacade.matches$
      .pipe(untilDestroyed(this))
      .subscribe((matches) => {
        if (this.matchesByDateKeys.length === 0) {
          this.groupMatchesByDate(matches);
        } else {
          this.partialRefreshMatches(matches);
        }
      });
  }

  groupMatchesByDate(matches: Match[]): void {
    this.matchesByDate = {};
    matches.forEach((match) => {
      const startDate = new Date(match.startDate).toDateString();
      if (!this.matchesByDate[startDate]) {
        this.matchesByDate[startDate] = [];
        this.matchesByDateKeys.push(startDate);
      }
      this.matchesByDate[startDate].push(match);
    });

    this.matchesByDateKeys.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
  }

  openMatchModal(match: Match): void {
    const groupDate = this.getGroupDateForMatchId(match.id);
    if (groupDate) {
      const groupCreationDate = new Date(groupDate);
      const currentDate = new Date();

      // Determine if the group is older or newer than the current date
      const isGroupInPast = groupCreationDate < currentDate;

      if (isGroupInPast && !this.nameStatus[match.name]) {
        this.dialog.open(MatchModalComponent, {
          width: '400px',
          data: match,
        });
        const updatedMatch = { ...match, isCompleted: true };
        this.matchFacade.updateMatchStatus(updatedMatch.id, true);

        this.nameStatus[match.name] = { opened: true, past: true };
      } else if (!isGroupInPast) {
        this.dialog.open(MatchModalComponent, {
          width: '400px',
          data: match,
        });
        if (!this.nameUpdateStatus[match.name]) {
          const updatedMatch = { ...match, isCompleted: false };
          this.matchFacade.updateMatchStatus(updatedMatch.id, false);

          this.nameUpdateStatus[match.name] = true;
        }
        this.nameStatus[match.name] = { opened: true, past: false };
      }
    }
  }

  onCreateMatchModal(): void {
    const dialogRef = this.dialog.open(CreateMatchComponent, {
      width: '100%',
      maxWidth: 870,
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((newMatch: Match) => {
        if (newMatch) {
          const startDate = new Date(newMatch.startDate).toDateString();
          if (!this.matchesByDate[startDate]) {
            this.matchesByDate[startDate] = [];
            this.matchesByDateKeys.push(startDate);
            this.matchesByDateKeys.sort(
              (a, b) => new Date(a).getTime() - new Date(b).getTime()
            );
          }

          // Add new match to the group
          this.matchesByDate[startDate].push(newMatch);

          // Dispatch addMatch action
          this.matchFacade.addMatch(newMatch);
        }
      });
  }

  partialRefreshMatches(matches: Match[]): void {
    const updatedMatchesByDate: { [date: string]: Match[] } = {};
    matches.forEach((match) => {
      const startDate = new Date(match.startDate).toDateString();
      if (!updatedMatchesByDate[startDate]) {
        updatedMatchesByDate[startDate] = [];
      }
      updatedMatchesByDate[startDate].push(match);
    });

    this.matchesByDate = { ...this.matchesByDate, ...updatedMatchesByDate };
  }

  private getGroupDateForMatchId(id: string): string | undefined {
    for (const groupDate of this.matchesByDateKeys) {
      const groupMatches = this.matchesByDate[groupDate];
      if (groupMatches.some((match) => match.id === id)) {
        return groupDate;
      }
    }
    return undefined;
  }

  onDelete(id: string) {
    const groupDate = this.getGroupDateForMatchId(id);
    if (groupDate) {
      const groupIndex = this.matchesByDateKeys.indexOf(groupDate);
      if (groupIndex !== -1) {
        const groupMatches = this.matchesByDate[groupDate];
        const matchIndex = groupMatches.findIndex((match) => match.id === id);

        if (matchIndex !== -1) {
          groupMatches.splice(matchIndex, 1);

          // Remove the group if it's empty
          if (groupMatches.length === 0) {
            this.matchesByDateKeys.splice(groupIndex, 1);
          }
        }
      }
    }

    this.matchFacade.deleteMatch(id);
  }

  onLogout(): void {
    this.matchFacade.logout();
  }
}
