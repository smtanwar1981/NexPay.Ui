import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { JWTTokenService } from '../jwt/jwttoken.service.';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private jwtTokenService: JWTTokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.jwtTokenService.jwtToken;
    req = req.clone({
      url: req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req);
  }
}