import { formatPrice } from "@/app/utils";
import { COLORS } from "@/constants/Constants";
import { CartCheckoutProps } from "@/types/CartCheckoutProps";
import { Pressable, StyleSheet, Text, View } from "react-native";

function CartCheckout({ totalPrice, handleCheckout }: CartCheckoutProps) {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
      </View>

      <Pressable onPress={handleCheckout} style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </Pressable>
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
  summaryContainer: {
    backgroundColor: COLORS.defaultBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 18,
    paddingHorizontal: 14,
    paddingTop: 14,
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

export { CartCheckout };
