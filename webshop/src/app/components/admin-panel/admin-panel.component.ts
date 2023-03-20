import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  currentBuildingId = "";
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  addBuildingId(newBuildingId: string) {
    this.currentBuildingId = newBuildingId;
  }

}
