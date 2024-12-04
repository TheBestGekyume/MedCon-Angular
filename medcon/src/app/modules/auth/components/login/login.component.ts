import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private destroyRef: DestroyRef,
  ) { }

  onSubmit(): void {

    const payload = this.loginForm.getRawValue();
    this.authService.login(payload).pipe(
      takeUntilDestroyed(this.destroyRef)
    )
      .subscribe({
        next: (response) => {
          sessionStorage.setItem('userToken', response.token);
          sessionStorage.setItem('userName', response.user.name);
          sessionStorage.setItem('userRole', response.user.role);
          this.router.navigate(['/appointments']);
        },
        error: (error) => {
          console.log(error);
          alert('Erro ao fazer login. Verifique suas credenciais.');
        }
      })



  }




}
