import { formatPrice, formatQuantity } from "@/app/utils";
import { COLORS } from "@/constants/Constants";
import { MeasurementUnit } from "@/types/MeasurementUnit";
import { Picker } from "@react-native-picker/picker";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

function CartProduct({
  item,
  quantity,
  measurementUnits,
  itemTotal,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleMeasurementUnitChange,
}: {
  item: any;
  quantity: number;
  measurementUnits: MeasurementUnit[];
  itemTotal: number;
  handleIncreaseQuantity: (item: any) => void;
  handleDecreaseQuantity: (item: any) => void;
  handleMeasurementUnitChange: (item: any, unit: MeasurementUnit) => void;
}) {
  return (
    <View style={styles.itemCard}>
      <View style={styles.itemHeaderRow}>
        <Text numberOfLines={1} style={styles.itemName}>
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>{formatPrice(item.price)} c/u</Text>
      </View>

      {measurementUnits.length > 1 ? (
        <View style={styles.unitsRow}>
          <Text style={styles.unitLabel}>Unidad</Text>
          <View style={styles.unitPickerWrapper}>
            <Picker
              selectedValue={item.measurementUnit}
              onValueChange={(value) =>
                handleMeasurementUnitChange(item, value as MeasurementUnit)
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

          <Text style={styles.quantityValue}>{formatQuantity(quantity)}</Text>

          <Pressable
            accessibilityLabel={`Aumentar cantidad de ${item.name}`}
            onPress={() => handleIncreaseQuantity(item)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>

        <Text style={styles.itemTotal}>{formatPrice(itemTotal)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: COLORS.defaultBackground,
    borderRadius: 16,
    marginBottom: 12,
    padding: 14,
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
  unitsRow: {
    marginTop: 10,
    width: 170,
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
  itemFooterRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  quantityControls: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
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
  quantityValue: {
    color: COLORS.primaryColor,
    fontSize: 16,
    fontWeight: "800",
    minWidth: 24,
    textAlign: "center",
  },
});

export { CartProduct };
