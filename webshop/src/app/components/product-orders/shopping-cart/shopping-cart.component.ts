import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../../services/shopping-cart.service";
import {UserService} from "../../../services/user.service";
import {ProductInterface} from "../../../models/product.interface";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public products: any[];
  public productOrder: ProductInterface[];
  public productIds: string[];

  constructor(private shoppingCartService: ShoppingCartService, private userService: UserService, private router: Router) {
    this.products = [];
    this.productIds = [];
    this.productOrder = [];
  }

  ngOnInit(): void {
    this.pushProductsToProductOrder()
  }

  pushProductsToProductOrder(removal?: boolean): void {
    if (this.productOrder.length > 0) {
      this.productOrder = [];
    }

    let keys = Object.keys(localStorage);

    for (let i = 0; i < keys.length; i++) {
      this.products.push(
        JSON.parse(localStorage.getItem(keys[i]) || '{}')
      );
    }

    for (let i = 0; i < this.products.length; i++) {
      const product: ProductInterface = {
        id: this.products[i][0].id,
        name: this.products[i][0].name,
        imageName: this.products[i][0].imageName,
        description: this.products[i][0].description,
        stock: this.products[i][0].stock,
        price: this.products[i][0].price,
        categoryId: this.products[i][0].categoryId,
      };

      this.productOrder.push(product);

      this.productIds.push(this.products[i][0].id);
    }
  }

  removeItem(productKey: ProductInterface): void {
    localStorage.removeItem(productKey.id);

    this.pushProductsToProductOrder(true);
  }

  checkOut(): void {
    this.shoppingCartService.createProductOrder({
      id: "",
      date: this.getCurrentDate(),
      productId: this.productIds[0],
      userId: this.userService.getCurrentUser().id
    }).subscribe(
      () => {
        localStorage.clear();
        this.router.navigate(['/home']).then();
        alert("Your order has been placed!");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getCurrentDate(): string {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + ' ' + time;
  }
}
