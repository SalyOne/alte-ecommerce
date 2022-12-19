import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {StorageService} from "./storage.service";
import {ICart} from "../interfaces/cart.interface";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  carts: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  carts$ = this.carts.asObservable()
  constructor(
    private storageServ : StorageService
  ) { }

  initCart(){
    this.carts.next(this.getCart())
  }
  getCart(){
    const cart= this.storageServ.get('cart')
    return cart? JSON.parse(cart) : []
  }
  get totalPrice(){
    const carts = this.getCart()
   return  carts.reduce((total:number, item:any)=>{
      return total + item.product.price* item.quantity
    },0)

  }
  addCart(cartVar: any){
    const carts = this.getCart()
    let quantity = cartVar.quantity || 1;
    const findProd = carts.find((item:any) => item.product.id === cartVar.product.id);
    if(findProd){
      quantity =  findProd.quantity + quantity

      carts.forEach((item:any)=>{
        if(item.product.id === cartVar.product.id){
          item.quantity = quantity
        }
      })
    }else{
      carts.push(cartVar)
    }
    this.storageServ.set('cart', JSON.stringify(carts))
    this.carts.next(carts)
  }
  removeCart(){
    this.carts.next(null)
    this.storageServ.remove('cart')
    this.initCart()
  }

  removeFromCart(cart: ICart) {
    const carts = this.getCart()
    const index =  carts.findIndex((item: any)=> item.product.id === cart.product.id)
    carts.splice(index,1)
    this.storageServ.set('cart', JSON.stringify(carts))
    this.carts.next(carts);
  }
}
