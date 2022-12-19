import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {ICategory} from "../interfaces/category.interface";

export interface  Base{
  documentName: string

}
@Injectable()
export class BaseService<T> {
  fbDbUrl?: string = environment.fbDbUrl
  documentName!: string;
  http = inject(HttpClient)

  getData() : Observable<T[]>{
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

  create(item : T):Observable<T>{
    return this.http.post(`${this.fbDbUrl}/${this.documentName}.json`, item)
      .pipe(
        map((data :any)=>{
          return {...item, id:data.name}
        })
      )
  }
  update(id: string , item : T):Observable<T>{
    return this.http.patch(`${this.fbDbUrl}/${this.documentName}/${id}.json`, item)
      .pipe(
        map(()=>{
          return item
        })
      )
  }
  delete(id : string):Observable<void>{
    return this.http.delete<void>(`${this.fbDbUrl}/${this.documentName}/${id}.json`)
  }

  getById(id? : string):Observable<T>{
    return this.http.get<T>(`${this.fbDbUrl}/${this.documentName}/${id}.json`)
      .pipe(
        map((item  : T)=>{
          return {...item , id: id}
        })
      )
  }

}
