import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointments.model';
import { User } from '../../auth/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  apiUrl = 'http://localhost:3000/appointments';
  apiUser = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointmentsById(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  saveAppointments(appointment: Appointment): Observable<void> {
    return this.http.post<void>(this.apiUrl, appointment);
  }

  updateAppointments(appointment: Appointment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${appointment.id}`, appointment);
  }

  deleteAppointments(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  cancelAppointment(appointment:Appointment): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/cancel/${appointment.id}`, appointment);
  }

  doneAppointment(appointment:Appointment):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/done/${appointment.id}`, appointment);
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.apiUser) as Observable<User[]>;
  }
}