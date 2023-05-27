import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { LoginRouteGuardService } from './core/guard/login-route-guard.service';
import { AdminRouteGuardService } from './core/guard/admin-route-guard.service';
import { UserRouteGuardService } from './core/guard/user-route-guard.service';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginRouteGuardService] },
    { path: 'admin', component: AdminComponent, canActivate: [AdminRouteGuardService] },
    { path: 'user', component: UserComponent, canActivate: [UserRouteGuardService] },
    { path: 'register', component: UserRegistrationComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }