import {Component, OnInit} from '@angular/core';
import {ProductInterface} from "../../../models/product.interface";
import {ProductService} from "../../../services/product.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {
  public products: ProductInterface[] = [];
  constructor(private productService: ProductService) {
    this.productService = productService;
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

  ngOnInit(): void {
    this.getAllProducts();
  }
}
