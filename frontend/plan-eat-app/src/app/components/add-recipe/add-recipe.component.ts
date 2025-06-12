import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Ingredient } from '../../models/ingredient.model';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {
  title = '';
  description = '';
  category = '';
  ingredients: Ingredient[] = []; // Ovdje se koristi Ingredient model

  constructor(private recipeService: RecipeService, private router: Router) {}

  addIngredient() {
    this.ingredients.push({
      id: this.generateId(),
      name: '',
      quantity: 0,
      unit: '',
      isBought: false,
    });
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  async saveRecipe() {
    try {
      const newRecipe = {
        title: this.title,
        description: this.description,
        category: this.category,
        ingredients: this.ingredients,
      };

      this.recipeService.addRecipe(newRecipe).subscribe({
        next: () => this.router.navigate(['/recipes']),
        error: (err) =>
          console.error('Greška prilikom spremanja recepta:', err),
      });
    } catch (error) {
      console.error('Greška prilikom dodavanja recepta:', error);
    }
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
