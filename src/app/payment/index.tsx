import { Header } from "@/components/Header";
import {
  CART_ROUTE,
  COLORS,
  LOGIN_ROUTE,
  PAYMENT_TEXT,
  PRODUCTS_ROUTE,
} from "@/constants/Constants";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Redirect, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PaymentPage() {
  const { clearCart } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleConfirmPayment = () => {
    clearCart();
    router.replace(PRODUCTS_ROUTE);
  };

  const handleLogout = () => {
    logout();
    router.replace(CART_ROUTE);
  };

  if (!isLoggedIn) {
    return <Redirect href={LOGIN_ROUTE} />;
  }

  return (
    <View style={styles.container}>
      <Header
        isBackDisplayed
        isLogoDisplayed
        isTitleDisplayed
        title={PAYMENT_TEXT}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Listo para finalizar tu compra.</Text>

        <Pressable onPress={handleConfirmPayment} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Confirmar pago</Text>
        </Pressable>

        <Pressable onPress={handleLogout} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Cerrar sesion</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surfaceColor,
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: COLORS.brandColor,
    borderRadius: 999,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 20,
    width: "100%",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  secondaryButton: {
    alignItems: "center",
    borderColor: COLORS.secondaryColor,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 12,
    minHeight: 48,
    paddingHorizontal: 20,
    width: "100%",
  },
  secondaryButtonText: {
    color: COLORS.secondaryColor,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  title: {
    color: COLORS.primaryColor,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
});
