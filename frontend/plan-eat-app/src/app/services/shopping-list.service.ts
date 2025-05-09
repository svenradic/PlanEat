import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Ingredient } from '../models/ingredient.model';
import { collection, setDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(private firestore: Firestore, private auth: AuthService) { }

  async saveShoppingList(weekStart: string, ingredients: Ingredient[]) {
    const userId = this.auth.getUserId();
    const shoppingListRef = collection(
      this.firestore,
      `users/${userId}/meal-plans/${weekStart}/shopping-list`
    );
  
    const batch = ingredients.map(item =>
      setDoc(doc(shoppingListRef), item) // auto-ID for each ingredient
    );
  
    await Promise.all(batch);
  }

  async updateShoppingList(weekStart: string, ingredient: Ingredient) {
    const userId = this.auth.getUserId();
  
    // Use doc() directly to point to a single document
    const docRef = doc(
      this.firestore,
      `users/${userId}/meal-plans/${weekStart}/shopping-list/${ingredient.id}`
    );
  
    await setDoc(docRef, ingredient);
  }

  getShoppingList(weekStart: string): Observable<Ingredient[]> {
    const userId = this.auth.getUserId();
    const listRef = collection(
      this.firestore,
      `users/${userId}/meal-plans/${weekStart}/shopping-list`
    );
    return collectionData(listRef, { idField: 'id' }) as Observable<Ingredient[]>;
  }
}
