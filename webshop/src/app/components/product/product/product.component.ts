import {Component, Input} from '@angular/core';
import {ProductInterface} from "../../../models/product.interface";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent{
  @Input() product: ProductInterface = {
    id: "",
    name: "",
    imageName: "",
    description: "",
    stock: 0,
    price: 0,
    categoryId: ""
  }

  public products: ProductInterface[] = [];

  constructor() {
  }

  public addToShoppingCart() {
    this.products.push(this.product);

    if (localStorage.getItem(this.product.id)) {
      return alert("This meme is already in your shopping cart!");
    }

    localStorage.setItem(this.product.id, JSON.stringify(this.products));
  }
}
