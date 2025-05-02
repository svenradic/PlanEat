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
  { path: 'login', component: LoginComponent },
  { path: 'recipes', component: RecipesComponent, canActivate: [authGuard] },
  { path: 'meal-plan', component: MealPlanComponent, canActivate: [authGuard] },
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: [authGuard] },
  { path: 'recipes/add-recipe', component: AddRecipeComponent, canActivate: [authGuard] },
  { path: 'recipes/edit-recipe/:id', component: EditRecipeComponent, canActivate: [authGuard] }, 
  { path: 'register', component: RegisterComponent}
];
