import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { FormComponent } from './form/form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [ListComponent, EditComponent, FormComponent],
  imports: [
    CommonModule,
    LoanRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class LoanModule { }
