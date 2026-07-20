import {
  COLORS,
  EMPTY_CART_DESCRIPTION,
  EMPTY_CART_TITLE,
} from "@/constants/Constants";
import { StyleSheet, Text, View } from "react-native";

function EmptyCart() {
  return (
    <View style={styles.emptyCartContainer}>
      <Text style={styles.emptyCartTitle}>{EMPTY_CART_TITLE}</Text>
      <Text style={styles.emptyCartDescription}>{EMPTY_CART_DESCRIPTION}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyCartContainer: {
    alignItems: "center",
    backgroundColor: COLORS.defaultBackground,
    borderRadius: 24,
    marginTop: 16,
    padding: 24,
  },
  emptyCartDescription: {
    color: COLORS.secondaryColor,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    textAlign: "center",
  },
  emptyCartTitle: {
    color: COLORS.primaryColor,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },
});

export { EmptyCart };
