import { Injectable } from '@angular/core';
import {
  Firestore,
  docData,
  doc,
  setDoc,
  collectionData,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { MealPlan } from '../models/meal-plan.model';
import { Observable, ObservableLike } from 'rxjs';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class MealPlanService {
  constructor(private firestore: Firestore, private auth: AuthService) {}

  saveMealPlan(mealPlan: MealPlan) {
    const userId = this.auth.getUserId();
    const mealPlanRef = doc(
      this.firestore,
      `users/${userId}/meal-plans/${mealPlan.weekStart}`
    );
    return setDoc(mealPlanRef, mealPlan);
  }

  getAllMealPlans(): Observable<MealPlan[]> {
    const userId = this.auth.getUserId();
    const mealPlansRef = collection(this.firestore, `users/${userId}/meal-plans`);
    return collectionData(mealPlansRef, { idField: 'id' }) as Observable<MealPlan[]>;
  }

  getMealPlan(weekStart: string) {
    const userId = this.auth.getUserId();
    const mealPlanRef = doc(
      this.firestore,
      `users/${userId}/meal-plans/${weekStart}`
    );
    return docData(mealPlanRef) as Observable<MealPlan>;
  }

  updateMealPlan(weekStart: string, updatedMealPlan: Partial<MealPlan>) {
    const userId = this.auth.getUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const mealPlanRef = doc(
      this.firestore,
      `users/${userId}/meal-plans/${weekStart}`
    );
    return setDoc(mealPlanRef, updatedMealPlan, { merge: true });
  }
}
