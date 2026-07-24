import { fireEvent, render } from "@testing-library/react-native";

jest.mock("@expo/vector-icons", () => {
  const { Text } = require("react-native");

  return {
    Ionicons: ({ name }: { name: string }) => <Text>{name}</Text>,
  };
});

import { CartProduct } from "../CartProduct";

describe("<CartProduct />", () => {
  const defaultProps = {
    quantity: 2,
    measurementUnits: ["unit"] as const,
    itemTotal: 0.5,
    handleIncreaseQuantity: jest.fn(),
    handleDecreaseQuantity: jest.fn(),
    handleRemoveProduct: jest.fn(),
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

  test("disables decrease button when quantity is 1", () => {
    const handleDecreaseQuantity = jest.fn();
    const { getByLabelText } = render(
      <CartProduct
        {...defaultProps}
        quantity={1}
        handleDecreaseQuantity={handleDecreaseQuantity}
        item={{
          id: "1",
          name: "Aguacate",
          measurementUnit: "unit",
          price: 10,
          priceUnit: 0.25,
        }}
      />,
    );

    fireEvent.press(getByLabelText("Disminuir cantidad de Aguacate"));

    expect(handleDecreaseQuantity).not.toHaveBeenCalled();
  });

  test("removes product when trash button is pressed", () => {
    const handleRemoveProduct = jest.fn();
    const item = {
      id: "1",
      name: "Aguacate",
      measurementUnit: "unit" as const,
      price: 10,
      priceUnit: 0.25,
    };
    const { getByLabelText } = render(
      <CartProduct
        {...defaultProps}
        item={item}
        handleRemoveProduct={handleRemoveProduct}
      />,
    );

    fireEvent.press(getByLabelText("Eliminar Aguacate del carrito"));

    expect(handleRemoveProduct).toHaveBeenCalledWith(item);
  });
});
