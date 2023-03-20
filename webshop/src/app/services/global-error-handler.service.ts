import {ErrorHandler, Injectable} from "@angular/core";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private snackBar: MatSnackBar) {
  }

  handleError(error: any) {
    switch (error.status) {
      case 401:
        this.snackBar.open("Invalid login credentials", 'Dismiss', {duration: 3000});
        break;
      case 409:
        this.snackBar.open("User with that email already exists.", 'Dismiss', {duration: 3000});
        break;
      default:
        this.snackBar.open("An unexpected error occurred. Please try again later", 'Dismiss', {duration: 3000});
    }
  }
}
