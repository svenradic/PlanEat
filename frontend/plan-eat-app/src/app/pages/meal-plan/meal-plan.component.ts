import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealPlanService } from '../../services/meal-plan.service';
import { Recipe } from '../../models/recipe.model';
import { MealPlan } from '../../models/meal-plan.model';
import { RecipeService } from '../../services/recipe.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-meal-plan',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './meal-plan.component.html',
  styleUrl: './meal-plan.component.css',
})
export class MealPlanComponent {
  displayedColumns: string[] = ['day', 'breakfast', 'lunch', 'dinner'];
  breakfastRecipes: Recipe[] = [];
  lunchRecipes: Recipe[] = [];
  dinnerRecipes: Recipe[] = [];
  currentWeekStart: Date = this.getStartOfWeek();
  daysOfWeek: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  isLoading: boolean = false;
  mealPlan!: MealPlan; 

  constructor(
    private mealPlanService: MealPlanService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {

    this.recipeService
      .getRecipesByCategory('breakfast')
      .subscribe((data: Recipe[]) => {
        this.breakfastRecipes = data;
        console.log('Fetched recipes:', this.breakfastRecipes);
      });
    this.recipeService
      .getRecipesByCategory('lunch')
      .subscribe((data: Recipe[]) => {
        this.lunchRecipes = data;
        console.log('Fetched recipes:', this.lunchRecipes);
      });
    this.recipeService
      .getRecipesByCategory('dinner')
      .subscribe((data: Recipe[]) => {
        this.dinnerRecipes = data;
        console.log('Fetched recipes:', this.dinnerRecipes);
      });

    this.loadMealPlan();
  }

  async loadMealPlan() {
    this.isLoading = true;
    const weekStartStr = this.formatDate(this.currentWeekStart);
    try {
      this.mealPlanService
      .getMealPlan(weekStartStr)
      .subscribe((data: MealPlan) => {
        if (data) {
          this.mealPlan = data;
          console.log('Fetched meal plan:', this.mealPlan);
        }
        else {
          this.mealPlan = this.createEmptyMealPlan(weekStartStr);
          this.mealPlanService.saveMealPlan(this.mealPlan).then(() => {
            console.log('Meal plan created successfully!');
          });
        }
    });
    } catch (err) {
      console.error('Error loading meal plan:', err);
    }
    this.isLoading = false;
  }

  createEmptyMealPlan(weekStart: string): MealPlan {
    const emptyPlan: MealPlan = {
      weekStart,
      weekEnd: this.formatDate(this.getEndOfWeek()),
      days: {},
    };
    this.daysOfWeek.forEach(day => {
      emptyPlan.days[day] = {
        breakfast: [],
        lunch: [],
        dinner: []
      };
    });
    return emptyPlan;
  }

  getStartOfWeek(): Date {
    const now = new Date();
    const day = now.getDay() || 7;
    const startOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - day + 1
    );
    return startOfWeek;
  }
  getEndOfWeek(): Date {
    const now = this.currentWeekStart;
    const day = now.getDay() || 7;
    const endOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - day + 7
    );
    return endOfWeek;
  }

  previousWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.loadMealPlan();
  }

  nextWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.loadMealPlan();
  }

  formatDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  async saveMealPlan() {
    try {
      await this.mealPlanService.saveMealPlan(this.mealPlan);
      console.log('Meal plan saved successfully!');
    } catch (error) {
      console.error('Error saving meal plan:', error);
    }
  }
}
