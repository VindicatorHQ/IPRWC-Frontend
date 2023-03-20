import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {BuildingInterface} from "../models/building.interface";

@Injectable({
  providedIn: 'root'
})

export class AdminPanelService {
  buildingSubject: Subject<BuildingInterface | null> = new Subject<BuildingInterface | null>();

  selectBuilding(building: BuildingInterface | null) {
    this.buildingSubject.next(building);
  }
}
