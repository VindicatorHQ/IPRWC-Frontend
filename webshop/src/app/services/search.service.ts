import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ProductInterface} from "../models/product.interface";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  productSubject: Subject<ProductInterface[] | null> = new Subject<ProductInterface[] | null>();

  constructor() {
  }

  searchProduct(product: ProductInterface[] | null) {
    this.productSubject.next(product);
  }
}
