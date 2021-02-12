import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
  {
    path: 'welcome',
    pathMatch: 'full',
    data: {
      root: true,
    },
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('./editor/editor.module').then((m) => m.EditorModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'mypage/:id',
        loadChildren: () =>
          import('./mypage/mypage.module').then((m) => m.MypageModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'detail/:noteId',
        loadChildren: () =>
          import('./detail/detail.module').then((m) => m.DetailModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
