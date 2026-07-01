import { IngredientCategory } from "./IngredientCategory";
import { MeasurementUnit } from "./MeasurementUnit";

type Ingredient = {
  category: IngredientCategory;
  id: string;
  inStock: boolean;
  name: string;
  measurementUnit: MeasurementUnit;
  price: number;
  quantity: string;
};

export type { Ingredient };
