import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductInterface} from "../../../models/product.interface";
import {ProductService} from "../../../services/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryInterface} from "../../../models/category.interface";
import {SelectionService} from "../../../services/selection.service";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {
  @Input() categoryId: string = "";
  @Input() searchedProducts: ProductInterface[] = []
  @Output() selectedProductEvent = new EventEmitter<string>();
  selectedCategory: CategoryInterface | null = null;
  public products: ProductInterface[] | null = [];

  constructor(private productService: ProductService, private selectionService: SelectionService, private searchService: SearchService) {
    this.productService = productService;
  }

  public getProducts(): void {
    if (this.selectedCategory?.id) {
      this.getAllProductsFromCategory()
    } else {
      this.getAllProducts()
    }
  }

  ngOnInit(): void {
    this.getProducts();

    this.searchService.productSubject.subscribe(
      (response: ProductInterface[] | null) => {
        this.searchProducts(response);
      }
    );

    this.selectionService.categorySubject.subscribe(
      (response: CategoryInterface | null) => {
        this.selectCategory(response);
      }
    );
  }

  searchProducts(products: ProductInterface[] | null) {
    this.products = products;
  }

  selectCategory(category: CategoryInterface | null) {
    this.selectedCategory = category;
    this.selectionService.selectProduct(null);
    this.getProducts();
  }

  private getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (response: ProductInterface[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private getAllProductsFromCategory() {
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
    );
  }
}
