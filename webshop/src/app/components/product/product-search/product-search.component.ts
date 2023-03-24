import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductInterface} from "../../../models/product.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../../../services/product.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  @Output() searchedProductsEvent = new EventEmitter<string>();
  public productSearchForm: FormGroup;
  public products: ProductInterface[] = [];
  public resultProducts: ProductInterface[] = [];

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private searchService: SearchService) {
    this.productSearchForm = this.formBuilder.group({
      name: ""
    });
  }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (response: ProductInterface[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onSubmit() {
    let query = this.productSearchForm.get('name')?.value;
    this.resultProducts = [];

    if (query === "") {
      this.getAllProducts();

      return;
    }

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].name.toLowerCase().includes(query.toLowerCase())) {
        this.resultProducts.push(this.products[i])
      }
    }

    if (this.resultProducts.length < 1) {
      return;
    }

    this.searchProducts(this.resultProducts);
  }

  public searchProducts(searchedProducts: ProductInterface[]) {
    this.searchService.searchProduct(searchedProducts);
  }

  ngOnInit(): void {
    this.getAllProducts()
  }
}
