import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { JWTTokenService } from './core/jwt/jwttoken.service.';
import { LocalStorageService } from './core/storage/localstorage.service';
import { Constants } from './common/constants';
import { Router } from '@angular/router';
import { AuthService } from './core/auth-service/auth.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'NexPay';
  isLoggedIn: boolean = false;
  private destroyed$: Subject<any> = new Subject();
  /**
   *
   */
  constructor(private jwtTokenService: JWTTokenService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getIsLoggedInBS()
      .pipe(takeUntil(this.destroyed$)).subscribe(data => {
        this.isLoggedIn = data;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  logout() {
    this.localStorageService.remove(Constants.tokenName);
    this.authService.setIsLoggedInBS(false);
    this.router.navigate(['login']);
  }
}
