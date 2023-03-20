import {Component} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../authentication/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private storageService: StorageService, private router: Router, private auth: AuthService) {
  }

  logout() {
    this.storageService.clearStorage()
    this.navigateToLogin()
  }

  navigateToLogin(): void {
    this.router.navigate(['login']).then();
  }

  hasAdminAuthority(): boolean {
    return this.auth.hasAdminAuthority();
  }
}
