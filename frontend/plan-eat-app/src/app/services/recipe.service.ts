import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { API_BASE_URL } from '../api.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${API_BASE_URL}/recipes`);
  }

  addRecipe(recipe: Recipe) {
    recipe.category = recipe.category.toLowerCase();
    return this.http.post(`${API_BASE_URL}/recipes`, recipe);
  }

  getRecipesByCategory(category: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${API_BASE_URL}/recipes/category/${category.toLowerCase()}`
    );
  }

  editRecipe(recipeId: string, updatedRecipe: Recipe) {
    return this.http.put(`${API_BASE_URL}/recipes/${recipeId}`, updatedRecipe);
  }

  deleteRecipe(recipeId: string): Promise<any> {
    return this.http.delete(`${API_BASE_URL}/recipes/${recipeId}`).toPromise();
  }

  getRecipeById(id: string): Observable<Recipe | undefined> {
    return this.http
      .get<Recipe>(`${API_BASE_URL}/recipes/${id}`)
      .pipe(catchError(() => of(undefined)));
  }
}
