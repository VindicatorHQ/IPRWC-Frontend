import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductInterface} from "../../../models/product.interface";
import {ProductService} from "../../../services/product.service";
import {ProductFormComponent} from "../product-form/product-form.component";
import {CategoryInterface} from "../../../models/category.interface";
import {AdminPanelService} from "../../../services/admin-panel.service";

@Component({
  selector: 'app-product-admin-panel',
  templateUrl: './product-admin-panel.component.html',
  styleUrls: ['./product-admin-panel.component.css']
})
export class ProductAdminPanelComponent implements OnInit {
  @Input() categoryId: string = "";
  @Output() selectedProductEvent = new EventEmitter<string>();
  selectedCategory: CategoryInterface | null = null;
  public products: ProductInterface[] = [];
  public categories: CategoryInterface[] = [];

  constructor(private productService: ProductService, public dialog: MatDialog, private adminPanelService: AdminPanelService) {
    this.productService = productService;
  }

  openForm(product?: ProductInterface): void {
    const productForm = this.dialog.open(ProductFormComponent, {
      data: {
        id: product?.id,
        name: product?.name,
        imageName: product?.imageName,
        description: product?.description,
        stock: product?.stock,
        price: product?.price,
        categoryId: this.selectedCategory?.id
      },
    });

    productForm.afterClosed().subscribe(() => {
      this.getProductsFromCategory();
    })
  }

  public getProductsFromCategory(): void {
    if (this.selectedCategory == null) {
      this.products = [];

      return;
    }

    this.productService.getProductsByCategory(this.selectedCategory.id).subscribe(
      (response: ProductInterface[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deleteProduct(product: ProductInterface): void {
    this.productService.deleteProduct(product.id).subscribe(
      () => {
        this.getProductsFromCategory();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit(): void {
    this.getProductsFromCategory();
    this.adminPanelService.categorySubject.subscribe(
      (response: CategoryInterface | null) => {
        this.selectCategory(response);
      }
    )
  }

  selectCategory(category: CategoryInterface | null) {
    this.selectedCategory = category;
    this.adminPanelService.selectProduct(null);
    this.getProductsFromCategory();
  }
}
