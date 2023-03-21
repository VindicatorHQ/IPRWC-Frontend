import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './components/authentication/register/register.component';
import {LoginComponent} from './components/authentication/login/login.component';
import {HomeComponent} from "./components/home/home.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgClass, NgIf} from "@angular/common";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {AccountComponent} from "./components/account/account.component";
import {AuthGuard} from "./components/authentication/auth.guard";
import {RoleGuard} from "./components/authentication/role.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    NgClass,
    NgIf
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [RouterModule, NavbarComponent]
})
export class AppRoutingModule {
}
