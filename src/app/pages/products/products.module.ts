import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path:'',
    component:ProductsComponent
  },
  {
    path:':id',
    component:ProductDetailComponent
  }];


@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ProductsModule { }
