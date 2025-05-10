import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './services/recipe.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  recipes: Recipe[] = [];
  isHandset: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private auth: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => (this.isHandset = result.matches));
  }

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
