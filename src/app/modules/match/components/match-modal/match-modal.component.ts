import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateFormat, Match } from '../../store/match.model';

@Component({
  selector: 'app-match-modal',
  templateUrl: './match-modal.component.html',
  styleUrls: ['./match-modal.component.scss']
})
export class MatchModalComponent {
  DATE_FORMAT = DateFormat.DATE;
  nameStatus: { [name: string]: { opened: boolean, past: boolean } } = {};
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Match, public dialogRef: MatDialogRef<MatchModalComponent>) {}

  closeDialog(): void {
    if (this.data.name in this.nameStatus) {
      const nameStatus = this.nameStatus[this.data.name];
      if (nameStatus.past) {
        // Reset only if the name is in the past
        nameStatus.opened = false;
      }
    }
    this.dialogRef.close();
  }
  
}
