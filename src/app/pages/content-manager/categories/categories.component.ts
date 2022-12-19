import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {ProductsService} from "../../../core/services/products.service";
import {Router} from "@angular/router";
import { IProduct } from 'src/app/core/interfaces/product.interface';
import {CategoriesService} from "../../../core/services/categories.service";
import {ICategory} from "../../../core/interfaces/category.interface";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent  implements OnDestroy {
    categories$:Observable<ICategory[]> = this.categoryService.getData()
  sub$ = new Subject();
  constructor(

    private categoryService: CategoriesService,
  ) { }

  deleteCategory(id : string | undefined) {
    id && this.categoryService.delete(id)
      .pipe( takeUntil(this.sub$))
      .subscribe(()=>{
        this.categories$ =  this.categoryService.getData()
      })
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }
}

