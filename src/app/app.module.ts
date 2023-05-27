import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from './core/storage/localstorage.service';
import { JWTTokenService } from './core/jwt/jwttoken.service.';
import { AdminComponent } from './admin/admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { HttpInterceptorService } from './core/interceptor/http-interceptor.service';
import { AdminService } from './admin/admin/admin.service';
import { ContractGridComponent } from './user/contract-grid/contract-grid.component';
import { AddNewContractComponent } from './user/add-new-contract/add-new-contract.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserRegistrationService } from './user-registration/user-registration.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    ContractGridComponent,
    AddNewContractComponent,
    UserRegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    LocalStorageService,
    JWTTokenService,
    UserService,
    AdminService,
    UserRegistrationService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
