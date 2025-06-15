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
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        console.error('Greška prilikom prijave:', error);
      },
    });
  }
}
