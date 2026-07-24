import { MeasurementUnit } from "./MeasurementUnit";

type PriceProduct = {
  measurementUnit: MeasurementUnit;
  price: number;
  priceUnit?: number;
};

export type { PriceProduct };
