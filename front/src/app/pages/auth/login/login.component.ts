import { Component, inject } from '@angular/core';
import { AuthComponent } from '../../../layouts/auth/auth.component';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgIf, JsonPipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AuthComponent,
    RouterModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    JsonPipe,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService, HttpClient],
})
export class LoginComponent {
  authService = inject(AuthService);
  toast = inject(HotToastService);
  router = inject(Router);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submitLogin(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      this.authService
        .login(this.email?.value || '', this.password?.value || '')
        .subscribe({
          next: (response: any) => {
            let token = response.access_token;
            localStorage.setItem('token', token);
            this.toast.success('Welcome to Lost&Found');
            this.router.navigate(['/app']);
          },
          error: (error) => {
            this.toast.error('Invalid email or password');
          },
        });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
