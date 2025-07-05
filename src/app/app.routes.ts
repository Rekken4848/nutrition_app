import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Landing } from './landing/landing';
import { Dashboard } from './dashboard/dashboard';
import { Recipes } from './recipes/recipes';
import { FoodList } from './food-list/food-list';
import { Profile } from './profile/profile';
import { Kitchen } from './kitchen/kitchen';
import { ScanFood } from './scan-food/scan-food';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: '', component: Landing },
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
    { path: 'recipes', component: Recipes },
    { path: 'foodlist', component: FoodList },
    { path: 'profile', component: Profile },
    { path: 'kitchen', component: Kitchen },
    { path: 'scanfood', component: ScanFood },
    { path: '**', redirectTo: '' },
    //{ path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
    //{ path: 'dashboard', component: Dashboard },
];