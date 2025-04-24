import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private firestore: Firestore) { }

  getRecipes(): Observable<Recipe[]> {
    const recipesRef = collection(this.firestore, 'recipes');
    return collectionData(recipesRef, { idField: 'id' }) as Observable<Recipe[]>;
  }

  addRecipe(recipe: Recipe) {
    const recipesRef = collection(this.firestore, 'recipes');
    return addDoc(recipesRef, recipe);
  }
  
  getRecipesByCategory(category: string): Observable<Recipe[]> {
    const recipesRef = collection(this.firestore, 'recipes');
    const categoryQuery = query(recipesRef, where('category', '==', category));
    return collectionData(categoryQuery, { idField: 'id' }) as Observable<Recipe[]>;
  }
}
