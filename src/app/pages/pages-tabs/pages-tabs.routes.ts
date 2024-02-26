import { Routes } from '@angular/router';
import { PagesTabsComponent } from './pages-tabs.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesTabsComponent,
    children: [
      {
        path: 'main',
        loadComponent: () =>
          import('../main/main.page').then((m) => m.MainPage),
      },
      {
        path: 'crypto',
        loadComponent: () =>
          import('../crypto/crypto.page').then((m) => m.CryptoPage),
      },
      {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
];
