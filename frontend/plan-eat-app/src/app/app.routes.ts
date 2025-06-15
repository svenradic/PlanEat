import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { MealPlanComponent } from './pages/meal-plan/meal-plan.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'recipes', component: RecipesComponent},
  { path: 'meal-plan', component: MealPlanComponent},
  { path: 'shopping-list', component: ShoppingListComponent},
  { path: 'recipes/add-recipe', component: AddRecipeComponent},
  { path: 'recipes/edit-recipe/:id', component: EditRecipeComponent}, 
  { path: 'register', component: RegisterComponent}
];
