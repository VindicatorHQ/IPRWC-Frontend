import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductInterface} from "../../../models/product.interface";
import {ProductService} from "../../../services/product.service";
import {ProductFormComponent} from "../product-form/product-form.component";

@Component({
  selector: 'app-product-admin-panel',
  templateUrl: './product-admin-panel.component.html',
  styleUrls: ['./product-admin-panel.component.css']
})
export class ProductAdminPanelComponent implements OnInit {
  @Input() productId: string = "";
  public products: ProductInterface[] = [];
  public columns: number = 0;

  constructor(private productService: ProductService, public dialog: MatDialog) {
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
        price: product?.price
      },
    });

    productForm.afterClosed().subscribe(() => {
      this.getAllProducts();
    })
  }

  public getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: ProductInterface[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteProduct(product: ProductInterface): void {
    this.productService.deleteProduct(product.id).subscribe(
      () => {
        this.getAllProducts();
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
    this.getAllProducts();
    this.calculateBreakpoint();
  }

  onResize(): void {
    this.calculateBreakpoint()
  }
}
