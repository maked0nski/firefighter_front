import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

import {LoginService} from "../../services/login.service";
import {TokenStorageService} from "../../../../services";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showPassword: boolean = false;
  emailError: string;


  constructor(
    private loginService: LoginService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ) {
    this._createForm();
  }

  ngOnInit(): void {
  }

  _createForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    })
  }

  login() {
    this.loginService.login(this.loginForm.getRawValue()).subscribe({
      next: (value) => {
        this.tokenStorageService.setToken(value);
        this.router.navigate(['admin']);
      },
      error: e => this.emailError = e.error.message
    })
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
}
