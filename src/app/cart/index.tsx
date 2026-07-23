import { CartCheckout } from "@/components/CartCheckout";
import { CartProduct } from "@/components/CartProduct";
import { EmptyCart } from "@/components/EmptyCart";
import { Header } from "@/components/Header";
import { CART_TEXT, COLORS } from "@/constants/Constants";
import { PRODUCTS } from "@/constants/Mock";
import { useCart } from "@/contexts/CartContext";
import { MeasurementUnit } from "@/types/MeasurementUnit";
import { Product } from "@/types/Product";
import { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { getProductDisplayPrice, parseQuantity } from "../utils";

function getAvailableMeasurementUnits(
  product: Product,
  fallbackUnits: MeasurementUnit[] = [],
): MeasurementUnit[] {
  return Array.from(
    new Set([
      ...(product.allowedMeasurementUnits ?? []),
      ...fallbackUnits,
      product.measurementUnit,
    ]),
  );
}

export default function CartPage() {
  const {
    products,
    updateProductQuantity,
    updateProductMeasurementUnit,
    clearCart,
  } = useCart();

  const totalPrice = useMemo(
    () =>
      products.reduce((currentTotal, product) => {
        const quantity = parseQuantity(product.quantity);

        return currentTotal + getProductDisplayPrice(product) * quantity;
      }, 0),
    [products],
  );

  const availableMeasurementUnitsByProductId = useMemo(
    () =>
      PRODUCTS.reduce<Record<string, MeasurementUnit[]>>(
        (currentUnitsByProductId, product) => {
          currentUnitsByProductId[product.id] =
            product.allowedMeasurementUnits ?? [];

          return currentUnitsByProductId;
        },
        {},
      ),
    [],
  );

  const handleDecreaseQuantity = (product: Product) => {
    const currentQuantity = parseQuantity(product.quantity);
    updateProductQuantity(
      product.id,
      product.measurementUnit,
      Math.max(0, currentQuantity - 1),
    );
  };

  const handleIncreaseQuantity = (product: Product) => {
    const currentQuantity = parseQuantity(product.quantity);
    updateProductQuantity(
      product.id,
      product.measurementUnit,
      currentQuantity + 1,
    );
  };

  const handleMeasurementUnitChange = (
    product: Product,
    nextMeasurementUnit: MeasurementUnit,
  ) => {
    updateProductMeasurementUnit(
      product.id,
      product.measurementUnit,
      nextMeasurementUnit,
    );
  };

  const handleCheckout = () => {
    clearCart();
  };

  return (
    <View style={styles.container}>
      <Header
        isBackDisplayed
        isLogoDisplayed
        isTitleDisplayed
        title={CART_TEXT}
      />

      {!products.length ? (
        <EmptyCart />
      ) : (
        <>
          <FlatList
            data={products}
            keyExtractor={(product) =>
              `${product.id}-${product.measurementUnit}`
            }
            contentContainerStyle={styles.listProducts}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: product }) => {
              const quantity = parseQuantity(product.quantity);
              const itemTotal = getProductDisplayPrice(product) * quantity;
              const measurementUnits = getAvailableMeasurementUnits(
                product,
                availableMeasurementUnitsByProductId[product.id],
              );

              return (
                <CartProduct
                  item={product}
                  quantity={quantity}
                  measurementUnits={measurementUnits}
                  itemTotal={itemTotal}
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  handleMeasurementUnitChange={handleMeasurementUnitChange}
                />
              );
            }}
          />

          <CartCheckout
            totalPrice={totalPrice}
            handleCheckout={handleCheckout}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surfaceColor,
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  listProducts: {
    paddingBottom: 12,
  },
});
