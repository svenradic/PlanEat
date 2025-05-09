import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from '@angular/fire/firestore';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private firestore: Firestore) { }

  addIngredient(ingredient: Ingredient){
    const ingredientsRef = collection(this.firestore, 'ingredients');
    const ingredientDocRef = doc(ingredientsRef, ingredient.id || '');
    return setDoc(ingredientDocRef, { ...ingredient });
  }

  
}
