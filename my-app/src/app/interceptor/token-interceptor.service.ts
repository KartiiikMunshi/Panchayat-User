import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService {
  
  constructor(private authService : AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjUwMzEwNDcsImV4cCI6MTY5NjU4ODY0N30.wk9PSuxC7CTUrICBnIz5O0bbbxq2dtMM26AEY4Tihz4'

    let jwttoken = req.clone({
      setHeaders:{
        Authorization : 'Bearer'+ " " + token,
      }
    })

    return next.handle(jwttoken);
  }
}
