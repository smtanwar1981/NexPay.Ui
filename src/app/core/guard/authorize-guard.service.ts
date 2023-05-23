import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTTokenService } from '../jwt/jwttoken.service.';
import { LocalStorageService } from '../storage/localstorage.service';
import { Constants } from 'src/app/common/constants';
// import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuardService {
  constructor(
    private authStorageService: LocalStorageService,
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
      } else if (state.url.includes('admin') && !decodedToken.isAdmin) {
        this.router.navigate(['user']);
      } else if (state.url.includes('user')) {
        return true;
      }
    } else {
      alert(Constants.tokenExpireAlertMsg);
      this.router.navigate(['login']);
    }
  }
}