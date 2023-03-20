import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {getJWTToken, StorageService} from "../../services/storage.service";
import {JwtInterface} from "../../models/jwt.interface";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {GlobalErrorHandler} from "../../services/global-error-handler.service";
import {JwtHelperService} from "@auth0/angular-jwt";

const AUTH_MAPPING = '/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService,
    private userService: UserService,
    private errorHandler: GlobalErrorHandler,
    private jwtHelper: JwtHelperService
  ) {
  }

  public isAuthenticated(): boolean {
    return getJWTToken() !== '' && getJWTToken() !== null && getJWTToken() !== undefined;
  }

  hasAdminAuthority(): boolean {
    const token = getJWTToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const claims = this.jwtHelper.decodeToken(token);
      if (claims['authorities'].some((e: { authority: string; }) => e.authority === 'ADMIN')) {
        return true;
      }
    }
    return false;
  }

  async login(email: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post<JwtInterface>(AUTH_MAPPING + 'login', {
        email,
        password
      }, httpOptions).subscribe({
        next: (response) => {
          this.storage.saveJWTToken(response.authToken);
          this.saveCurrentUser();
          resolve();
        },
        error: (err) => {
          this.errorHandler.handleError(err);
          reject();
        }
      });
    });
  }

  async register(name: string, lastName: string, email: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post(AUTH_MAPPING + 'register', {
        email,
        name,
        lastName,
        password
      }, httpOptions).subscribe({
        next: () => {
          resolve();
        },
        error: (err) => {
          this.errorHandler.handleError(err);
          reject();
        }
      });
    });
  }

  saveCurrentUser(): void {
    this.userService.getUserDetails().subscribe({
      next: (response) => {
        this.userService.setCurrentUser(response);
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      }
    })
  }
}
