import { Header } from "@/components/Header";
import { CART_TEXT, COLORS } from "@/constants/Constants";
import { PRODUCTS } from "@/constants/Mock";
import { useCart } from "@/contexts/CartContext";
import { MeasurementUnit } from "@/types/MeasurementUnit";
import { Product } from "@/types/Product";
import { Picker } from "@react-native-picker/picker";
import { useMemo } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

function parseQuantity(quantity: string) {
  const parsedQuantity = Number.parseFloat(quantity);

  if (Number.isNaN(parsedQuantity) || parsedQuantity <= 0) {
    return 1;
  }

  return parsedQuantity;
}

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

function formatQuantity(quantity: number) {
  if (Number.isInteger(quantity)) {
    return String(quantity);
  }

  return quantity.toFixed(3).replace(/\.?0+$/, "");
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
                <View style={styles.itemCard}>
                  <View style={styles.itemHeaderRow}>
                    <Text numberOfLines={1} style={styles.itemName}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemPrice}>
                      {formatPrice(item.price)} c/u
                    </Text>
                  </View>

                  {measurementUnits.length > 1 ? (
                    <View style={styles.unitsRow}>
                      <Text style={styles.unitLabel}>Unidad</Text>
                      <View style={styles.unitPickerWrapper}>
                        <Picker
                          selectedValue={item.measurementUnit}
                          onValueChange={(value) =>
                            handleMeasurementUnitChange(
                              item,
                              value as MeasurementUnit,
                            )
                          }
                          style={styles.unitPicker}
                          dropdownIconColor={COLORS.primaryColor}
                        >
                          {measurementUnits.map((unit) => (
                            <Picker.Item
                              key={`${item.id}-${unit}`}
                              label={unit.toUpperCase()}
                              value={unit}
                            />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  ) : null}

                  <View style={styles.itemFooterRow}>
                    <View style={styles.quantityControls}>
                      <Pressable
                        accessibilityLabel={`Disminuir cantidad de ${item.name}`}
                        onPress={() => handleDecreaseQuantity(item)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </Pressable>

                      <Text style={styles.quantityValue}>
                        {formatQuantity(quantity)}
                      </Text>

                      <Pressable
                        accessibilityLabel={`Aumentar cantidad de ${item.name}`}
                        onPress={() => handleIncreaseQuantity(item)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </Pressable>
                    </View>

                    <Text style={styles.itemTotal}>
                      {formatPrice(itemTotal)}
                    </Text>
                  </View>
                </View>
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
  itemCard: {
    backgroundColor: COLORS.defaultBackground,
    borderRadius: 16,
    marginBottom: 12,
    padding: 14,
  },
  itemFooterRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  itemHeaderRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemName: {
    color: COLORS.primaryColor,
    flex: 1,
    fontSize: 18,
    fontWeight: "800",
    marginRight: 10,
  },
  itemPrice: {
    color: COLORS.secondaryColor,
    fontSize: 14,
    fontWeight: "600",
  },
  itemTotal: {
    color: COLORS.primaryColor,
    fontSize: 17,
    fontWeight: "800",
  },
  listContent: {
    paddingBottom: 12,
  },
  quantityButton: {
    alignItems: "center",
    backgroundColor: COLORS.surfaceColor,
    borderRadius: 8,
    justifyContent: "center",
    width: 32,
    height: 32,
  },
  quantityButtonText: {
    color: COLORS.primaryColor,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 24,
  },
  quantityControls: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  quantityValue: {
    color: COLORS.primaryColor,
    fontSize: 16,
    fontWeight: "800",
    minWidth: 24,
    textAlign: "center",
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
  unitLabel: {
    color: COLORS.secondaryColor,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  unitPicker: {
    color: COLORS.primaryColor,
    height: Platform.OS === "ios" ? 140 : 44,
    marginTop: Platform.OS === "ios" ? -48 : 0,
  },
  unitPickerWrapper: {
    backgroundColor: COLORS.surfaceColor,
    borderColor: COLORS.surfaceColor,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 6,
    overflow: "hidden",
  },
  unitsRow: {
    marginTop: 10,
    width: 170,
  },
});
