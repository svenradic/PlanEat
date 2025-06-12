import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { MealPlan } from '../models/meal-plan.model';
import { Observable, ObservableLike } from 'rxjs';
import { API_BASE_URL } from '../api.config';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MealPlanService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  saveMealPlan(mealPlan: MealPlan) {
    const userId = this.auth.getUserId();
    return this.http.post(`${API_BASE_URL}/meal-plans`, { userId, mealPlan });
  }

  getAllMealPlans(): Observable<MealPlan[]> {
    const userId = this.auth.getUserId();
    return this.http.get<MealPlan[]>(`${API_BASE_URL}/meal-plans/${userId}`);
  }

  getMealPlan(weekStart: string): Observable<MealPlan | null> {
    const userId = this.auth.getUserId();
    return this.http
      .get<MealPlan>(`${API_BASE_URL}/meal-plans/${userId}/${weekStart}`)
      .pipe(
        catchError(() => of(null)) // Return null if the meal plan is not found
      );
  }

  updateMealPlan(weekStart: string, updatedMealPlan: Partial<MealPlan>) {
    const userId = this.auth.getUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.http.put(
      `${API_BASE_URL}/meal-plans/${userId}/${weekStart}`,
      updatedMealPlan
    );
  }
}
