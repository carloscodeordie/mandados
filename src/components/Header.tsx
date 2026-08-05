import { CART_ROUTE, COLORS } from "@/constants/Constants";
import { useCart } from "@/contexts/CartContext";
import { HeaderProps } from "@/types/HeaderProps";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

function Header({
  title,
  isBackDisplayed,
  isCartDisplayed,
  isLogoDisplayed,
  isTitleDisplayed,
}: HeaderProps) {
  const router = useRouter();
  const { productsCount } = useCart();
  const cartPulseScale = useRef(new Animated.Value(1)).current;
  const cartJolt = useRef(new Animated.Value(0)).current;
  const previousProductsCountRef = useRef(productsCount);

  useEffect(() => {
    const previousProductsCount = previousProductsCountRef.current;

    if (isCartDisplayed && productsCount > previousProductsCount) {
      cartPulseScale.setValue(1);
      cartJolt.setValue(0);

      Animated.parallel([
        Animated.sequence([
          Animated.timing(cartPulseScale, {
            toValue: 1.24,
            duration: 85,
            useNativeDriver: true,
          }),
          Animated.timing(cartPulseScale, {
            toValue: 0.9,
            duration: 75,
            useNativeDriver: true,
          }),
          Animated.timing(cartPulseScale, {
            toValue: 1.08,
            duration: 70,
            useNativeDriver: true,
          }),
          Animated.spring(cartPulseScale, {
            toValue: 1,
            friction: 3.2,
            tension: 220,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(cartJolt, {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(cartJolt, {
            toValue: 0,
            duration: 90,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }

    previousProductsCountRef.current = productsCount;
  }, [cartJolt, cartPulseScale, isCartDisplayed, productsCount]);

  const badgeScale = cartPulseScale.interpolate({
    inputRange: [0.9, 1, 1.24],
    outputRange: [0.86, 1, 1.34],
  });

  const cartWiggleRotate = cartJolt.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: ["0deg", "-12deg", "11deg", "-8deg", "5deg", "0deg"],
  });

  const cartLiftTranslateY = cartJolt.interpolate({
    inputRange: [0, 0.3, 0.6, 1],
    outputRange: [0, -4, 1, 0],
  });

  const handleBackPress = () => {
    router.back();
  };

  const handleLogoPress = () => {
    router.push("/home");
  };

  const handleCartPress = () => {
    router.push(CART_ROUTE);
  };

  return (
    <View style={styles.headerContainer}>
      {isBackDisplayed ? (
        <Pressable onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={COLORS.secondaryColor} />
        </Pressable>
      ) : null}

      {isTitleDisplayed ? (
        <Text style={styles.headerTitle}>{title}</Text>
      ) : null}

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
        <Pressable onPress={handleCartPress} style={styles.cartIconContainer}>
          <Animated.View
            style={{
              transform: [
                { scale: cartPulseScale },
                { rotate: cartWiggleRotate },
                { translateY: cartLiftTranslateY },
              ],
            }}
          >
            <Ionicons
              name="cart-outline"
              size={36}
              color={COLORS.brandColor}
              style={styles.cartIcon}
            />
          </Animated.View>
          {productsCount > 0 ? (
            <Animated.View
              style={[styles.cartBadge, { transform: [{ scale: badgeScale }] }]}
            >
              <Text style={styles.cartBadgeText}>{productsCount}</Text>
            </Animated.View>
          ) : null}
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  cartBadge: {
    alignItems: "center",
    backgroundColor: COLORS.brandColor,
    borderRadius: 10,
    height: 20,
    justifyContent: "center",
    minWidth: 20,
    paddingHorizontal: 6,
    position: "absolute",
    right: -6,
    top: -5,
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    includeFontPadding: false,
    lineHeight: 14,
  },
  cartIcon: {
    marginLeft: 12,
  },
  cartIconContainer: {
    position: "relative",
  },
  headerContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    color: COLORS.secondaryColor,
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 24,
    lineHeight: 40,
  },
  logoIcon: {
    cursor: "pointer",
    height: 50,
    width: 50,
  },
});

export { Header };
