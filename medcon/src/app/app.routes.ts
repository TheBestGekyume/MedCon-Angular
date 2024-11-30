import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { SignupComponent } from './modules/auth/components/signup/signup.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { MainComponent } from './modules/appointments/components/main/main.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
    },
    
    {
        path: 'appointments',
        children: [
            {
                path: 'main',
                component: MainComponent,
                children: [],
            },
        ],
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'signup',
                component: SignupComponent,
            },
        ],
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

