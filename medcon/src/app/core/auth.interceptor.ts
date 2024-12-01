import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  if (req.url.includes('/auth')) {
    return next(req);
  }

  const token = sessionStorage.getItem('userToken');
  const newReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token,
    },
  });

  console.log('token',token);
  console.log('req', newReq);
  
  

  // return next(newReq).pipe(
  //   catchError((err: unknown) => {
  //     if (err instanceof HttpErrorResponse) {
  //       if (
  //         err.status === HttpStatusCode.Unauthorized ||
  //         err.status === HttpStatusCode.Forbidden
  //       ) {
  //         router.navigate(['/auth/login']);
  //       }
  //     }

  //     return throwError(() => err);
  //   })
  // );

  return next(newReq).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse) {
        if (
          err.status === HttpStatusCode.Unauthorized ||
          err.status === HttpStatusCode.Forbidden
        ) {
          router.navigate(['/auth/login']);
        }
        if (err.status === HttpStatusCode.InternalServerError) {
          alert('Erro de servidor');
        }
        if (err.status === HttpStatusCode.NotFound) {
          alert('Url não encontrada');
        }
      }

      return throwError(() => err);
    })
  );
};