import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { SignupComponent } from './modules/auth/components/signup/signup.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { MainComponent } from './modules/appointments/components/main/main.component';
import { authGuard } from './core/guards/auth.guard';
import { AppointmentsCreateComponent } from './modules/appointments/components/appointments-create/appointments-create.component';
import { rolesGuard } from './core/guards/roles.guard';
import { UserRoles } from './core/constants/user-roles.enum';

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
                path: '',
                component: MainComponent,
                children: [],
                canActivate: [authGuard],
            },
            {
                path: 'create',
                component: AppointmentsCreateComponent,
                canActivate: [authGuard, rolesGuard],
                data: {
                    roles: [UserRoles.ADMIN],
                }
            },
            {
                path: 'edit/',
                component: AppointmentsCreateComponent,
                canActivate: [authGuard, rolesGuard],
                data: {
                    roles: [UserRoles.ADMIN],
                }
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

