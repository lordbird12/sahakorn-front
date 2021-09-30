
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckLoginGuard } from '@shared/guards/check-login.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule) },
  {
    path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then((m) => m.LoginModule),
  },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'base', loadChildren: () => import('./pages/base/base.module').then(m => m.BaseModule) },
  { path: 'notification', loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule)},
  { path: 'reports', loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule) },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule) },
  { path: 'forgot', loadChildren: () => import('./pages/auth/forgot/forgot.module').then(m => m.ForgotModule) },
  { path: 'managecooperative', loadChildren: () => import('./pages/managecooperative/managecooperative.module').then(m => m.ManagecooperativeModule) },
  {
    path: '**', loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
