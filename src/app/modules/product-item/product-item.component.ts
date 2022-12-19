import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../../core/interfaces/product.interface";
import {CartService} from "../../core/services/cart.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product!:IProduct
  constructor(
    private cartServ: CartService
  ) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartServ.addCart({
      product: this.product,
      quantity: 1
    }  )
  }
}
