import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
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
        this.recipe = data[0];
        console.log('Dohvaćeni recept:', this.recipe);
      });
    }
    console.log(this.recipe);
  }

  saveChanges() {
    if (this.recipeId && this.recipe) {
      this.recipeService.editRecipe(this.recipeId, this.recipe).then(() => {
        this.router.navigate(['/recipes']);
      });
    }
  }
}
