import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Ingredient } from '../models/ingredient.model';
import { API_BASE_URL } from '../api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  saveShoppingList(
    weekStart: string,
    ingredients: Ingredient[]
  ): Observable<any> {
    const userId = this.auth.getUserIdSync();
    return this.http.post(`${API_BASE_URL}/shopping-list`, {
      userId,
      weekStart,
      ingredients,
    });
  }

  updateShoppingList(
    weekStart: string,
    ingredient: Ingredient
  ): Observable<any> {
    const userId = this.auth.getUserIdSync();
    return this.http.put(
      `${API_BASE_URL}/shopping-list/${userId}/${weekStart}/${ingredient.id}`,
      ingredient
    );
  }

  getShoppingList(weekStart: string): Observable<Ingredient[]> {
    const userId = this.auth.getUserIdSync();
    return this.http.get<Ingredient[]>(
      `${API_BASE_URL}/shopping-list/${userId}/${weekStart}`
    );
  }
}
