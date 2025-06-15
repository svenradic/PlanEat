import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private auth: AuthService, private router: Router) {}

   get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

}
