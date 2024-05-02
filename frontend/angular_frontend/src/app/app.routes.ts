import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login', 
        loadComponent: () => import('./my-login/my-login.component').then((c) => c.MyLoginComponent)
    },
    {
        path: 'signup',
        loadComponent: () => import('./my-signup/my-signup.component').then((c) => c.MySignupComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./homepage/homepage.component').then((c) => c.HomepageComponent)
    },
    {
        path: '**', 
        redirectTo: 'login',
    },
    

];
