import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CooperativeRoutingModule } from './cooperative-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [ListComponent, FormComponent, EditComponent],
  imports: [
    CommonModule,
    CooperativeRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class CooperativeModule { }
