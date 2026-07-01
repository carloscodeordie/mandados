import { COLORS } from "@/constants/Constants";
import { HeaderProps } from "@/types/HeaderProps";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

function Header({ title, isCartDisplayed }: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      {isCartDisplayed ? (
        <Ionicons
          name="cart-outline"
          size={36}
          color={COLORS.brandColor}
          style={styles.cartIcon}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: COLORS.secondaryColor,
    fontSize: 24,
    fontFamily: "Poppins_800ExtraBold",
    lineHeight: 40,
  },
  cartIcon: {
    marginLeft: 12,
  },
});

export { Header };
