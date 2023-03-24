import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInterface} from "../models/user.interface";
import {StorageService} from "./storage.service";

const USER_MAPPING = '/user';

const CURRENT_USER_KEY = 'current-user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private storage: StorageService) {
  }

  public getUserDetails(): Observable<UserInterface> {
    return this.http.get<UserInterface>(USER_MAPPING + "/" + "info");
  }

  public setCurrentUser(user: UserInterface): void {
    this.storage.saveType(CURRENT_USER_KEY, user);
  }

  public getCurrentUser(): UserInterface {
    return <UserInterface>this.storage.getType(CURRENT_USER_KEY);
  }
}
