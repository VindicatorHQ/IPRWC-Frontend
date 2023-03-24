import {Component, OnInit} from '@angular/core';
import {ProductOrderInterface} from "../../../models/product-order.interface";
import {ProductInterface} from "../../../models/product.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {ShoppingCartService} from "../../../services/shopping-cart.service";

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {
  public productOrders: ProductOrderInterface[] = [];
  constructor(private productOrderService: ShoppingCartService) {
  }
  ngOnInit(): void {
    this.getOrdersFromUser();
  }

  public cancelOrder(order: ProductOrderInterface): void {
    this.productOrderService.deleteProductOrder(order.id).subscribe(
      () => {
        this.getOrdersFromUser();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getOrdersFromUser() {
    this.productOrderService.getCurrentUserOrders().subscribe(
      (response: ProductOrderInterface[]) => {
        this.productOrders = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      })
  }

}
