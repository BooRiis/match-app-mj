import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, first, mergeMap, take } from 'rxjs';
import { LoginFacade } from '../modules/login/store/login.facade';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginFacade: LoginFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.loginFacade.token$.pipe(
      take(1), // you can use here first()
      mergeMap((token) => {
        if (token) {
          request = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`),
          });
        }
        return next.handle(request);
      })
    );
  }
}
