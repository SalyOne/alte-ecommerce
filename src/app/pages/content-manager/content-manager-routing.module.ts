import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContentManagerComponent} from "./content-manager.component";

const routes: Routes = [
  {
    path:'',
    redirectTo: 'content-manager/products',
    pathMatch: "full"
  },
  {
    path:'',
    component:ContentManagerComponent,
    children:[
      {
        path: 'products',
        loadChildren: () => import('./product-manager/products.module').then(m => m.ProductsModule)
      }, {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
      }
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentManagerRoutingModule { }
