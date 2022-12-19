import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../../core/services/products.service";
import {Router} from "@angular/router";
import {IProduct} from "../../../core/interfaces/product.interface";
import {Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnDestroy {
  products$:Observable< IProduct[]> = this.productService.getData()
  sub$ = new Subject();
  constructor(

    private productService: ProductsService,
    private router: Router,
  ) { }

  ngOnDestroy(): void {
        this.sub$.next(null);
        this.sub$.complete()
    }
  deleteProduct(id : string | undefined) {
   id && this.productService.delete(id)
      .pipe( takeUntil(this.sub$))
      .subscribe(()=>{
        this.products$ =  this.productService.getData()
      })
  }
}
