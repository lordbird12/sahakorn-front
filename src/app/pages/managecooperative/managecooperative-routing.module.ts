import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagecooperativeComponent } from './managecooperative.component';

const routes: Routes = [
  { path: '', component: ManagecooperativeComponent },
  { path: 'cooperative', loadChildren: () => import('./cooperative/cooperative.module').then(m => m.CooperativeModule) },
  { path: 'loantype', loadChildren: () => import('./loantype/loantype.module').then(m => m.LoantypeModule) },
  { path: 'cooperative-board', loadChildren: () => import('./cooperative-board/cooperative-board.module').then(m => m.CooperativeBoardModule) },
  { path: 'cooperative-members', loadChildren: () => import('./cooperative-members/cooperative-members.module').then(m => m.CooperativeMembersModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagecooperativeRoutingModule { }
