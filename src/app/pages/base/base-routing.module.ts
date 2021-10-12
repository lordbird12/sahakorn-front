import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base.component';

import { CompanyModule } from '../base/company/company.module';
import { BranchModule } from '../base/branch/branch.module';
import { DivisionModule } from '../base/division/division.module';
import { DepartmentModule } from '../base/department/department.module';
import { PositionModule } from '../base/position/position.module';
import { EmployeeModule } from '../base/employee/employee.module';
import { EmployeeTypeModule } from '../base/employee-type/employee-type.module';
import { GenderModule } from '../base/gender/gender.module';
import { PrefixModule } from '../base/prefix/prefix.module';


const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  { path: 'branch', loadChildren: () => import('./branch/branch.module').then(m => m.BranchModule) },
  { path: 'division', loadChildren: () => import('./division/division.module').then(m => m.DivisionModule) },
  { path: 'department', loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule) },
  { path: 'position', loadChildren: () => import('./position/position.module').then(m => m.PositionModule) },
  { path: 'position-type', loadChildren: () => import('./position-type/position-type.module').then(m => m.PositionTypeModule) },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'employee-type', loadChildren: () => import('./employee-type/employee-type.module').then(m => m.EmployeeTypeModule) },
  { path: 'gender', loadChildren: () => import('./gender/gender.module').then(m => m.GenderModule) },
  { path: 'education', loadChildren: () => import('./education/education.module').then(m => m.EducationModule) },
  { path: 'position-level', loadChildren: () => import('./position-level/position-level.module').then(m => m.PositionLevelModule) },
  { path: 'position-group', loadChildren: () => import('./position-group/position-group.module').then(m => m.PositionGroupModule) },
  { path: 'hospital', loadChildren: () => import('./hospital/hospital.module').then(m => m.HospitalModule) },
  { path: 'religion', loadChildren: () => import('./religion/religion.module').then(m => m.ReligionModule) },
  { path: 'taxbreak', loadChildren: () => import('./taxbreak/taxbreak.module').then(m => m.TaxbreakModule) },
  { path: 'permission', loadChildren: () => import('./permission/permission.module').then(m => m.PermissionModule) },
  { path: 'prefix', loadChildren: () => import('./prefix/prefix.module').then(m => m.PrefixModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
