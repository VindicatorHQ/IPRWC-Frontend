import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  currentCategoryId = "";
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  addCategoryId(newCategoryId: string) {
    console.log(this.currentCategoryId)
    this.currentCategoryId = newCategoryId;
    console.log(newCategoryId)
  }
}
