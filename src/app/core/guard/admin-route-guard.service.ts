import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JWTTokenService } from '../jwt/jwttoken.service.';
import { Constants } from 'src/app/common/constants';
// import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRouteGuardService {
  constructor(
    private jwtService: JWTTokenService,
    private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {

    if (this.jwtService.jwtToken && !this.jwtService.isTokenExpired()) {
      let decodedToken = this.jwtService.getDecodeToken();
      if (state.url.includes('admin') && decodedToken.isAdmin) {
        return true;
      } else if (state.url.includes('login') || state.url.includes('user')) {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['user']);
      }
    } else {
      alert(Constants.tokenExpireAlertMsg);
      this.router.navigate(['login']);
    }
  }
}