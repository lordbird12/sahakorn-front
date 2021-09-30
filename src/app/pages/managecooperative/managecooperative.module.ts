import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagecooperativeRoutingModule } from './managecooperative-routing.module';
import { ManagecooperativeComponent } from './managecooperative.component';



@NgModule({
  declarations: [ManagecooperativeComponent],
  imports: [
    CommonModule,
    ManagecooperativeRoutingModule
  ]
})
export class ManagecooperativeModule { }



