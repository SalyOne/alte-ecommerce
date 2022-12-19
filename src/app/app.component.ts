import {Component, OnInit} from '@angular/core';
import {CartService} from "./core/services/cart.service";

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit{
  title = 'angLesson18-ECommerce';

  constructor(
    private cartServ: CartService
  ) {
  }

  ngOnInit(): void {
    this.cartServ.initCart()
  }
}
