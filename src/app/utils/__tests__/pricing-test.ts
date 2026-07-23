import { getProductDisplayPrice } from "../index";

describe("getProductDisplayPrice", () => {
  test("uses priceUnit for unit-based products", () => {
    expect(
      getProductDisplayPrice({
        measurementUnit: "unit",
        price: 10,
        priceUnit: 0.25,
      }),
    ).toBe(0.25);
  });

  test("falls back to base price when unit price is missing", () => {
    expect(
      getProductDisplayPrice({
        measurementUnit: "unit",
        price: 10,
      }),
    ).toBe(10);
  });

  test("supports cart total calculations for unit-based products", () => {
    const unitProduct = {
      measurementUnit: "unit" as const,
      price: 10,
      priceUnit: 0.25,
    };

    expect(getProductDisplayPrice(unitProduct) * 2).toBe(0.5);
  });
});
