import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchModalComponent } from './components/match-modal/match-modal.component';
import { MatchComponent } from './views/match/match.component';
import { MatchRoutingModule } from './match-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromMatchReducer from './store/match.reducer';
import { MatchEffects } from './store/match.effects';
import { MatchFacade } from './store/match.facade';
import { MatchService } from './store/match.service';
import { CreateMatchComponent } from './components/create-match/create-match.component';
import { GroupColorDirective } from 'src/app/directives/group-color.directive';

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
    StoreModule.forFeature(fromMatchReducer.MATCHES, fromMatchReducer.reducer),
    EffectsModule.forFeature([MatchEffects]),
  ],
  declarations: [
    MatchModalComponent,
    MatchComponent,
    CreateMatchComponent,
    GroupColorDirective,
  ],
  providers: [
    MatchFacade,
    MatchService,
    { provide: LOCALE_ID, useValue: 'en-EN' },
    { provide: MAT_DATE_LOCALE, useValue: 'en-EN' },
  ],
})
export class MatchModule {}
