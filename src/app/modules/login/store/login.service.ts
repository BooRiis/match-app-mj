import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from './login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://64e9efb9bf99bdcc8e671c9f.mockapi.io';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/api/v1/auth`, { email, password });
  }
}
