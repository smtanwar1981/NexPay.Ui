import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { SupportedCurrencies } from "../../models/supported-currencies";
import { Observable } from "rxjs/internal/Observable";
import { ConversionRate } from "../../models/conversion-rate.model";
import { SubmitContractRequest } from "../../models/submit-contract-request.model";
import { SubmitContractResponse } from "../../models/submit-contract-response.model";
import { Contract } from "src/app/models/contract.model";

@Injectable({ providedIn: "root" })
export class AdminService {
    /**
     *
     */
    constructor(private httpClient: HttpClient) {

    }

    getContracts(): Observable<Contract[]> {
        let getContractsListUrl = environment.paymentUrl.toString() + `/Payment/getContracts`;
        return this.httpClient.get<Contract[]>(getContractsListUrl);
    }

    updateContractStatus(contractId: string, contractStatus: string) {
        let request = { contractId: contractId, contractStatus: contractStatus };
        let getContractsListUrl = environment.paymentUrl.toString() + `/Payment/updateContract`;
        return this.httpClient.post(getContractsListUrl, request);
    }
}