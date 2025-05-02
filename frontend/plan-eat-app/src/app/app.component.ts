import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './services/recipe.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((data: Recipe[]) => {
      this.recipes = data;
    });
  }

  logout() {
    this.auth
      .logout()
      .then(() => {
        console.log('Uspješno ste se odjavili!');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Greška prilikom odjave:', error);
      });
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  getUserName() {
    return this.auth.getUserName();
  }
}
