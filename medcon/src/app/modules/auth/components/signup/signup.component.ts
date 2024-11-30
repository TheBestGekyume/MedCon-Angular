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
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']

})
export class SignupComponent {
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    checkPassword: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required])
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private destroyRef: DestroyRef,
  ) { }


  onSubmit(): void {
    if (this.passwordValidation()) {
      const payload = this.signUpForm.getRawValue();
      this.authService.register(payload).pipe(
        takeUntilDestroyed(this.destroyRef)
      )
        .subscribe({
          complete: () => {
            this.router.navigate(['/auth/login']);
          },
          error: (error) => {
            console.log(error);
          }
        })
    } else {
      console.error("Formulário inválido ou senhas não coincidem.");
    }
  }


  private passwordValidation(): boolean {
    return this.signUpForm.value.password === this.signUpForm.value.checkPassword;
  }

}
