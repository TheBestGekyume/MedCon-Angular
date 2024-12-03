import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { SecurityService } from '../services/security.service';

export const rolesGuard: CanActivateFn = (activatedRoute) => {
  
  return inject(SecurityService)
    .checkUserRoles()
    .pipe(
      map((userRole) => {
        const userCanDo = activatedRoute.data['roles'].includes(userRole);
        return userCanDo
          ? true
          : createUrlTreeFromSnapshot(activatedRoute, ['/appointments/']);
      })
    );
};