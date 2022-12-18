import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';
import {RouterModule, Routes} from "@angular/router";

const categoryRoutes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  },
  {
    path: 'add',
    component: CategoryAddEditComponent
  },
  {
    path: 'edit/:id',
    component: CategoryAddEditComponent
  },
]

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryAddEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(categoryRoutes)
  ]
})
export class CategoriesModule { }
