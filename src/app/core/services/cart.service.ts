import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  carts: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  carts$ = this.carts.asObservable()
  constructor(
    private storageServ : StorageService
  ) { }

  getCart(){
    const cart= this.storageServ.get('cart')
    return cart? JSON.parse(cart) : []
  }

  addCart(product: any){
    const cart = this.getCart()

    const carts= [...cart, {...product, quantity: 1}]
    this.storageServ.set('cart', JSON.stringify(carts))
    this.carts.next(carts)
  }
  removeCart(product: any){
    this.carts.next(null)
  }
}
