import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EducationRoutingModule } from './education-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

import { EditComponent } from './edit/edit.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [FormComponent, ListComponent, EditComponent],
  imports: [
    CommonModule,
    EducationRoutingModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class EducationModule { }
