import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IProduct} from "../interfaces/product.interface";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<IProduct>{
  override documentName: string = 'products'

}
