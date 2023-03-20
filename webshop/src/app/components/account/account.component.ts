import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: any;
  name: any;
  lastName: any;
  email: any;

  constructor(private userService: UserService) {
    this.user = this.userService.getCurrentUser()
  }

  ngOnInit(): void {
    this.name = this.user.name;
    this.lastName = this.user.lastName
    this.email = this.user.email
  }
}
