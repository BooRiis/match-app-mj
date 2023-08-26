import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-name-password',
  templateUrl: './user-name-password.component.html',
  styleUrls: ['./user-name-password.component.scss']
})
export class UserNamePasswordComponent implements OnInit {
  @Input() loginError = new FormControl('');
  @Output() login: EventEmitter<{ email: string, password: string }> = new EventEmitter();

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    if (this.form.valid) {
      const credentials = {
        email: this.form.get('email')!.value,
        password: this.form.get('password')!.value
      };
      this.login.emit(credentials);
    }
  }
}
