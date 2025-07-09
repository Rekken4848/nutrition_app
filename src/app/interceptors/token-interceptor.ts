import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  //const token = localStorage.getItem('authToken');
  const router = inject(Router);
  const jwtHelper = new JwtHelperService();

  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  console.log('Interceptor ejecutado para:', req.url, 'Token:', token);

  const excludedRoutes: { url: string; method: string }[] = [
    { url: '/auth/login', method: 'POST' },
    { url: '/users', method: 'POST' }
  ];

  /*const isExcluded = excludedRoutes.some(
    route => req.url.includes(route.url) && req.method === route.method
  );*/

  console.log("req.url: ", req.url);
  //console.log("route.url: ", route.url);

  const urlPath = new URL(req.url).pathname;

  console.log("urlPath: ", urlPath);

  const isExcluded = excludedRoutes.some(
    route => urlPath === route.url && req.method === route.method
  );

  console.log("Ruta excluida: ", isExcluded);
  if (isExcluded || !token) {
    console.log("Se ha excluido la ruta o no hay token");
    return next(req);
  }

  //let authReq = req;

  /*if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }*/

  if (jwtHelper.isTokenExpired(token)) {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    sessionStorage.removeItem('userEmail');
    router.navigate(['/login']);
    return throwError(() => new Error('Token expirado'));
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  //return next(req);
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
