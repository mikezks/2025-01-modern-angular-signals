import { Routes } from '@angular/router';
import { HomeComponent } from './shared/feature-core';


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking')
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
