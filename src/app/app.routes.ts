import { Routes } from '@angular/router';
import { HomePageComponent } from '@home/components/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Frontend Starter Kit',
    loadComponent: () => import('@home/components/home-page/home-page.component'),
  },
];
