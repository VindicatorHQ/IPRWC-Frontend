import {Component} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {StorageService} from "../../../services/storage.service";
import {Router} from "@angular/router";
import * as CryptoJS from "crypto-js";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../authentication.scss']
})
export class LoginComponent {
  loginForm: any;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(private authService: AuthService,
              private storage: StorageService,
              private formBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
    this.loginForm.reset();
  }

  onSubmit(): void {
    const hashedPassword = CryptoJS.SHA256(this.loginForm.value.password).toString();
    this.authService.login(
      this.loginForm.value.email,
      hashedPassword
    ).then(() => {
      this.router.navigate(['/home']).then();
      this.loginForm.reset();
    });
  }
}
