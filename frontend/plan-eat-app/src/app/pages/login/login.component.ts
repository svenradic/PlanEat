import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  formSubmitted: boolean = false;
  loginError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  loginGoogle() {
    this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        console.error('Greška prilikom prijave:', error);
      },
    });
  }

  loginEmail() {
    this.formSubmitted = true;
    if (!this.email || !this.password || !this.authService.isValidEmail(this.email) || this.password.length < 6) {
      return; // Don't submit if invalid
    }
    this.authService.login(this.email, this.password)
    .then(() => {
      this.loginError = null; // Clear any previous error
      this.router.navigate(['/recipes']);
    })
    .catch((error) => {
      this.loginError = 'Incorrect email or password.';
      console.error('Greška prilikom prijave:', error);
    });
  }
}
