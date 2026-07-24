import {
  convertPrice,
  getProductDisplayPrice,
  roundQuantity,
} from "@/app/utils";
import { CART_PRODUCTS_STORAGE_KEY } from "@/constants/Constants";
import { PRODUCTS } from "@/constants/Mock";
import { MeasurementUnit } from "@/types/MeasurementUnit";
import { Product } from "@/types/Product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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

function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const hasHydratedProducts = useRef(false);

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
          price: getProductDisplayPrice(newProduct),
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
        const targetProduct = currentProducts.find(
          (product) =>
            product.id === productId &&
            product.measurementUnit === nextMeasurementUnit,
        );

        const nextUnitCatalogProduct = PRODUCTS.find(
          (product) =>
            product.id === productId &&
            product.measurementUnit === nextMeasurementUnit,
        );

        const nextUnitPrice =
          (nextUnitCatalogProduct
            ? getProductDisplayPrice(nextUnitCatalogProduct)
            : undefined) ??
          convertPrice(
            sourceProduct.price,
            currentMeasurementUnit,
            nextMeasurementUnit,
            sourceProduct.priceUnit,
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
                price: nextUnitPrice,
                priceUnit:
                  nextUnitCatalogProduct?.priceUnit ?? product.priceUnit,
                quantity: String(
                  roundQuantity(
                    parseQuantity(targetProduct.quantity) + sourceQuantity,
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
            allowedMeasurementUnits:
              nextUnitCatalogProduct?.allowedMeasurementUnits ??
              product.allowedMeasurementUnits,
            price: nextUnitPrice,
            priceUnit: nextUnitCatalogProduct?.priceUnit ?? product.priceUnit,
            quantity: String(sourceQuantity),
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

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const savedProducts = await AsyncStorage.getItem(
          CART_PRODUCTS_STORAGE_KEY,
        );

        if (!savedProducts || !isMounted) {
          return;
        }

        const parsedProducts = JSON.parse(savedProducts);

        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts as Product[]);
        }
      } catch (error) {
        console.warn("Could not load persisted cart products", error);
      } finally {
        hasHydratedProducts.current = true;
      }
    };

    void loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasHydratedProducts.current) {
      return;
    }

    const persistProducts = async () => {
      try {
        await AsyncStorage.setItem(
          CART_PRODUCTS_STORAGE_KEY,
          JSON.stringify(products),
        );
      } catch (error) {
        console.warn("Could not persist cart products", error);
      }
    };

    void persistProducts();
  }, [products]);

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
