import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports:[
    ProductItemComponent
  ]
})
export class ProductItemModule { }
