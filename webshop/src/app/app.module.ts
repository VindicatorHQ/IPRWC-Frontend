import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {AccountComponent} from './components/account/account.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import {BuildingFormComponent} from "./components/building-form/building-form.component";
import {BuildingAdminPanelComponent} from "./components/building-admin-panel/building-admin-panel.component";
import {MatSelectModule} from "@angular/material/select";
import {AuthenticationModule} from "./components/authentication/authentication.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {GlobalErrorHandler} from "./services/global-error-handler.service";
import {interceptorProviders} from "./helpers/interceptorProviders";
import {AuthService} from "./components/authentication/auth.service";
import {RoleGuard} from "./components/authentication/role.guard";
import {AuthGuard} from "./components/authentication/auth.guard";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ProductComponent} from './components/product/product/product.component';
import {CategoryComponent} from './components/category/category/category.component';
import {ProductFormComponent} from './components/product/product-form/product-form.component';
import {ProductAdminPanelComponent} from './components/product/product-admin-panel/product-admin-panel.component';
import {CategoryAdminPanelComponent} from './components/category/category-admin-panel/category-admin-panel.component';
import {CategoryFormComponent} from './components/category/category-form/category-form.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {ProductOverviewComponent} from './components/product/product-overview/product-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    BuildingFormComponent,
    BuildingAdminPanelComponent,
    AdminPanelComponent,
    ProductComponent,
    CategoryComponent,
    ProductFormComponent,
    ProductAdminPanelComponent,
    CategoryAdminPanelComponent,
    CategoryFormComponent,
    ShoppingCartComponent,
    ProductOverviewComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [interceptorProviders, GlobalErrorHandler, DatePipe, AuthService, RoleGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
