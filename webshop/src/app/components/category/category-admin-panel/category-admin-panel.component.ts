import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryInterface} from "../../../models/category.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {CategoryService} from "../../../services/category.service";
import {CategoryFormComponent} from "../category-form/category-form.component";
import {SelectionService} from "../../../services/selection.service";

@Component({
  selector: 'app-category-admin-panel',
  templateUrl: './category-admin-panel.component.html',
  styleUrls: ['./category-admin-panel.component.css']
})
export class CategoryAdminPanelComponent implements OnInit {
  @Input() categoryId: string = "";
  @Output() selectedCategoryEvent = new EventEmitter<string>();
  selectedCategory: CategoryInterface | null = null;
  public categories: CategoryInterface[] = [];

  constructor(private categoryService: CategoryService, public dialog: MatDialog, private selectionService: SelectionService) {
    this.categoryService = categoryService;
  }

  openForm(category?: CategoryInterface): void {
    const categoryForm = this.dialog.open(CategoryFormComponent, {
      data: {
        id: category?.id,
        name: category?.name
      },
    });

    categoryForm.afterClosed().subscribe(() => {
      this.getAllCategories();
    })
  }

  public getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: CategoryInterface[]) => {
        this.categories = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteCategory(category: CategoryInterface): void {
    this.categoryService.deleteCategory(category.id).subscribe(
      () => {
        this.getAllCategories();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  selectCategory(category: CategoryInterface) {
    this.selectionService.selectCategory(category);
  }
}
