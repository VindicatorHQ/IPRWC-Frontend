import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {BuildingInterface} from "../models/building.interface";

const BUILDING_MAPPING = '/building';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private buttonClicked = new BehaviorSubject<boolean>(false);
  currentbuttonClicked$ = this.buttonClicked.asObservable();
  private selectedBuilding = new BehaviorSubject<BuildingInterface>({
    id: "",
    zipcode: "",
    city: "",
    address: "",
    name: ""
  })
  currentSelectedBuilding$ = this.selectedBuilding.asObservable();

  constructor(private http: HttpClient) {
  }

  public createBuilding(building: BuildingInterface): Observable<BuildingInterface> {
    return this.http.post<BuildingInterface>(BUILDING_MAPPING, building, httpOptions);
  }

  public getAllBuildings(): Observable<BuildingInterface[]> {
    return this.http.get<BuildingInterface[]>(BUILDING_MAPPING);
  }

  public getBuildingById(buildingId: string): Observable<BuildingInterface> {
    return this.http.get<BuildingInterface>(BUILDING_MAPPING + "/" + buildingId);
  }

  public deleteBuilding(buildingId: string): Observable<String> {
    return this.http.delete(BUILDING_MAPPING + "/" + buildingId, {responseType: 'text'});
  }

  public updateBuilding(building: BuildingInterface): Observable<BuildingInterface> {
    return this.http.put<BuildingInterface>(BUILDING_MAPPING + "/" + building.id, building);
  }

  public patchBuilding(buildingId: string): Observable<BuildingInterface> {
    return this.http.patch<BuildingInterface>(BUILDING_MAPPING + "/" + buildingId, buildingId);
  }

  sendButtonClicked(boolean: boolean): void {
    this.buttonClicked.next(boolean)
  }

  sendSelectedBuilding(building: BuildingInterface): void {
    this.selectedBuilding.next(building)
  }

}
