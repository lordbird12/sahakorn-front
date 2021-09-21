import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { UserGroupRoutingModule } from './user-group-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [ListComponent, EditComponent, FormComponent],
  imports: [
    CommonModule,
    UserGroupRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class UserGroupModule { }
