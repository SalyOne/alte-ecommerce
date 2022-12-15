import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentManagerRoutingModule } from './content-manager-routing.module';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { ProductAddEditComponent } from './product-manager/components/product-add-edit/product-add-edit.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProductManagerComponent,
    ProductAddEditComponent
  ],
  imports: [
    CommonModule,
    ContentManagerRoutingModule,
    ReactiveFormsModule
  ]
})
export class ContentManagerModule { }
