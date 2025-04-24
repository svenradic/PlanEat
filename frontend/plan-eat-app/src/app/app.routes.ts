import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { MealPlanComponent } from './pages/meal-plan/meal-plan.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'meal-plan', component: MealPlanComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'recipes/add-recipe', component: AddRecipeComponent },
];
