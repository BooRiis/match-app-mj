import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './views/login/login.component';
import { UserNamePasswordComponent } from './components/user-name-password/user-name-password.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFacade } from './store/login.facade';
import { LoginService } from './store/login.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LOGIN_AUTH, loginReducer } from './store/login.reducer';
import { LoginEffects } from './store/login.effects';

@NgModule({
  declarations: [LoginComponent, UserNamePasswordComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature(LOGIN_AUTH, loginReducer),
    EffectsModule.forFeature([LoginEffects]),
  ],
  providers: [LoginFacade, LoginService],
})
export class LoginModule {}
