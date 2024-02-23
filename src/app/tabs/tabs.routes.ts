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
          import('../pages/home/home.page').then((m) => m.HomePage),
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
