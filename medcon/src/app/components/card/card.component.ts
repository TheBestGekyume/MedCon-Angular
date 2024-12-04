import { Component, DestroyRef} from '@angular/core';
import { AppointmentsService } from '../../modules/appointments/services/appointments.service';
import { RouterLink } from '@angular/router';
import { Appointment } from '../../modules/appointments/models/appointments.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent{
  appointments: Appointment[] = []

  constructor(
    private appointmentsService:AppointmentsService,
    private destroyRef: DestroyRef,
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

  getAppointmentsById(id: string): Appointment | void{
    this.appointmentsService
      .getAppointmentsById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Appointment) => {
          return res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteAppointment(id:string):void{
    alert("Deseja Deletar o agendamento?")
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

  doneAppointment(appointment:Appointment):void{
    alert("Deseja Marcar o agendamento como feito?")
    this.appointmentsService
    .doneAppointment(appointment)
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

  cancelAppointment(appointment:Appointment):void{
    alert("Deseja cancelar o agendamento?")
    this.appointmentsService
    .cancelAppointment(appointment)
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
