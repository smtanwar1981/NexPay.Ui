import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistrationRequest } from '../models/user-registration-request.model';
import { UserRegistrationService } from './user-registration.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Router } from '@angular/router';
import { UserRegistrationResponse } from '../models/user-registration-response.model';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  private destroyed$: Subject<any> = new Subject();
  public registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userRegistrationService: UserRegistrationService,
    private router: Router) {

  }

  get formControl() {
    return this.registrationForm?.controls;
  }

  ngOnInit(): void {
    this.initializeRegistrationForm();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  submitRegisteration() {
    let request: UserRegistrationRequest = this.getUserRegistrationRequest();
    this.userRegistrationService.registerUser(request)
      .pipe(takeUntil(this.destroyed$), catchError((err) => {
        alert('An error occurred while registering, please try again later');
        return throwError(err);
      }))
      .subscribe((response: UserRegistrationResponse) => {
        if (response.userRegistered) {
          alert('Registration successful, you will be redirected to login page');
          this.router.navigate(['login']);
        } else {
          alert('Unable to register user, please retry');
          this.resetForm();
        }
      });
  }

  resetForm() {
    this.registrationForm.reset();
  }

  private getUserRegistrationRequest() {
    return {
      firstName: this.registrationForm.controls['firstName'].value,
      lastName: this.registrationForm.controls['lastName'].value,
      email: this.registrationForm.controls['email'].value,
      password: this.registrationForm.controls['password'].value,
      isAdmin: false
    };
  }

  private initializeRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      lastName: [null, []],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, { validators: this.validateAreEqual });
  }

  public validateAreEqual(c: AbstractControl): { notSame: boolean } | null {
    return c.value.password === c.value.confirmPassword ? null : { notSame: true };
  }
}
