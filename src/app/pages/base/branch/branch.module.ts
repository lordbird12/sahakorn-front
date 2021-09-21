import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [FormComponent, ListComponent, EditComponent],
  imports: [
    CommonModule,
    BranchRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class BranchModule { }
