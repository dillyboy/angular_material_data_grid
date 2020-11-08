import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req, next): any {

    const re = '/auth/signin';
    if (req.url.search(re) === -1) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
         // console.log(event);
        }
      }, error => {
      })
    );
  }

}
