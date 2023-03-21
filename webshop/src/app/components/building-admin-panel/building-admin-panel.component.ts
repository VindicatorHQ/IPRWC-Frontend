import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BuildingInterface} from "../../models/building.interface";
import {BuildingService} from "../../services/building.service";
import {MatDialog} from "@angular/material/dialog";
import {BuildingFormComponent} from "../building-form/building-form.component";
import {HttpErrorResponse} from "@angular/common/http";
import {AdminPanelService} from "../../services/admin-panel.service";

@Component({
  selector: 'app-building-admin-panel',
  templateUrl: './building-admin-panel.component.html',
  styleUrls: ['./building-admin-panel.component.scss']
})
export class BuildingAdminPanelComponent {
  @Input() buildingId: string = "";
  @Output() selectedBuildingEvent = new EventEmitter<string>();
  selectedBuilding: BuildingInterface | null = null;
  public buildings: BuildingInterface[] = [];
  public columns: number = 0;

  constructor(private buildingService: BuildingService, public dialog: MatDialog, private adminPanelService: AdminPanelService) {
    this.buildingService = buildingService;
  }

  addBuildingIdToFloor(value: string) {
    this.selectedBuildingEvent.emit(value);
  }

  openForm(building?: BuildingInterface): void {
    const buildingForm = this.dialog.open(BuildingFormComponent, {
      data: {
        id: building?.id,
        name: building?.name,
        zipcode: building?.zipcode,
        address: building?.address,
        city: building?.city
      },
    });

    buildingForm.afterClosed().subscribe(() => {
      this.getAllBuildings();
    })
  }

  public getAllBuildings(): void {
    this.buildingService.getAllBuildings().subscribe(
      (response: BuildingInterface[]) => {
        this.buildings = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteBuilding(building: BuildingInterface): void {
    this.buildingService.deleteBuilding(building.id).subscribe(
      () => {
        this.getAllBuildings();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  calculateBreakpoint(): void {
    switch (true) {
      case (window.innerWidth <= 640):
        this.columns = 1;
        break;
      case (window.innerWidth > 640 && window.innerWidth <= 1024):
        this.columns = 2;
        break;
      default:
        this.columns = 3;
    }
  }

  ngOnInit(): void {
    this.getAllBuildings();
    this.calculateBreakpoint()
  }

  onResize(): void {
    this.calculateBreakpoint()
  }

  selectBuilding(building: BuildingInterface) {
    this.adminPanelService.selectBuilding(building);
  }

}
