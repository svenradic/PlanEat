import { Component } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    CategoryFilterComponent,
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((data: Recipe[]) => {
      this.recipes = data;
    });
  }

  applyFilter(category: string) {
    if (category) {
      category.toLowerCase() === 'all' ? this.ngOnInit():  this.recipeService.getRecipesByCategory(category).subscribe((data: Recipe[]) => {
        console.log('Dohvaćeni recepti:', data);
        this.recipes = data;
        
      });
    } else{
      this.ngOnInit();
    }
  }
}
