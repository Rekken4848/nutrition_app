import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtHelper = new JwtHelperService();
  //const token = localStorage.getItem('authToken');
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (token) {
    if (jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userEmail');
      return false;
    }
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
