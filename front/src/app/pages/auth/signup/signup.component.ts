import { Component, inject } from '@angular/core';
import { AuthComponent } from '../../../layouts/auth/auth.component';
import { Router, RouterModule } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import confetti from 'canvas-confetti';

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AuthComponent, RouterModule, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  authService = inject(AuthService);
  router = inject(Router);
  toast = inject(HotToastService);
  signUpForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
  );

  get passwordMatchError() {
    return (
      this.signUpForm.getError('mismatch') &&
      this.signUpForm.get('confirmPassword')?.touched
    );
  }

  submitForm() {
    this.authService
      .register({
        firstName: this.signUpForm.get('firstName')?.value as string,
        lastName: this.signUpForm.get('lastName')?.value as string,
        email: this.signUpForm.get('email')?.value as string,
        password: this.signUpForm.get('password')?.value as string,
      })
      .subscribe({
        next: () => {
          this.toast.success('User registered successfully, please login');
          this.celebrate();
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.toast.error(error.error.message);
          console.error('Error registering user:', error);
        },
      });
  }

  celebrate() {
    const duration = 3000; // in milliseconds

    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 },
      zIndex: 2000,
    });

    // Clear confetti after a certain duration
    setTimeout(() => confetti.reset(), duration);
  }
}
