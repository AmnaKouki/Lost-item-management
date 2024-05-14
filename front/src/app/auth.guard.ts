import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  // if user is not logged in, redirect to login page
  if (!localStorage.getItem('token')) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
