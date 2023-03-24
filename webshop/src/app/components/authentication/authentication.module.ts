import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {JwtModule} from "@auth0/angular-jwt";
import {getJWTToken} from "../../services/storage.service";
import {AppRoutingModule} from "../../app-routing.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink,
    MatCardModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getJWTToken
      },
    }),
    AppRoutingModule
  ]
})
export class AuthenticationModule {
}
