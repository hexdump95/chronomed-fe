import { HttpInterceptorFn } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs';
import {  Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const oidcSecurityService = inject(OidcSecurityService);

  // current url that matches the auth config id
  const configId = inject(Router).url.split('/')[1];

  return oidcSecurityService.getAccessToken(configId)
    .pipe(
      switchMap(token => {
        const authReq = token ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        }) : req;

        return next(authReq);
      }),
      catchError(_ => {
        return next(req);
      })
    );
};
