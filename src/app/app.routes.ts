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
import { AiAssistant } from './ai-assistant/ai-assistant';
import { BodyScale } from './body-scale/body-scale';
import { guestGuard } from './auth/guest-guard';

export const routes: Routes = [
    { path: 'login', component: Login, canActivate: [guestGuard] },
    { path: '', component: Landing, canActivate: [guestGuard] },

    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
    { path: 'recipes', component: Recipes, canActivate: [authGuard] },
    { path: 'foodlist', component: FoodList, canActivate: [authGuard] },
    { path: 'profile', component: Profile, canActivate: [authGuard] },
    { path: 'kitchen', component: Kitchen, canActivate: [authGuard] },
    { path: 'scanfood', component: ScanFood, canActivate: [authGuard] },
    { path: 'aiassistant', component: AiAssistant, canActivate: [authGuard] },
    { path: 'bodyscale', component: BodyScale, canActivate: [authGuard] },

    { path: '**', redirectTo: '' },
    //{ path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
    //{ path: 'dashboard', component: Dashboard },
];