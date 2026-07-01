import { Ingredient } from "./Ingredient";
import { RecipeCategory } from "./RecipeCategory";

type Recipe = {
  id: string;
  name: string;
  ingredients: Ingredient[];
  category: RecipeCategory;
  image: string;
  cookTime: number;
};

export type { Recipe };
