import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Hart } from '../services/hart';
import { requiresBearerAuth } from './api-auth-url';

export const authSessionInterceptor: HttpInterceptorFn = (req, next) => {
  const hart = inject(Hart);
  const router = inject(Router);
  const token = hart.getToken();

  const shouldAttachToken =
    !!token &&
    requiresBearerAuth(req.url) &&
    !req.headers.has('Authorization');

  const authReq = shouldAttachToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
        hart.logout();
        void router.navigate(['/login']);
      }

      return throwError(() => error);
    }),
  );
};
