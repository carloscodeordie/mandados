import { COLORS } from "@/constants/Constants";
import { HeaderProps } from "@/types/HeaderProps";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function Header({ title, isCartDisplayed, isLogoDisplayed }: HeaderProps) {
  const router = useRouter();

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
  logoIcon: {
    width: 50,
    height: 50,
    cursor: "pointer",
  },
});

export { Header };
