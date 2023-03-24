import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../services/category.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  public categoryForm: FormGroup;
  public title!: string;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public category: {
      id: string;
      name: string;
    }
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ""
    })

    this.categoryForm.controls['name'].setValue(this.category.name);
  }

  onSubmit(): void {
    if (!this.category.id) {
      this.createNewCategory();
    } else {
      this.updateSelectedCategory();
    }
  }

  public createNewCategory(): void {
    this.categoryService.createCategory({
      id: "",
      name: this.categoryForm.get('name')?.value
    }).subscribe(
      () => {
        this.closeForm()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public updateSelectedCategory(): void {
    this.categoryService.updateCategory(
      {
        id: this.category.id,
        name: this.categoryForm.get('name')?.value
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
    if (!this.category.id) {
      this.title = "Add Category";
    } else {
      this.title = `Change ${this.category.name}`
    }
  }
}
