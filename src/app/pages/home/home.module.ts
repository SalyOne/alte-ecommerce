import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {RouterModule} from "@angular/router";
import {ProductItemModule} from "../../modules/product-item/product-item.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        RouterModule,
        ProductItemModule,
    ]
})
export class HomeModule { }
