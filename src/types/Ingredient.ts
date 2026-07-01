import { IngredientCategory } from "./IngredientCategory";
import { MeasurementUnit } from "./MeasurementUnit";

type Ingredient = {
  id: string;
  name: string;
  quantity: string;
  measurementUnit: MeasurementUnit;
  category: IngredientCategory;
  inStock: boolean;
};

export type { Ingredient };
