import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {ICategory} from "../interfaces/category.interface";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService  extends  BaseService<ICategory>{
  override documentName: string = 'categories'

}
