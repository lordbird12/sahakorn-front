import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

import { DataTablesModule } from 'angular-datatables';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivateComponent } from './activate/activate.component';


@NgModule({
  declarations: [ListComponent, FormComponent, ViewComponent, EditComponent, ActivateComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
