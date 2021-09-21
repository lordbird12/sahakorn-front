import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './notification.component';




const routes: Routes = [
  { path: '', component: NotificationComponent },
  { path: 'loan', loadChildren: () => import('./loan/loan.module').then(m => m.LoanModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'stock', loadChildren: () => import('./stock/stock.module').then(m => m.StockModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
