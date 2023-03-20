import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../services/storage.service";
import {Router} from "@angular/router";
import * as CryptoJS from 'crypto-js';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../authentication.scss']
})
export class RegisterComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  repeatPassword = new FormControl('', [Validators.required]);
  registerForm: any;
  hide = true;

  constructor(private authService: AuthService,
              private storage: StorageService,
              private formBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword
    }, {validator: this.passwordMatchValidator})
    this.registerForm.reset();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeatPassword')?.value;

    if (password !== repeatPassword) {
      form.get('repeatPassword')?.setErrors({passwordMismatch: true});
    } else {
      form.get('repeatPassword')?.setErrors(null);
    }
  }

  onSubmit(): void {
    const hashedPassword = CryptoJS.SHA256(this.registerForm.value.password).toString();
    this.authService.register(
      this.registerForm.value.name,
      this.registerForm.value.lastName,
      this.registerForm.value.email,
      hashedPassword
    ).then(() => {
      this.router.navigate(['/login']).then();
      this.snackBar.open("Signed up succesfully! A confirmation link has been sent to your email address.", 'Dismiss', {duration: 6000});
      this.registerForm.reset();
    });
  }
}
