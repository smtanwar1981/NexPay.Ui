import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JWTTokenService } from '../jwt/jwttoken.service.';
import { Constants } from 'src/app/common/constants';
import { AuthService } from '../auth-service/auth.service';
// import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRouteGuardService {
  constructor(
    private jwtService: JWTTokenService,
    private router: Router,
    private authService: AuthService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    if (this.jwtService.jwtToken && !this.jwtService.isTokenExpired()) {
      let decodedToken = this.jwtService.getDecodeToken();
      if (decodedToken.isAdmin) {
        this.router.navigate(['admin']);
      } else if (!decodedToken.isAdmin) {
        this.router.navigate(['user']);
      }
    } else {
      this.authService.setIsLoggedInBS(false);
      return true;
    }
  }
}