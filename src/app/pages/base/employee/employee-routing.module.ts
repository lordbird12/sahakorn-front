import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ActivateComponent } from './activate/activate.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'form', component: FormComponent },
  { path: 'edit', component: EditComponent },
  { path: 'view', component: ViewComponent },
  { path: 'activate', component: ActivateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
