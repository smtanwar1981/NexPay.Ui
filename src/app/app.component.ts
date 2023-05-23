import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { JWTTokenService } from './core/jwt/jwttoken.service.';
import { LocalStorageService } from './core/storage/localstorage.service';
import { Constants } from './common/constants';
import { Router } from '@angular/router';
import { AuthService } from './core/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NexPay';
  isLoggedIn: boolean = false;
  /**
   *
   */
  constructor(private jwtTokenService: JWTTokenService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getIsLoggedInBS().subscribe(data => {
      this.isLoggedIn = data;
    });
  }

  logout() {
    this.localStorageService.remove(Constants.tokenName);
    this.authService.setIsLoggedInBS(false);
    this.router.navigate(['login']);
  }
}
