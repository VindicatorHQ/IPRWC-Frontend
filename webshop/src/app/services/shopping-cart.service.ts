import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "./user.service";
import {ProductOrderInterface} from "../models/product-order.interface";

const PRODUCT_ORDER_MAPPING = '/order';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  public getCurrentUserOrders(): Observable<ProductOrderInterface[]> {
    return this.http.get<ProductOrderInterface[]>(PRODUCT_ORDER_MAPPING + "/search", {
      params: {
        user: this.userService.getCurrentUser().id
      }
    })
  }

  public createProductOrder(productOrder: ProductOrderInterface): Observable<ProductOrderInterface> {
    return this.http.post<ProductOrderInterface>(PRODUCT_ORDER_MAPPING, productOrder, httpOptions);
  }

  public getAllCategories(): Observable<ProductOrderInterface[]> {
    return this.http.get<ProductOrderInterface[]>(PRODUCT_ORDER_MAPPING);
  }

  public getProductOrderById(productOrderId: string): Observable<ProductOrderInterface> {
    return this.http.get<ProductOrderInterface>(PRODUCT_ORDER_MAPPING + "/" + productOrderId);
  }

  public updateProductOrder(productOrder: ProductOrderInterface): Observable<ProductOrderInterface> {
    return this.http.put<ProductOrderInterface>(PRODUCT_ORDER_MAPPING + "/" + productOrder.id, productOrder);
  }

  public deleteProductOrder(productOrderId: string): Observable<String> {
    return this.http.delete(PRODUCT_ORDER_MAPPING + "/" + productOrderId, {responseType: 'text'});
  }
}
