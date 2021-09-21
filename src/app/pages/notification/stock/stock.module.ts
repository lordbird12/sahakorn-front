import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [ListComponent, EditComponent, FormComponent],
  imports: [
    CommonModule,
    StockRoutingModule
  ]
})
export class StockModule { }
