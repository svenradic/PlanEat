import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private firestore: Firestore) {}

  getRecipes(): Observable<Recipe[]> {
    const recipesRef = collection(this.firestore, 'recipes');
    const recipesQuery = query(recipesRef, where('deleted', '==', false));
    return collectionData(recipesQuery, { idField: 'id' }) as Observable<
      Recipe[]
    >;
  }

  addRecipe(recipe: Recipe) {
    const recipesRef = collection(this.firestore, 'recipes');
    const recipeWithDeletedFlag = {
      ...recipe,
      deleted: false,
    };
    return addDoc(recipesRef, recipeWithDeletedFlag);
  }

  getRecipesByCategory(category: string): Observable<Recipe[]> {
    const recipesRef = collection(this.firestore, 'recipes');
    const categoryQuery = query(
      recipesRef,
      where('category', '==', category),
      where('deleted', '==', false)
    );
    return collectionData(categoryQuery, { idField: 'id' }) as Observable<
      Recipe[]
    >;
  }

  editRecipe(recipeId: string, updatedRecipe: Recipe) {
    const recipesRef = collection(this.firestore, 'recipes');
    const recipeDocRef = doc(recipesRef, recipeId);
    return updateDoc(recipeDocRef, { ...updatedRecipe });
  }

  deleteRecipe(recipeId: string) {
    const recipesRef = collection(this.firestore, 'recipes');
    const recipeDocRef = doc(recipesRef, recipeId);
    return updateDoc(recipeDocRef, { deleted: true });
  }

  getRecipeById(id: string): Observable<Recipe[]> {
    const recipesRef = collection(this.firestore, 'recipes');
    const idQuery = query(
      recipesRef,
      where('id', '==', id),
      where('deleted', '==', false)
    );
    return collectionData(idQuery, { idField: 'id' }) as Observable<
      Recipe[]
    >;
  }
}
