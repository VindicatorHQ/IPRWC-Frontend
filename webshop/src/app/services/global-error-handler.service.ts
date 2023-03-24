import {ErrorHandler, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {
  }

  handleError(error: any) {
    switch (error.status) {
      case 401:
        alert("Invalid login credentials")
        break;
      case 409:
        alert("User with that email already exists.")
        break;
      default:
        alert("An unexpected error occurred. Please try again later")
    }
  }
}
