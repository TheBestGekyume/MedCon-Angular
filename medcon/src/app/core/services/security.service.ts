import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRoles } from '../constants/user-roles.enum';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  checkAuthStatus(): Observable<boolean> {
    const token = sessionStorage.getItem('userToken');
    this.isLoggedIn$.next(!!token);
    return this.isLoggedIn$;
  }

  checkUserRoles(): Observable<UserRoles> {
    const role =
      (sessionStorage.getItem('userRole') as UserRoles) ?? UserRoles.USER;
    return new Observable<UserRoles>((observer) => observer.next(role));
  }
}