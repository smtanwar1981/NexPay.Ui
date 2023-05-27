import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JWTTokenService } from "../core/jwt/jwttoken.service.";
import { environment } from "../environment";
import { UserRegistrationRequest } from "../models/user-registration-request.model";
import { Observable } from "rxjs/internal/Observable";
import { UserRegistrationResponse } from "../models/user-registration-response.model";


@Injectable({ providedIn: 'root' })
export class UserRegistrationService {
    constructor(private httpClient: HttpClient) {
    }

    registerUser(request: UserRegistrationRequest): Observable<UserRegistrationResponse> {
        let userRegisterationApiUrl = environment.loginApiUrl.toString() + `/User/registerUser`;
        return this.httpClient.post<UserRegistrationResponse>(userRegisterationApiUrl, request);
    }
}