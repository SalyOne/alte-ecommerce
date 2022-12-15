import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IProduct} from "../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  fbDbUrl?: string
  documentName: string = 'products'
  constructor(
    private http:HttpClient
  ) {
    this.fbDbUrl = environment.fbDbUrl;
  }
  getProducts() : Observable<IProduct[]>{
    return this.http.get(`${this.fbDbUrl}/${this.documentName}.json`)
      .pipe(
        map((data :any)=>{
          if(!data) return []
          return  Object.keys(data).map(key=>({
            ...data[key],
            id:key
          }))
        })
      )
  }
  create(product : IProduct):Observable<IProduct>{
    return this.http.post(`${this.fbDbUrl}/${this.documentName}.json`, product)
      .pipe(
        map((data :any)=>{
          return {...product, id:data.name}
        })
      )
  }
  update(product : IProduct):Observable<IProduct>{
    return this.http.patch(`${this.fbDbUrl}/${this.documentName}/${product.id}.json`, product)
      .pipe(
        map(()=>{
          return product
        })
      )
  }
  delete(id : string):Observable<void>{
    return this.http.delete<void>(`${this.fbDbUrl}/${this.documentName}/${id}.json`)
  }

  getById(id : string):Observable<IProduct>{
    return this.http.get<IProduct>(`${this.fbDbUrl}/${this.documentName}/${id}.json`)
      .pipe(
        map((prod : IProduct)=>{
          return {...prod, id: id}
        })
      )
  }

}
