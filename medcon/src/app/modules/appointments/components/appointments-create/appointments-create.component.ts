import { Component, DestroyRef } from '@angular/core';
import { AsideComponent } from "../../../../common/aside/aside.component";

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppointmentsService } from '../../services/appointments.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from '../../models/appointments.model';

@Component({
  selector: 'app-appointments-create',
  standalone: true,
  imports: [
    AsideComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './appointments-create.component.html',
  styleUrl: './appointments-create.component.css'
})
export class AppointmentsCreateComponent {
  appointmentForm: FormGroup = new FormGroup({
    specialty: new FormControl(null, [Validators.required]),
    doctor: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    time: new FormControl(null, [Validators.required]),
    obs: new FormControl(null, [Validators.required]),
  })

  id?: string;

  constructor(
    private appointmentsService: AppointmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    if (this.id) {
      this.getAppointmentsById()
    }
  }

  getAppointmentsById(): void {
    this.appointmentsService
      .getAppointmentsById(this.id!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.appointmentForm.patchValue(response)
        },
        error: (error) => {
          this.openSnackBar('Deu erro')
        }
      })
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'X');
  }

  onSubmit(): void {
    const payload: Appointment = this.appointmentForm.getRawValue()
    if (this.id) {
      this.updateAppointments(payload)
      return
    }
    console.log(payload)
    this.saveAppointments(payload)
  }

  saveAppointments(appointment: Appointment): void {
    this.appointmentsService
      .saveAppointments(appointment)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        complete: () => {
          this.router.navigate(['/appointments'])
        },
        error: (error) => {
          console.log(error);

        }
      })
  }
  updateAppointments(appointment: Appointment): void {
    this.appointmentsService
      .updateAppointments(appointment)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        complete: () => {
          this.router.navigate(['/appointments'])
        },
        error: (error) => {
          this.openSnackBar('Deu algum erro em algum lugar')
        }
      })
  }

}
