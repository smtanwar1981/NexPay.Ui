import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environment";
import { SupportedCurrencies } from "../models/supported-currencies";
import { Observable } from "rxjs/internal/Observable";
import { ConversionRate } from "../models/conversion-rate.model";
import { SubmitContractRequest } from "../models/submit-contract-request.model";
import { SubmitContractResponse } from "../models/submit-contract-response.model";
import { JWTTokenService } from "../core/jwt/jwttoken.service.";
import { Contract } from "../models/contract.model";

@Injectable({ providedIn: "root" })
export class UserService {
    /**
     *
     */
    constructor(private httpClient: HttpClient,
        private jwtTokenService: JWTTokenService) {

    }

    getSupportedCurrencies(): Observable<SupportedCurrencies> {
        let getSupportedCurrenciesUrl = environment.fxUrl.toString() + `/Fx/getCurrencies`;
        return this.httpClient.get<SupportedCurrencies>(getSupportedCurrenciesUrl);
    }

    getExchangeRate(currencyCodeFrom: string, currencyCodeTo: string): Observable<ConversionRate> {
        let getSupportedCurrenciesUrl = environment.fxUrl.toString() + `/Fx/getExchangeRate`;
        let request = { currencyCodeFrom: currencyCodeFrom, currencyCodeTo: currencyCodeTo };
        return this.httpClient.get<ConversionRate>(getSupportedCurrenciesUrl, { params: request });
    }

    submitContract(request: SubmitContractRequest): Observable<SubmitContractResponse> {
        let userEmail: string = this.jwtTokenService.getDecodeToken().email;
        request.userEmail = userEmail;
        let getSubmitContractUrl = environment.paymentUrl.toString() + `/Payment/submitContract`;
        return this.httpClient.post<SubmitContractResponse>(getSubmitContractUrl, request);
    }

    getContractsByUserId(): Observable<Contract[]> {
        let getContractsListUrl = environment.paymentUrl.toString() + `/Payment/getContractsByUserEmail`;
        let userEmail: string = this.jwtTokenService.getDecodeToken().email;
        let request = { userEmail: userEmail };
        return this.httpClient.get<Contract[]>(getContractsListUrl, { params: request });
    }

    deleteContract(contract: Contract): Observable<boolean> {
        let deleteContractListUrl = environment.paymentUrl.toString() + `/Payment/deleteContract?contractId=${contract.contractId}`;
        return this.httpClient.delete<boolean>(deleteContractListUrl);
    }
}