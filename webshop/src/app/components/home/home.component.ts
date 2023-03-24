import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ProductInterface} from "../../models/product.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentCategoryId = "";
  products: ProductInterface[] = [];
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  addCategoryId(newCategoryId: string) {
    this.currentCategoryId = newCategoryId;
  }

  searchedProducts(resultProducts: ProductInterface[]) {
    this.products = resultProducts;
  }
}
