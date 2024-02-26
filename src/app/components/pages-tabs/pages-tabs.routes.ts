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
          import('../../pages/crypto/crypto.page').then((m) => m.CryptoPage),
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
