import { Product } from "./Product";
import { RecipeCategory } from "./RecipeCategory";

type Recipe = {
  id: string;
  name: string;
  products: Product[];
  category: RecipeCategory;
  image: string;
  cookTime: number;
};

export type { Recipe };
