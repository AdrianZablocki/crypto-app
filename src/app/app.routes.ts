import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/pages-tabs/pages-tabs.routes').then((m) => m.routes),
  }
];
