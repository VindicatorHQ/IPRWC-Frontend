import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BuildingService} from "../../services/building.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.scss']
})
export class BuildingFormComponent {
  public buildingForm: FormGroup;
  public title!: string;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BuildingFormComponent>,
    private buildingService: BuildingService,
    @Inject(MAT_DIALOG_DATA) public building: {
      id: string;
      zipcode: string;
      city: string;
      address: string;
      name: string;
    }
  ) {
    this.buildingForm = this.formBuilder.group({
      zipcode: "",
      city: "",
      address: "",
      name: ""
    })

    this.buildingForm.controls['name'].setValue(this.building.name);
    this.buildingForm.controls['zipcode'].setValue(this.building.zipcode);
    this.buildingForm.controls['city'].setValue(this.building.city);
    this.buildingForm.controls['address'].setValue(this.building.address);
  }


  onSubmit(): void {
    if (!this.building.id) {
      this.createNewBuilding();
    } else {
      this.updateSelectedBuilding();
    }
  }

  public createNewBuilding(): void {
    this.buildingService.createBuilding({
      id: "",
      zipcode: this.buildingForm.get('zipcode')?.value,
      city: this.buildingForm.get('city')?.value,
      address: this.buildingForm.get('address')?.value,
      name: this.buildingForm.get('name')?.value,
    }).subscribe(
      () => {
        this.closeForm()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public updateSelectedBuilding(): void {
    this.buildingService.updateBuilding(
      {
        id: this.building.id,
        zipcode: this.buildingForm.get('zipcode')?.value,
        city: this.buildingForm.get('city')?.value,
        address: this.buildingForm.get('address')?.value,
        name: this.buildingForm.get('name')?.value
      }
    ).subscribe(
      () => {
        this.closeForm();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  closeForm(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (!this.building.id) {
      this.title = "Add Building";
    } else {
      this.title = `Change ${this.building.name}`
    }
  }
}
