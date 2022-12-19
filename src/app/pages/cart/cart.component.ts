import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {CartService} from "../../core/services/cart.service";
import {ICart} from "../../core/interfaces/cart.interface";
import {AuthService, OrdersService} from "../../core/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit , OnDestroy{
  carts$: Observable<ICart[]> = this.cartService.carts$
  subs$: Subject<any> = new Subject<any>()
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrdersService,
    private router: Router,
  ) { }



  ngOnInit(): void {

  }

  get total(){
    return this.cartService.totalPrice
  }
  removeFromCart(cart : ICart) {
    this.cartService.removeFromCart(cart)
  }

  checkout(carts :ICart[]) {
      const checkout  = {
        carts,
        total: this.cartService.totalPrice,
        user: this.authService.email
      }
    console.log(checkout)
      this.orderService.create(checkout)
        .pipe(
          takeUntil(this.subs$)
        )
        .subscribe(()=>{
          this.cartService.removeCart()
          this.router.navigate(['/orders'])
        })

  }
  ngOnDestroy(): void {
    this.subs$.next(null);
    this.subs$.complete()
  }
}
