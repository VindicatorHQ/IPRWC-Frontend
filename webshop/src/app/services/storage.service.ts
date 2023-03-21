import {Injectable} from '@angular/core';

const TOKEN_KEY = 'authToken';

export function getJWTToken(): string | null {
  return window.sessionStorage.getItem(TOKEN_KEY);
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  public saveJWTToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveType<T>(key: string, t: T): void {
    window.sessionStorage.setItem(key, JSON.stringify(t));
  }

  public getType<T>(key: string): T | null {
    const typeJson = window.sessionStorage.getItem(key);
    if (typeJson === null) {
      return null;
    }
    return JSON.parse(typeJson);
  }

  public clearStorage() {
    window.sessionStorage.clear()
  }
}
