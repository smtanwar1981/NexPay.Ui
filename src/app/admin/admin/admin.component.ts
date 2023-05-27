import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Contract } from 'src/app/models/contract.model';
import { Constants } from 'src/app/common/constants';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private destroyed$: Subject<any> = new Subject();
  public contracts: Contract[] = [];
  public contractStatusApprove = Constants.contractStatusApproved;
  public contractStatusReject = Constants.contractStatusRejected;

  constructor(private adminService: AdminService) {

  }

  ngOnInit(): void {
    this.fetchContracts();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  updateContractStatusHandler(status: string, contract: Contract) {
    this.adminService.updateContractStatus(contract.contractId, status)
      .pipe(takeUntil(this.destroyed$), catchError((err) => {
        alert('An error occurred while updating contract, please try again later');
        return throwError(err);
      }))
      .subscribe((response: Contract[]) => {
        if (response) {
          alert('Contract status has been updated successfully.');
          this.fetchContracts();
        }
      });
  }

  fetchContracts() {
    this.adminService.getContracts()
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

}
