import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { JwtToken } from 'src/app/models/jwt-token.model';
import { LocalStorageService } from '../storage/localstorage.service';
import { Constants } from 'src/app/common/constants';

@Injectable()
export class JWTTokenService {

  //jwtToken!: string;
  decodedToken!: { [key: string]: string };

  constructor(private localStorage: LocalStorageService) {
  }

  get jwtToken() {
    return this.localStorage.get(Constants.tokenName);
  }


  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getDecodeToken(): JwtToken {
    return jwt_decode(this.jwtToken);
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.displayName : null;
  }

  getEmailId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.email : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? parseInt(this.decodedToken.exp) : null;
  }

  getExpiryTimeInMinutes() {
    const expiryTime: number = this.getExpiryTime();
    return ((1000 * expiryTime) - (new Date()).getTime());
  }

  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}