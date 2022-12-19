import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../../core/services";
import {IProduct} from "../../../core/interfaces/product.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntil} from "rxjs";
import {CartService} from "../../../core/services/cart.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product? : IProduct;
  productId? : string
  quantity = 1;
  errorQuantity?: string;
  constructor(
    private prodService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.productId= params['id']
        this.getProduct()
      })
  }
   getProduct(){
     this.prodService.getById(this.productId)
       .subscribe((product)=>{
         this.product = product
       })
   }

  addToCart() {
    if (!this.product) return;
    if (this.quantity <= 0) {
      this.errorQuantity = 'Quantity must be greater than 0'
      return
    }
    this.cartService.addCart({
      product: this.product,
      quantity: this.quantity
    })
  }
}
