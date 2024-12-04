import { Component, DestroyRef } from '@angular/core';
import { AppointmentsService } from '../../modules/appointments/services/appointments.service';
import { RouterLink } from '@angular/router';
import { Appointment } from '../../modules/appointments/models/appointments.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { User } from '../../modules/auth/models/user.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  appointments: Appointment[] = []
  userName: string = ''
  users: User[] = []
  currentUserRole:string = '';

  constructor(
    private appointmentsService: AppointmentsService,
    private destroyRef: DestroyRef,
  ) { }


  ngOnInit(): void {
    this.loadData();
    this.currentUserRole = sessionStorage.getItem('userRole') || '';
  }

  loadData(): void {
    forkJoin({
      users: this.appointmentsService.getUsers(),
      appointments: this.appointmentsService.getAppointments(),
    }).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ users, appointments }) => {
          this.users = users;
          this.appointments = appointments;
          console.log('Dados carregados:', { users, appointments });
        },
        error: (err) => {
          console.error('Erro ao carregar os dados:', err);
          alert('Erro ao carregar os dados. Tente novamente mais tarde.');
        },
      });
  }


  deleteAppointment(id: string): void {
    if (confirm("Deseja deletar o agendamento?")) {
      this.appointmentsService
        .deleteAppointments(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          complete: () => {
            this.loadData();
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  doneAppointment(appointment: Appointment): void {
    if (confirm("Deseja marcar o agendamento como concluído?")) {
      this.appointmentsService
        .doneAppointment(appointment)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          complete: () => {
            this.loadData()
          },
          error: (error) => {
            console.log(error);
          },
        })
    }
  }

  cancelAppointment(appointment: Appointment): void {
    if (confirm("Deseja cancelar o agendamento ?")) {
      this.appointmentsService
        .cancelAppointment(appointment)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          complete: () => {
            this.loadData()
          },
          error: (error) => {
            console.log(error);
          },
        })
    }
  }

}
