import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages-tabs/pages-tabs.routes').then((m) => m.routes),
  },
  // {
  //   path: 'main',
  //   loadComponent: () => import('./pages/main/main.page').then( m => m.MainPage)
  // }
];
