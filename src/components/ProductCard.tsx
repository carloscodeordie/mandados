import { ADDED_FEEDBACK_DURATION_MS, COLORS } from "@/constants/Constants";
import { useCart } from "@/contexts/CartContext";
import { ProductCardProps } from "@/types/ProductCardProps";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

function ProductCard({ product }: ProductCardProps) {
  const { addRecipeProducts } = useCart();
  const addedFeedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [isUnitSelected, setIsUnitSelected] = useState(
    product.measurementUnit === "unit",
  );
  const [isAddedFeedbackDisplayed, setIsAddedFeedbackDisplayed] =
    useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const isMeasurementSwitchDisplayed =
    (product.allowedMeasurementUnits?.length ?? 0) > 0;
  const isMeasurementTypeSwitchDisabled = product.measurementUnit === "unit";

  const selectedMeasurementUnit = isMeasurementSwitchDisplayed
    ? isUnitSelected
      ? "unit"
      : product.measurementUnit
    : product.measurementUnit;
  const isDecreaseDisabled = selectedQuantity <= 1;
  const isIncreaseDisabled = selectedQuantity >= 10;

  useEffect(() => {
    return () => {
      if (addedFeedbackTimeoutRef.current) {
        clearTimeout(addedFeedbackTimeoutRef.current);
      }
    };
  }, []);

  const handleAddProduct = () => {
    setIsAddedFeedbackDisplayed(true);

    if (addedFeedbackTimeoutRef.current) {
      clearTimeout(addedFeedbackTimeoutRef.current);
    }

    addedFeedbackTimeoutRef.current = setTimeout(() => {
      setIsAddedFeedbackDisplayed(false);
      addedFeedbackTimeoutRef.current = null;
    }, ADDED_FEEDBACK_DURATION_MS);

    addRecipeProducts([
      {
        ...product,
        quantity: String(selectedQuantity),
        measurementUnit: selectedMeasurementUnit,
      },
    ]);
  };

  const handleDecreaseQuantity = () => {
    setSelectedQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  };

  const handleIncreaseQuantity = () => {
    setSelectedQuantity((currentQuantity) => Math.min(10, currentQuantity + 1));
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardTopContent}>
        <Text numberOfLines={1} style={styles.productTitle}>
          {product.name}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.productCategory}>{product.category}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
        </View>

        <Text style={styles.stockText}>
          {product.inStock ? "Disponible" : "Sin stock"}
        </Text>
      </View>

      {isMeasurementSwitchDisplayed ? (
        <View style={styles.switchRow}>
          <Text style={styles.measurementText}>unit</Text>
          <Switch
            value={isUnitSelected}
            onValueChange={setIsUnitSelected}
            disabled={isMeasurementTypeSwitchDisabled}
            trackColor={{ false: "#D1D5DB", true: "#86EFAC" }}
            thumbColor={isUnitSelected ? COLORS.brandColor : "#FFFFFF"}
          />
          <Text style={styles.measurementText}>{product.measurementUnit}</Text>
        </View>
      ) : null}

      <View style={styles.quantitySelectorRow}>
        <Text style={styles.quantityLabel}>Cantidad</Text>

        <View style={styles.quantityControls}>
          <Pressable
            accessibilityLabel="Disminuir cantidad"
            disabled={isDecreaseDisabled}
            onPress={handleDecreaseQuantity}
            style={[
              styles.quantityButton,
              isDecreaseDisabled && styles.quantityButtonDisabled,
            ]}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </Pressable>

          <Text style={styles.quantityValue}>{selectedQuantity}</Text>

          <Pressable
            accessibilityLabel="Aumentar cantidad"
            disabled={isIncreaseDisabled}
            onPress={handleIncreaseQuantity}
            style={[
              styles.quantityButton,
              isIncreaseDisabled && styles.quantityButtonDisabled,
            ]}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        disabled={!product.inStock}
        onPress={handleAddProduct}
        style={[
          styles.addButton,
          isAddedFeedbackDisplayed && styles.addButtonAdded,
          !product.inStock && styles.addButtonDisabled,
        ]}
      >
        <Text style={styles.addButtonText}>
          {isAddedFeedbackDisplayed
            ? "Agregado"
            : `Agregar (${selectedQuantity} ${selectedMeasurementUnit})`}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  addButtonAdded: {
    backgroundColor: COLORS.successColor,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: COLORS.brandColor,
    borderRadius: 12,
    justifyContent: "center",
    minHeight: 42,
    paddingHorizontal: 12,
  },
  addButtonDisabled: {
    backgroundColor: "#A3A3A3",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  card: {
    backgroundColor: COLORS.defaultBackground,
    borderColor: "#E5E7EB",
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    gap: 12,
    justifyContent: "space-between",
    minHeight: 200,
    padding: 14,
    shadowColor: COLORS.primaryColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTopContent: {
    gap: 8,
  },
  measurementText: {
    color: COLORS.secondaryColor,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productCategory: {
    color: COLORS.secondaryColor,
    fontSize: 13,
    fontWeight: "700",
  },
  productPrice: {
    color: COLORS.primaryColor,
    fontSize: 16,
    fontWeight: "800",
  },
  productTitle: {
    color: COLORS.primaryColor,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 22,
  },
  quantityButton: {
    alignItems: "center",
    backgroundColor: COLORS.surfaceColor,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    borderWidth: 1,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  quantityButtonDisabled: {
    opacity: 0.45,
  },
  quantityButtonText: {
    color: COLORS.primaryColor,
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 20,
  },
  quantityControls: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  quantityLabel: {
    color: COLORS.secondaryColor,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  quantitySelectorRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantityValue: {
    color: COLORS.primaryColor,
    fontSize: 16,
    fontWeight: "800",
    minWidth: 24,
    textAlign: "center",
  },
  stockText: {
    color: COLORS.primaryColor,
    fontSize: 14,
    fontWeight: "600",
  },
  switchRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export { ProductCard };
