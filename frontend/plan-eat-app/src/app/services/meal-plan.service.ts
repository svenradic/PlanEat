import { Injectable } from '@angular/core';
import { Firestore, docData, doc, setDoc} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { MealPlan } from '../models/meal-plan.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  
  constructor(private firestore: Firestore, private auth: AuthService) { }

  saveMealPlan(mealPlan: MealPlan) {
    const userId = this.auth.getUserId();
    const mealPlanRef = doc(
      this.firestore,
      `users/${userId}/meal-plans/${mealPlan.weekStart}`
    )
    return setDoc(mealPlanRef, mealPlan);
  }

  getMealPlan(weekStart: string) {
    const userId = this.auth.getUserId();
    const mealPlanRef = doc(
      this.firestore,
      `users/${userId}/meal-plans/${weekStart}`
    )
    return docData(mealPlanRef) as Observable<MealPlan>;
  }

}
