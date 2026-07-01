import { COLORS } from "@/constants/Constants";
import { useCart } from "@/contexts/CartContext";
import { HeaderProps } from "@/types/HeaderProps";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function Header({ title, isCartDisplayed, isLogoDisplayed }: HeaderProps) {
  const router = useRouter();
  const { ingredientsCount } = useCart();

  const handleLogoPress = () => {
    router.push("/products");
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      {isLogoDisplayed ? (
        <Pressable onPress={handleLogoPress}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logoIcon}
            resizeMode="contain"
          />
        </Pressable>
      ) : null}
      {isCartDisplayed ? (
        <View style={styles.cartIconContainer}>
          <Ionicons
            name="cart-outline"
            size={36}
            color={COLORS.brandColor}
            style={styles.cartIcon}
          />
          {ingredientsCount > 0 ? (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{ingredientsCount}</Text>
            </View>
          ) : null}
        </View>
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
  cartIconContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    backgroundColor: COLORS.brandColor,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
    includeFontPadding: false,
  },
  logoIcon: {
    width: 50,
    height: 50,
    cursor: "pointer",
  },
});

export { Header };
