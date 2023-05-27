import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../storage/localstorage.service';
import { LoginResponse } from 'src/app/models/login-response.model';
import { JWTTokenService } from '../jwt/jwttoken.service.';
import { JwtToken } from 'src/app/models/jwt-token.model';
import { Router } from '@angular/router';
import { Constants } from 'src/app/common/constants';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private jwtTokenService: JWTTokenService,
    private router: Router,
    private localStorageService: LocalStorageService) { }

  setIsLoggedInBS(value) {
    this.isLoggedIn.next(value);
  }

  getIsLoggedInBS(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  getJWTToken(username: string, password: string): void {
    let request = { username: username, password: password };
    let loginApiUrl = environment.loginApiUrl;
    this.httpClient.post(`${loginApiUrl}/Security/createToken`, request)
      .subscribe((data: LoginResponse) => {
        if (data) {
          this.localStorage.set(Constants.tokenName, data.token);
          let token: JwtToken = this.jwtTokenService.getDecodeToken();
          this.setIsLoggedInBS(true);
          if (token.isAdmin) {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['user'])
          }
          setTimeout(() => { this.logout(); }, this.jwtTokenService.getExpiryTimeInMinutes());
        }
      });
  }

  logout() {
    this.localStorageService.remove(Constants.tokenName);
    this.setIsLoggedInBS(false);
    alert('Session has expired, please login again.')
    this.router.navigate(['login']);
  }
}
