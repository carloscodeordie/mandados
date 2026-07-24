import {
  formatPrice,
  formatQuantity,
  getMeasurementUnitLabel,
  getProductDisplayPrice,
} from "@/app/utils";
import { COLORS, UNIT_TEXT } from "@/constants/Constants";
import { MeasurementUnit } from "@/types/MeasurementUnit";
import { Product } from "@/types/Product";
import { Picker } from "@react-native-picker/picker";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

function CartProduct({
  item,
  quantity,
  measurementUnits,
  itemTotal,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleMeasurementUnitChange,
}: {
  item: Product;
  quantity: number;
  measurementUnits: MeasurementUnit[];
  itemTotal: number;
  handleIncreaseQuantity: (item: Product) => void;
  handleDecreaseQuantity: (item: Product) => void;
  handleMeasurementUnitChange: (item: Product, unit: MeasurementUnit) => void;
}) {
  return (
    <View style={styles.productCard}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.productImage}
        resizeMode="cover"
      />

      <View style={styles.productContent}>
        <View style={styles.productHeaderRow}>
          <Text numberOfLines={1} style={styles.productName}>
            {item.name}
          </Text>
          <Text style={styles.productPrice}>
            {formatPrice(getProductDisplayPrice(item))} /{" "}
            {getMeasurementUnitLabel(item.measurementUnit)}
          </Text>
        </View>

        {measurementUnits.length > 1 ? (
          <View style={styles.productUnitsRow}>
            <Text style={styles.productUnitLabel}>{UNIT_TEXT}</Text>
            <View style={styles.productUnitPickerWrapper}>
              <Picker
                selectedValue={item.measurementUnit}
                onValueChange={(value) =>
                  handleMeasurementUnitChange(item, value as MeasurementUnit)
                }
                style={styles.productUnitPicker}
                dropdownIconColor={COLORS.primaryColor}
              >
                {measurementUnits.map((unit) => (
                  <Picker.Item
                    key={`${item.id}-${unit}`}
                    label={getMeasurementUnitLabel(unit)}
                    value={unit}
                  />
                ))}
              </Picker>
            </View>
          </View>
        ) : null}

        <View style={styles.productFooterRow}>
          <View style={styles.productQuantityControls}>
            <Pressable
              accessibilityLabel={`Disminuir cantidad de ${item.name}`}
              onPress={() => handleDecreaseQuantity(item)}
              style={styles.productQuantityButton}
            >
              <Text style={styles.productQuantityButtonText}>-</Text>
            </Pressable>

            <Text style={styles.productQuantityValue}>
              {formatQuantity(quantity)}
            </Text>

            <Pressable
              accessibilityLabel={`Aumentar cantidad de ${item.name}`}
              onPress={() => handleIncreaseQuantity(item)}
              style={styles.productQuantityButton}
            >
              <Text style={styles.productQuantityButtonText}>+</Text>
            </Pressable>
          </View>

          <Text style={styles.productTotal}>{formatPrice(itemTotal)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    alignItems: "center",
    backgroundColor: COLORS.defaultBackground,
    borderRadius: 16,
    flexDirection: "row",
    marginBottom: 12,
    padding: 14,
  },
  productContent: {
    flex: 1,
  },
  productFooterRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  productHeaderRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productName: {
    color: COLORS.primaryColor,
    flex: 1,
    fontSize: 18,
    fontWeight: "800",
    marginRight: 10,
  },
  productImage: {
    backgroundColor: COLORS.surfaceColor,
    borderRadius: 12,
    height: 72,
    marginRight: 12,
    width: 72,
  },
  productPrice: {
    color: COLORS.secondaryColor,
    fontSize: 14,
    fontWeight: "600",
  },
  productTotal: {
    color: COLORS.primaryColor,
    fontSize: 17,
    fontWeight: "800",
  },
  productQuantityButton: {
    alignItems: "center",
    backgroundColor: COLORS.surfaceColor,
    borderRadius: 8,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  productQuantityButtonText: {
    color: COLORS.primaryColor,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 24,
  },
  productQuantityControls: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  productQuantityValue: {
    color: COLORS.primaryColor,
    fontSize: 16,
    fontWeight: "800",
    minWidth: 24,
    textAlign: "center",
  },
  productUnitLabel: {
    color: COLORS.secondaryColor,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  productUnitPicker: {
    color: COLORS.primaryColor,
    height: Platform.OS === "ios" ? 140 : 44,
    marginTop: Platform.OS === "ios" ? -48 : 0,
    paddingLeft: Platform.OS === "web" ? 12 : 0,
    paddingRight: Platform.OS === "web" ? 32 : 0,
    ...(Platform.OS === "web"
      ? {
          borderWidth: 0,
          outlineStyle: "none",
          backgroundColor: "transparent",
          appearance: "none",
        }
      : null),
  },
  productUnitPickerWrapper: {
    backgroundColor: COLORS.surfaceColor,
    borderColor: COLORS.brandColor,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 6,
    overflow: Platform.OS === "web" ? "visible" : "hidden",
  },
  productUnitsRow: {
    marginTop: 10,
    width: 170,
  },
});

export { CartProduct };
