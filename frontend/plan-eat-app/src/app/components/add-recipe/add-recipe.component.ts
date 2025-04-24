import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {
  title = '';
  description = '';
  category = '';
  ingredients = '';

  constructor(private recipeService: RecipeService, private router: Router) {}

  saveRecipe() {
    const newRecipe = {
      title: this.title,
      description: this.description,
      category: this.category,
      ingredients: this.ingredients.split(',').map(i => i.trim())  // Pretvori string u array
    };

    this.recipeService.addRecipe(newRecipe).then(() => {
      this.router.navigate(['/recipes']);
    });
  }
}
