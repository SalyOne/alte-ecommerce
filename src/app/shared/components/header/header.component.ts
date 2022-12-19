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
    this.cartServ.carts$.subscribe(carts=>{
      if(carts){
        this.cartCount = carts.reduce((acc:any, item:any)=>{
          return acc + item.quantity
        },0)
      }
    })
  }
  logout() {
    this.authService.logout()
  }
}
