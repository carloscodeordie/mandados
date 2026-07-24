import { MEASUREMENT_UNIT_LABELS } from "@/constants/Constants";
import { MeasurementUnit } from "@/types/MeasurementUnit";
import { PriceProduct } from "@/types/PriceProduct";

export function convertPrice(
  price: number,
  currentMeasurementUnit: MeasurementUnit,
  nextMeasurementUnit: MeasurementUnit,
  priceUnit?: number,
) {
  if (currentMeasurementUnit === nextMeasurementUnit) {
    return price;
  }

  // Handle conversions involving "unit" using product-specific equivalence.
  if (currentMeasurementUnit === "unit" && nextMeasurementUnit !== "unit") {
    if (priceUnit && priceUnit > 0) {
      return Number.parseFloat((price / priceUnit).toFixed(2));
    }

    return price;
  }

  if (currentMeasurementUnit !== "unit" && nextMeasurementUnit === "unit") {
    if (priceUnit && priceUnit > 0) {
      return Number.parseFloat((price * priceUnit).toFixed(2));
    }

    return price;
  }

  const UNIT_TO_BASE_FACTOR: Partial<Record<MeasurementUnit, number>> = {
    g: 1,
    kg: 1000,
    ml: 1,
    l: 1000,
  };

  const currentFactor = UNIT_TO_BASE_FACTOR[currentMeasurementUnit];
  const nextFactor = UNIT_TO_BASE_FACTOR[nextMeasurementUnit];

  if (!currentFactor || !nextFactor) {
    return price;
  }

  return Number.parseFloat(((price * nextFactor) / currentFactor).toFixed(2));
}

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export function getProductDisplayPrice(product: PriceProduct) {
  if (product.measurementUnit === "unit" && product.priceUnit) {
    return product.priceUnit;
  }

  return product.price;
}

export function parseQuantity(quantity: string) {
  const parsedQuantity = Number.parseFloat(quantity);

  if (Number.isNaN(parsedQuantity) || parsedQuantity <= 0) {
    return 1;
  }

  return parsedQuantity;
}

export function formatQuantity(quantity: number) {
  if (Number.isInteger(quantity)) {
    return String(quantity);
  }

  return quantity.toFixed(3).replace(/\.?0+$/, "");
}

export function getMeasurementUnitLabel(unit: MeasurementUnit) {
  return MEASUREMENT_UNIT_LABELS[unit];
}

export function roundQuantity(value: number) {
  return Number.parseFloat(value.toFixed(3));
}
