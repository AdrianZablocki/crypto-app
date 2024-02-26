import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'main',
        loadComponent: () =>
          import('../pages/crypto/crypto.page').then((m) => m.CryptoPage),
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
