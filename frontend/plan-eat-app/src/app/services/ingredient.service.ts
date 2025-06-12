import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from '@angular/fire/firestore';
import { Ingredient } from '../models/ingredient.model';
import { API_BASE_URL } from '../api.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  addIngredient(ingredient: Ingredient){
    return this.http.post(`${API_BASE_URL}/ingredients`, ingredient);
  }

  
}
