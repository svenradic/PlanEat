import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { MealPlanService } from '../../services/meal-plan.service';
import { MealPlan } from '../../models/meal-plan.model';
import { Ingredient } from '../../models/ingredient.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Recipe } from '../../models/recipe.model';
import { MatCard, MatCardModule } from '@angular/material/card';
import { firstValueFrom } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ShoppingListService } from '../../services/shopping-list.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    MatTableModule,
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent {
  mealPlans: MealPlan[] = [];
  selectedWeek: string = '';
  shoppingList: Ingredient[] = [];
  recipes: Recipe[] = [];
  isLoading: boolean = true;

  constructor(
    private mealPlanService: MealPlanService,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private auth: AuthService,
    private router: Router
  ) {}
  async ngOnInit() {
     if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/']); // redirect to login
    }

    this.loadMealPlans();
    const currentDate = new Date();
    const firstDayOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
    );
    this.selectedWeek = firstDayOfWeek.toISOString().split('T')[0];
    const list = await this.loadShoppingList();
    if (list.length === 0) {
      console.log('Shopping list is empty. Generating from recipes...');
      await this.generateShoppingList();
    }
  }

  loadMealPlans() {
    this.mealPlanService
      .getAllMealPlans()
      .subscribe((mealPlans: MealPlan[]) => {
        this.mealPlans = mealPlans;
        console.log('Dohvaćeni planovi obroka:', this.mealPlans);
        this.isLoading = false;
      });
  }

  async loadShoppingList(): Promise<Ingredient[]> {
    if (!this.selectedWeek) return [];

    const list$ = this.shoppingListService.getShoppingList(this.selectedWeek);
    const list = await firstValueFrom(list$);
    this.shoppingList = list;
    return list;
  }

  async generateShoppingList() {
    this.shoppingList = [];
    let recipeIds: string[] = [];
    this.isLoading = true;

    if (this.selectedWeek) {
      const selectedMealPlan = this.mealPlans.find(
        (plan) => plan.weekStart === this.selectedWeek
      );

      if (selectedMealPlan) {
        for (const day of Object.keys(selectedMealPlan.days)) {
          recipeIds = recipeIds.concat(
            selectedMealPlan.days[day].breakfast,
            selectedMealPlan.days[day].lunch,
            selectedMealPlan.days[day].dinner
          );
        }

        const recipePromises = recipeIds.map((id) =>
          firstValueFrom(this.recipeService.getRecipeById(id))
        );
        const fetchedRecipes = await Promise.all(recipePromises);
        this.recipes = fetchedRecipes.filter((r): r is Recipe => !!r);

        if (this.recipes.length > 0) {
          for (const recipe of this.recipes) {
            for (const ingredient of recipe.ingredients) {
              const existingIngredient = this.shoppingList.find(
                (i) => i.name === ingredient.name
              );
              if (existingIngredient) {
                existingIngredient.quantity += ingredient.quantity;
              } else {
                this.shoppingList.push({ ...ingredient });
              }
            }
          }
        }
      }
    }
    this.shoppingListService
      .saveShoppingList(this.selectedWeek, this.shoppingList)
      .subscribe({
        next: (savedIngredients: Ingredient[]) => {
          this.shoppingList = savedIngredients; // Update with IDs returned from backend
          console.log('Shopping list saved and updated with IDs');
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error saving shopping list:', err);
        },
      });
  }

  async setSelectedWeek(week: string) {
    this.selectedWeek = week;
    console.log('Odabrani tjedan:', this.selectedWeek);
    const list = await this.loadShoppingList();
    if (list.length === 0) {
      console.log('Shopping list is empty. Generating from recipes...');
      await this.generateShoppingList();
    }
  }

  async saveShoppingList() {
    this.shoppingListService
      .saveShoppingList(this.selectedWeek, this.shoppingList)
      .subscribe({
        next: () => {
          console.log('Shopping list saved under week:', this.selectedWeek);
        },
        error: (err) => {
          console.error('Error saving shopping list:', err);
        },
      });
  }

  toggleIngredient(ingredient: Ingredient) {
    this.shoppingListService
      .updateShoppingList(this.selectedWeek, ingredient)
      .subscribe({
        next: () => {
          console.log('Ingredient updated:', ingredient.name);
        },
        error: (err) => {
          console.error('Error updating ingredient:', err);
        },
      });
  }
}
