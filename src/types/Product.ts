import { MeasurementUnit } from "./MeasurementUnit";
import { ProductCategory } from "./ProductCategory";

type Product = {
  category: ProductCategory;
  id: string;
  imageUrl: string;
  inStock: boolean;
  name: string;
  measurementUnit: MeasurementUnit;
  allowedMeasurementUnits?: MeasurementUnit[];
  price: number;
  priceUnit?: number;
  quantity: string;
};

export type { Product };
