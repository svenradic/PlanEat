import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css',
})
export class EditRecipeComponent implements OnInit {
  recipeId: string | undefined;
  recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id') || undefined;
    console.log('ID recepta:', this.recipeId);
    if (this.recipeId) {
      this.recipeService.getRecipeById(this.recipeId).subscribe((data) => {
        this.recipe = data;
        console.log('Dohvaćeni recept:', data);
      });
    }
    console.log(this.recipe);
  }

  addIngredient() {
    if (this.recipe) {
      this.recipe.ingredients.push({
        name: '',
        quantity: 0,
        unit: '',
        isBought: false,
      });
    }
  }

  removeIngredient(index: number) {
    if (this.recipe) {
      this.recipe.ingredients.splice(index, 1);
    }
  }

  async saveChanges() {
    if (this.recipeId && this.recipe) {
      try {
        await this.recipeService
          .editRecipe(this.recipeId, this.recipe)
          .subscribe({
            next: () => this.router.navigate(['/recipes']),
            error: (err) =>
              console.error('Greška prilikom spremanja promjena:', err),
          });
      } catch (error) {
        console.error('Greška prilikom spremanja promjena:', error);
      }
    }
  }
}
