import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentManagerRoutingModule } from './content-manager-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import { ContentManagerComponent } from './content-manager.component';


@NgModule({
  declarations: [
  
    ContentManagerComponent
  ],
  imports: [
    CommonModule,
    ContentManagerRoutingModule,
    ReactiveFormsModule
  ]
})
export class ContentManagerModule { }
