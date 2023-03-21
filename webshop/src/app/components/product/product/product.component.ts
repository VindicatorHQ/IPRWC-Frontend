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
    price: 0
  }

  constructor() {
  }

  public addToShoppingCart() {

  }
}
