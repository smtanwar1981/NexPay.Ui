import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { SupportedCurrencies } from '../models/supported-currencies';
import { ConversionRate } from '../models/conversion-rate.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubmitContractRequest } from '../models/submit-contract-request.model';
import { Constants } from '../common/constants';
import { SubmitContractResponse } from '../models/submit-contract-response.model';
import { Contract } from '../models/contract.model';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<any> = new Subject();
  public supportedCurrencies: SupportedCurrencies = Object.assign({});
  public fxRates: ConversionRate = Object.assign({});
  public finalAmount: number;
  public contracts: Contract[] = [];
  public tabOptionAddNewContract = 'addNewContract';
  public tabOptionShowContracts: 'showContracts';
  public showContracts = true;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder) {
  }

  public fxForm!: FormGroup;

  ngOnInit(): void {
    this.getSupportedCurrencies();
    this.initializeForm();
    this.fetchContractsByUserId();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  submitContract() {
    let submitRequest: SubmitContractRequest = this.getSubmitContractRequest();
    this.userService.submitContract(submitRequest)
      .pipe(takeUntil(this.destroyed$), catchError((err) => {
        alert('An error occurred while submitting contract, please try again later');
        return throwError(err);
      }))
      .subscribe((response: SubmitContractResponse) => {
        if (response && response.contractId) {
          alert('Contract submitted successfully');
          this.resetFxForm();
          this.fetchContractsByUserId();
        }
      });
  }

  resetFxForm() {
    this.fxForm.reset();
    this.fxRates = Object.assign({});
  }

  getSupportedCurrencies() {
    this.userService.getSupportedCurrencies()
      .pipe(takeUntil(this.destroyed$), catchError((err) => {
        alert('An error occurred while fetching supported currencies, please try again later');
        return throwError(err);
      }))
      .subscribe((response: SupportedCurrencies) => {
        this.supportedCurrencies = response;
      });
  }

  getFxRate() {
    let fromCurrency = this.fxForm.controls['fromCurrency'].value;
    let toCurrency = this.fxForm.controls['toCurrency'].value;
    this.userService.getExchangeRate(fromCurrency, toCurrency)
      .pipe(takeUntil(this.destroyed$), catchError((err) => {
        alert('An error occurred while fetching exchange rates, please try again later');
        return throwError(err);
      }))
      .subscribe((response: ConversionRate) => {
        this.fxRates = response;
        this.finalAmount = response.conversionRate * this.fxForm.controls['amountToConver'].value;
      });
  }

  tabButtonClickHandler(tabOption: string) {
    if (tabOption == 'addNewContract') {
      this.showContracts = false;
    } else {
      this.showContracts = true;
    }
  }

  resetFormEventEmitterHandler() {
    this.resetFxForm();
  }

  submitContractEventEmitterHandler() {
    this.submitContract();
  }

  getFxRatesEventEmitterHandler() {
    this.getFxRate();
  }

  deleteContractEventEmitterHandler(event) {
    this.userService.deleteContract(event)
      .pipe(takeUntil(this.destroyed$), catchError((err) => {
        alert('An error occurred while deleting contract, please try again later');
        return throwError(err);
      }))
      .subscribe((response: boolean) => {
        if (response) {
          alert('Contract deleted successfully');
          this.fetchContractsByUserId();
        }
      });
  }

  private fetchContractsByUserId() {
    this.userService.getContractsByUserId()
      .pipe(takeUntil(this.destroyed$), catchError((err) => {
        alert('An error occurred while fetching contract, please try again later');
        return throwError(err);
      }))
      .subscribe((response: Contract[]) => {
        if (response) {
          this.contracts = response;
        }
      });
  }

  private getSubmitContractRequest() {
    return {
      conversionRate: this.fxRates.conversionRate,
      finalAmount: this.finalAmount,
      initialAmount: this.fxForm.controls['amountToConver'].value,
      fromCurrencyCode: this.fxForm.controls['fromCurrency'].value,
      toCurrencyCode: this.fxForm.controls['toCurrency'].value,
      contractStatus: Constants.contractStatusNew
    };
  }

  private initializeForm() {
    this.fxForm = this.formBuilder.group({
      fromCurrency: ['-1', [Validators.required, Validators.min(1)]],
      toCurrency: ['-1', [Validators.required, Validators.min(1)]],
      amountToConver: ['', [Validators.required, Validators.min(1)]]
    });
  }
}
