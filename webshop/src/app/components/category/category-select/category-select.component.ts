import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryInterface} from "../../../models/category.interface";
import {SelectionService} from "../../../services/selection.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryService} from "../../../services/category.service";
import {ProductService} from "../../../services/product.service";
import {coerceStringArray} from "@angular/cdk/coercion";

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.css']
})
export class CategorySelectComponent implements OnInit {
  @Input() categoryId: string = "";
  @Output() selectedCategoryEvent = new EventEmitter<string>();
  selectedCategory: CategoryInterface | null = null;
  public categories: CategoryInterface[] = [];

  constructor(private selectionService: SelectionService, private categoryService: CategoryService) {
    this.categoryService = categoryService;
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

  private getCategoryById(categoryId: string) {
    this.categoryService.getCategoryById(categoryId).subscribe(
      (response: CategoryInterface) => {
        this.selectionService.selectCategory(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  onSelectCategory(value: any) {
    let categoryId = value.target.value;

    this.getCategoryById(categoryId);
  }

  resetProductList() {
    this.selectionService.selectCategory(null);
  }
}
