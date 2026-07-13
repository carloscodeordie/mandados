import { MeasurementUnit } from "@/types/MeasurementUnit";
import { Product } from "@/types/Product";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type CartContextValue = {
  products: Product[];
  productsCount: number;
  addRecipeProducts: (products: Product[]) => void;
  updateProductQuantity: (
    productId: string,
    measurementUnit: MeasurementUnit,
    quantity: number,
  ) => void;
  updateProductMeasurementUnit: (
    productId: string,
    currentMeasurementUnit: MeasurementUnit,
    nextMeasurementUnit: MeasurementUnit,
  ) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const UNIT_TO_BASE_FACTOR: Partial<Record<MeasurementUnit, number>> = {
  g: 1,
  kg: 1000,
  ml: 1,
  l: 1000,
};

function roundQuantity(value: number) {
  return Number.parseFloat(value.toFixed(3));
}

function convertQuantity(
  quantity: number,
  currentMeasurementUnit: MeasurementUnit,
  nextMeasurementUnit: MeasurementUnit,
  priceUnit?: number,
) {
  if (currentMeasurementUnit === nextMeasurementUnit) {
    return quantity;
  }

  if (currentMeasurementUnit === "unit" && nextMeasurementUnit !== "unit") {
    if (priceUnit && priceUnit > 0) {
      return roundQuantity(quantity * priceUnit);
    }

    return quantity;
  }

  if (currentMeasurementUnit !== "unit" && nextMeasurementUnit === "unit") {
    if (priceUnit && priceUnit > 0) {
      return roundQuantity(quantity / priceUnit);
    }

    return quantity;
  }

  const currentFactor = UNIT_TO_BASE_FACTOR[currentMeasurementUnit];
  const nextFactor = UNIT_TO_BASE_FACTOR[nextMeasurementUnit];

  if (!currentFactor || !nextFactor) {
    return quantity;
  }

  return roundQuantity((quantity * currentFactor) / nextFactor);
}

function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  const parseQuantity = (quantity: string) => {
    const parsedQuantity = Number.parseFloat(quantity);

    if (Number.isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return 1;
    }

    return parsedQuantity;
  };

  const addRecipeProducts = useCallback((newProducts: Product[]) => {
    setProducts((currentProducts) => {
      const nextProducts = [...currentProducts];

      newProducts.forEach((newProduct) => {
        const productIndex = nextProducts.findIndex(
          (currentProduct) =>
            currentProduct.id === newProduct.id &&
            currentProduct.measurementUnit === newProduct.measurementUnit,
        );
        const newProductQuantity = parseQuantity(newProduct.quantity);

        if (productIndex >= 0) {
          const currentQuantity = parseQuantity(
            nextProducts[productIndex].quantity,
          );

          nextProducts[productIndex] = {
            ...nextProducts[productIndex],
            quantity: String(currentQuantity + newProductQuantity),
          };

          return;
        }

        nextProducts.push({
          ...newProduct,
          quantity: String(newProductQuantity),
        });
      });

      return nextProducts;
    });
  }, []);

  const updateProductQuantity = useCallback(
    (productId: string, measurementUnit: MeasurementUnit, quantity: number) => {
      setProducts((currentProducts) =>
        currentProducts.flatMap((product) => {
          if (
            product.id !== productId ||
            product.measurementUnit !== measurementUnit
          ) {
            return [product];
          }

          if (quantity <= 0) {
            return [];
          }

          return [
            {
              ...product,
              quantity: String(quantity),
            },
          ];
        }),
      );
    },
    [],
  );

  const updateProductMeasurementUnit = useCallback(
    (
      productId: string,
      currentMeasurementUnit: MeasurementUnit,
      nextMeasurementUnit: MeasurementUnit,
    ) => {
      if (currentMeasurementUnit === nextMeasurementUnit) {
        return;
      }

      setProducts((currentProducts) => {
        const sourceProduct = currentProducts.find(
          (product) =>
            product.id === productId &&
            product.measurementUnit === currentMeasurementUnit,
        );

        if (!sourceProduct) {
          return currentProducts;
        }

        const sourceQuantity = parseQuantity(sourceProduct.quantity);
        const convertedSourceQuantity = convertQuantity(
          sourceQuantity,
          currentMeasurementUnit,
          nextMeasurementUnit,
          sourceProduct.priceUnit,
        );
        const targetProduct = currentProducts.find(
          (product) =>
            product.id === productId &&
            product.measurementUnit === nextMeasurementUnit,
        );

        if (targetProduct) {
          return currentProducts
            .filter(
              (product) =>
                !(
                  product.id === productId &&
                  product.measurementUnit === currentMeasurementUnit
                ),
            )
            .map((product) => {
              if (
                product.id !== productId ||
                product.measurementUnit !== nextMeasurementUnit
              ) {
                return product;
              }

              return {
                ...product,
                quantity: String(
                  roundQuantity(
                    parseQuantity(targetProduct.quantity) +
                      convertedSourceQuantity,
                  ),
                ),
              };
            });
        }

        return currentProducts.map((product) => {
          if (
            product.id !== productId ||
            product.measurementUnit !== currentMeasurementUnit
          ) {
            return product;
          }

          return {
            ...product,
            quantity: String(convertedSourceQuantity),
            measurementUnit: nextMeasurementUnit,
          };
        });
      });
    },
    [],
  );

  const clearCart = useCallback(() => {
    setProducts([]);
  }, []);

  const value = useMemo(
    () => ({
      products,
      productsCount: products.reduce(
        (currentCount, product) =>
          currentCount + parseQuantity(product.quantity),
        0,
      ),
      addRecipeProducts,
      updateProductQuantity,
      updateProductMeasurementUnit,
      clearCart,
    }),
    [
      addRecipeProducts,
      clearCart,
      products,
      updateProductMeasurementUnit,
      updateProductQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

export { CartProvider, useCart };
