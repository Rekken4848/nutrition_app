import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');
  const router = inject(Router);
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

  console.log("Previo authReq");

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log("Previo authReq");

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
