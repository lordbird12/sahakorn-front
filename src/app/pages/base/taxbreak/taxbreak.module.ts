import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxbreakRoutingModule } from './taxbreak-routing.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [EditComponent, ListComponent, FormComponent],
  imports: [
    CommonModule,
    TaxbreakRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class TaxbreakModule { }
