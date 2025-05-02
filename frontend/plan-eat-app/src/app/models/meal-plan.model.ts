export interface MealPlan {
  id?: string;
  weekStart: string;
  weekEnd: string;
  days: {
    [day: string]: {
      breakfast: string[];
      lunch: string[];
      dinner: string[];
    };
  };
}