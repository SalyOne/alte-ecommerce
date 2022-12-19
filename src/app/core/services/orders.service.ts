import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService<any>{
  override documentName: string = 'orders'

}
