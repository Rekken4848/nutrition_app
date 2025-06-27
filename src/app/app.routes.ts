import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Landing } from './landing/landing';
import { Dashboard } from './dashboard/dashboard';
import { Recipes } from './recipes/recipes';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: '', component: Landing},
    { path: 'dashboard', component: Dashboard },
    { path: 'recipes', component: Recipes },
    { path: '**', redirectTo: '' },
    //{ path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
    //{ path: 'dashboard', component: Dashboard },
];