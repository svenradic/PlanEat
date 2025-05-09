import { Ingredient } from "./ingredient.model";

export interface Recipe {
  id?: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  category: string;
}
