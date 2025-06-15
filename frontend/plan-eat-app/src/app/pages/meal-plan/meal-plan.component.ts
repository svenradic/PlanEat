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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DateUtilService } from '../../services/date-util-service.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    MatIconModule,
  ],
  templateUrl: './meal-plan.component.html',
  styleUrl: './meal-plan.component.css',
})
export class MealPlanComponent {
  isMobile = false;
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
  isLoading: boolean = true;
  mealPlan: MealPlan = {
    weekStart: '',
    weekEnd: '',
    days: {},
  };

  constructor(
    private mealPlanService: MealPlanService,
    private recipeService: RecipeService,
    private breakpointObserver: BreakpointObserver,
    private dateUtil: DateUtilService,
    private auth: AuthService,
    private router: Router
  ) {
    this.daysOfWeek.forEach((day) => {
      this.mealPlan.days[day] = {
        breakfast: [],
        lunch: [],
        dinner: [],
      };
    });
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => (this.isMobile = result.matches));
  }

  ngOnInit() {
     if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/']); // redirect to login
    }

    this.loadMealPlan();

    this.recipeService
      .getRecipesByCategory('breakfast')
      .subscribe((data: Recipe[]) => {
        this.breakfastRecipes = data;
      });
    this.recipeService
      .getRecipesByCategory('lunch')
      .subscribe((data: Recipe[]) => {
        this.lunchRecipes = data;
      });
    this.recipeService
      .getRecipesByCategory('dinner')
      .subscribe((data: Recipe[]) => {
        this.dinnerRecipes = data;
      });
  }

  loadMealPlan() {
    this.isLoading = true;
    const weekStartStr = this.formatDateForServer(this.currentWeekStart);
    try {
      this.mealPlanService
        .getMealPlan(weekStartStr)
        .subscribe((data: MealPlan | null) => {
          if (data) {
            this.mealPlan = data;
            console.log('Fetched meal plan:', this.mealPlan);
          } else {
            this.mealPlan = this.createEmptyMealPlan(weekStartStr);
            this.saveMealPlan();
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
      weekEnd: this.formatDateForServer(this.getEndOfWeek()),
      days: {},
    };
    this.daysOfWeek.forEach((day) => {
      emptyPlan.days![day] = {
        breakfast: [],
        lunch: [],
        dinner: [],
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

  formatDateForPage(date: Date): string {
    return this.dateUtil.formatForPage(date);
  }

  formatDateForServer(date: Date): string {
    return this.dateUtil.formatForServer(date);
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

  saveMealPlan() {
    try {
      this.mealPlanService.saveMealPlan(this.mealPlan).subscribe({
        next: () => {
          console.log('Meal plan saved successfully!');
        },
        error: (err) => {
          console.error('Error saving meal plan:', err);
        },
      });
    } catch (error) {
      console.error('Error saving meal plan:', error);
    }
  }
}
