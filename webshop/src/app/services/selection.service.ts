import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {CategoryInterface} from "../models/category.interface";
import {ProductInterface} from "../models/product.interface";

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  categorySubject: Subject<CategoryInterface | null> = new Subject<CategoryInterface | null>();
  productSubject: Subject<ProductInterface | null> = new Subject<ProductInterface | null>();

  selectCategory(category: CategoryInterface | null) {
    this.categorySubject.next(category);
  }

  selectProduct(product: ProductInterface | null) {
    this.productSubject.next(product);
  }
}
