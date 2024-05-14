import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  // Get the token from the local storage
  let token = localStorage.getItem('token');

  // If the token is not null, add it to the headers
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Continue with the request
  return next(req).pipe(
    catchError((error) => {
      // If the request fails, check if the error status is 401
      if (error.status === 401) {
        // If it is, remove the token from the local storage
        localStorage.removeItem('token');
        router.navigate(['/auth/login']);
      }
      // Continue with the error
      throw error;
    })
  );
};
