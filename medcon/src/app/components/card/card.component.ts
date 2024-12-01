import { Component, DestroyRef, OnInit } from '@angular/core';
import { AppointmentsService } from '../../modules/appointments/services/appointments.service';
import { Router, RouterLink } from '@angular/router';
import { Appointment } from '../../modules/appointments/models/appointments.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  appointments: Appointment[] = []

  constructor(
    private appointmentsService:AppointmentsService,
    private destroyRef: DestroyRef,
    private router: Router
  ){}

  ngOnInit():void{
    this.getAppointments();
  }

  getAppointments():void{
    this.appointmentsService
      .getAppointments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.appointments = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteAppointment(id:string):void{
    this.appointmentsService
    .deleteAppointments(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      complete:()=>{
        this.getAppointments()
      },
      error:(error) =>{
        console.log(error);
      },
    })
  }

}
