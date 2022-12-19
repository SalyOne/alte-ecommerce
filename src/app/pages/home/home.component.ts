import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../core/services/products.service";
import {Observable, Subject} from "rxjs";
import {IProduct} from "../../core/interfaces/product.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$:Observable< IProduct[]> = this.productService.getData()
  sub$ = new Subject();
  constructor(
    private productService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

}
