import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReligionRoutingModule } from './religion-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [FormComponent, ListComponent, EditComponent],
  imports: [
    CommonModule,
    ReligionRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class ReligionModule { }
