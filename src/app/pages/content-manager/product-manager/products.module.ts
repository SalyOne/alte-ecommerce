import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductManagerComponent} from "./product-manager.component";
import {ProductAddEditComponent} from "./components/product-add-edit/product-add-edit.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CategoriesComponent} from "../categories/categories.component";
import {CategoryAddEditComponent} from "../categories/category-add-edit/category-add-edit.component";

const  routes = [
  {
    path: '',
    component: ProductManagerComponent
  },
  {
    path: 'add',
    component: ProductAddEditComponent
  },
  {
    path: 'edit/:id',
    component: ProductAddEditComponent
  },
]
@NgModule({
  declarations: [
    ProductManagerComponent,
    ProductAddEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
