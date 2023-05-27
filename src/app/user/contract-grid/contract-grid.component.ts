import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import { Contract } from 'src/app/models/contract.model';

@Component({
  selector: 'app-contract-grid',
  templateUrl: './contract-grid.component.html',
  styleUrls: ['./contract-grid.component.scss']
})
export class ContractGridComponent implements OnInit {

  @Input() contracts: Contract[] = [];
  @Output() deleteContractEventEmitter = new EventEmitter();
  constructor() {

  }

  ngOnInit(): void {

  }

  deleteContractHandler(contract: Contract) {
    this.deleteContractEventEmitter.emit(contract);
  }
}
