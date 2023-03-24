import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentCategoryId = "";
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  addCategoryId(newCategoryId: string) {
    this.currentCategoryId = newCategoryId;
  }
}
