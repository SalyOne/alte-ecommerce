import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {CartService} from "../../../core/services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartCount = 0 ;
  constructor(
    public authService: AuthService,
    public cartServ: CartService
  ) { }
  ngOnInit(): void {
    this.getCartCount()
  }
  getCartCount(){
    this.cartServ.carts$.subscribe(cart=>{
      if(cart){
        this.cartCount = cart.length
      }
    })
  }
  logout() {
    this.authService.logout()
  }
}
