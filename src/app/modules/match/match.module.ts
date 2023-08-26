import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchModalComponent } from './components/match-modal/match-modal.component';
import { MatchItemComponent } from './components/match-item/match-item.component';
import { MatchComponent } from './views/match/match.component';
import { MatchRoutingModule } from './match-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MatchRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatetimepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MatchModalComponent,
    MatchItemComponent,
    MatchComponent
  ],
})
export class MatchModule { }
