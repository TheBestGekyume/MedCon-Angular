import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserAuthenticated } from '../models/user-authenticated.model';
import { UserCredentials } from '../models/user-credentials.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  
  register(user: User): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, user);
  }

  login(credentials: UserCredentials): Observable<UserAuthenticated> {
    return this.http.post<UserAuthenticated>(
      `${this.apiUrl}/login`,
      credentials
    );
  }
  
}
