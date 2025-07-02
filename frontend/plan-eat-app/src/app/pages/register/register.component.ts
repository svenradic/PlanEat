import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, MatButtonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  displayName: string = '';
  formSubmitted: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.formSubmitted = true;
    if (!this.email || !this.password || !this.authService.isValidEmail(this.email) || this.password.length < 6) {
      return; // Don't submit if invalid
    }
    this.authService.register(this.email, this.password, this.displayName).then(() => {
        this.router.navigate(['/recipes']);
    }).catch((error) => {
        console.error('Greška prilikom registracije:', error);
     
    });
  }



}
