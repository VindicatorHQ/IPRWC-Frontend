import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../../services/product.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public productForm: FormGroup;
  public title!: string;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public product: {
      id: string;
      name: string;
      imageName: string;
      description: string;
      stock: number;
      price: number;
    }
  ) {
    this.productForm = this.formBuilder.group({
      name: "",
      imageName: "",
      description: "",
      stock: "",
      price: "",
    })

    this.productForm.controls['name'].setValue(this.product.name);
    this.productForm.controls['imageName'].setValue(this.product.imageName);
    this.productForm.controls['description'].setValue(this.product.description);
    this.productForm.controls['stock'].setValue(this.product.stock);
    this.productForm.controls['price'].setValue(this.product.price);
  }

  onSubmit(): void {
    if (!this.product.id) {
      this.createNewProduct();
    } else {
      this.updateSelectedProduct();
    }
  }

  public createNewProduct(): void {
    this.productService.createProduct({
      id: "",
      name: this.productForm.get('name')?.value,
      imageName: this.productForm.get('imageName')?.value,
      description: this.productForm.get('description')?.value,
      stock: this.productForm.get('stock')?.value,
      price: this.productForm.get('price')?.value,
    }).subscribe(
      () => {
        this.closeForm()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public updateSelectedProduct(): void {
    this.productService.updateProduct(
      {
        id: this.product.id,
        name: this.productForm.get('name')?.value,
        imageName: this.productForm.get('imageName')?.value,
        description: this.productForm.get('description')?.value,
        stock: this.productForm.get('stock')?.value,
        price: this.productForm.get('price')?.value,
      }
    ).subscribe(
      () => {
        this.closeForm();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  closeForm(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (!this.product.id) {
      this.title = "Add Product";
    } else {
      this.title = `Change ${this.product.name}`
    }
  }
}
