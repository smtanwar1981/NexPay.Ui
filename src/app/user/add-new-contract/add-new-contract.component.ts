import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConversionRate } from 'src/app/models/conversion-rate.model';
import { SupportedCurrencies } from 'src/app/models/supported-currencies';

@Component({
  selector: 'app-add-new-contract',
  templateUrl: './add-new-contract.component.html',
  styleUrls: ['./add-new-contract.component.scss']
})
export class AddNewContractComponent implements OnInit {
  @Input() fxRates: ConversionRate;
  @Input() supportedCurrencies: SupportedCurrencies;
  @Input() fxForm!: FormGroup;
  @Input() finalAmount: number;

  @Output() resetFormEventEmitter = new EventEmitter();
  @Output() submitContractEventEmitter = new EventEmitter();
  @Output() getFxRatesEventEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {

  }

  submitContract() {
    this.submitContractEventEmitter.emit();
  }

  resetFxForm() {
    this.resetFormEventEmitter.emit();
  }

  getFxRate() {
    this.getFxRatesEventEmitter.emit();
  }
}
