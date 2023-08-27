import { Component } from '@angular/core';
import { Match } from '../../store/match.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.scss'],
})
export class CreateMatchComponent {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateMatchComponent>,
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

  generateUniqueId(): string {
    const timestamp = new Date().getTime().toString(16);
    const randomNum = Math.random().toString(16).substring(2);
    return timestamp + randomNum;
  }
}
