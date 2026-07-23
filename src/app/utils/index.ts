import { MeasurementUnit } from "@/types/MeasurementUnit";

type PriceableProduct = {
  measurementUnit: MeasurementUnit;
  price: number;
  priceUnit?: number;
};

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export function getProductDisplayPrice(product: PriceableProduct) {
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
