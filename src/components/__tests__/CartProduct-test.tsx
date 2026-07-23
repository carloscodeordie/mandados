import { render } from "@testing-library/react-native";

import { CartProduct } from "../CartProduct";

describe("<CartProduct />", () => {
  const defaultProps = {
    quantity: 2,
    measurementUnits: ["unit"] as const,
    itemTotal: 0.5,
    handleIncreaseQuantity: jest.fn(),
    handleDecreaseQuantity: jest.fn(),
    handleMeasurementUnitChange: jest.fn(),
  };

  test("renders priceUnit for unit-based products", () => {
    const { getByText } = render(
      <CartProduct
        {...defaultProps}
        item={{
          id: "1",
          name: "Aguacate",
          measurementUnit: "unit",
          price: 10,
          priceUnit: 0.25,
        }}
      />,
    );

    getByText("$0.25 / unidad");
    getByText("$0.50");
  });

  test("falls back to price for non-unit products", () => {
    const { getByText } = render(
      <CartProduct
        {...defaultProps}
        item={{
          id: "2",
          name: "Leche",
          measurementUnit: "l",
          price: 18,
        }}
        itemTotal={36}
        measurementUnits={["l"]}
      />,
    );

    getByText("$18.00 / l");
    getByText("$36.00");
  });
});
