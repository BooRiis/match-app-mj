import { Component } from '@angular/core';
import { LoginFacade } from '../../store/login.facade';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoggingIn = false;
  loginError = new FormControl('');

  constructor(private router: Router, private loginFacade: LoginFacade) {}

  onLogin(credentials: { email: string; password: string }): void {
    this.isLoggingIn = true;
    this.loginError.setValue('');

    this.loginFacade.login(credentials.email, credentials.password);

    this.loginFacade.token$.pipe(untilDestroyed(this)).subscribe((token) => {
      if (token) {
        this.router.navigate(['matches']);
      } else {
        this.loginError.setValue('Invalid email or password.');
      }
      this.isLoggingIn = false;
    });
  }
}
