import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProductInterface} from "../models/product.interface";
import {Observable} from "rxjs";

const PRODUCT_MAPPING = '/product';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getProductsByCategory(categoryId: string): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(PRODUCT_MAPPING + "/search", {
      params: {
        category: categoryId
      }
    })
  }

  public createProduct(product: ProductInterface): Observable<ProductInterface> {
    return this.http.post<ProductInterface>(PRODUCT_MAPPING, product, httpOptions);
  }

  public getAllProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(PRODUCT_MAPPING);
  }

  public getProductById(productId: string): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(PRODUCT_MAPPING + "/" + productId);
  }

  public updateProduct(product: ProductInterface): Observable<ProductInterface> {
    return this.http.put<ProductInterface>(PRODUCT_MAPPING + "/" + product.id, product);
  }

  public deleteProduct(productId: string): Observable<String> {
    return this.http.delete(PRODUCT_MAPPING + "/" + productId, {responseType: 'text'});
  }
}
