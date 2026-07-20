import { CartProduct } from "@/components/CartProduct";
import { Header } from "@/components/Header";
import { CART_TEXT, COLORS } from "@/constants/Constants";
import { PRODUCTS } from "@/constants/Mock";
import { useCart } from "@/contexts/CartContext";
import { MeasurementUnit } from "@/types/MeasurementUnit";
import { Product } from "@/types/Product";
import { useMemo } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}
function parseQuantity(quantity: string) {
  const parsedQuantity = Number.parseFloat(quantity);

  if (Number.isNaN(parsedQuantity) || parsedQuantity <= 0) {
    return 1;
  }

  return parsedQuantity;
}

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

        return currentTotal + product.price * quantity;
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
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Tu carrito esta vacio</Text>
          <Text style={styles.emptyDescription}>
            Agrega productos desde recetas o productos para comenzar tu compra.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={products}
            keyExtractor={(item) => `${item.id}-${item.measurementUnit}`}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const quantity = parseQuantity(item.quantity);
              const itemTotal = item.price * quantity;
              const measurementUnits = getAvailableMeasurementUnits(
                item,
                availableMeasurementUnitsByProductId[item.id],
              );

              return (
                <CartProduct
                  item={item}
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

          <View style={styles.summaryContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
            </View>

            <Pressable onPress={handleCheckout} style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  checkoutButton: {
    alignItems: "center",
    backgroundColor: COLORS.brandColor,
    borderRadius: 14,
    justifyContent: "center",
    marginTop: 14,
    minHeight: 52,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  container: {
    backgroundColor: COLORS.surfaceColor,
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  emptyContainer: {
    alignItems: "center",
    backgroundColor: COLORS.defaultBackground,
    borderRadius: 24,
    marginTop: 16,
    padding: 24,
  },
  emptyDescription: {
    color: COLORS.secondaryColor,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    textAlign: "center",
  },
  emptyTitle: {
    color: COLORS.primaryColor,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 12,
  },
  summaryContainer: {
    backgroundColor: COLORS.defaultBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 18,
  },
  totalLabel: {
    color: COLORS.secondaryColor,
    fontSize: 16,
    fontWeight: "700",
  },
  totalRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalValue: {
    color: COLORS.primaryColor,
    fontSize: 24,
    fontWeight: "800",
  },
});
