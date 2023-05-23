import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public submitted = false;

  /**
   *
   */
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) {

  }

  get formControl() {
    return this.loginForm?.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: [
        "",
        [
          Validators.required
        ]
      ]
    });
  }

  signUp() {}

  onSubmit() {
    this.authService.getJWTToken(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
  }

  resetLoginForm() {
    this.loginForm.reset();
  }
}
