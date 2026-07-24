import { Header } from "@/components/Header";
import {
  COLORS,
  LOGIN_TEXT,
  PAYMENT_ROUTE,
  PAYMENT_TEXT,
} from "@/constants/Constants";
import { useAuth } from "@/contexts/AuthContext";
import { Redirect, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function LoginPage() {
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login();
    router.replace(PAYMENT_ROUTE);
  };

  if (isLoggedIn) {
    return <Redirect href={PAYMENT_ROUTE} />;
  }

  return (
    <View style={styles.container}>
      <Header
        isBackDisplayed
        isLogoDisplayed
        isTitleDisplayed
        title={LOGIN_TEXT}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Debes iniciar sesion para continuar.</Text>

        <Pressable onPress={handleLogin} style={styles.button}>
          <Text
            style={styles.buttonText}
          >{`${LOGIN_TEXT} y continuar al ${PAYMENT_TEXT.toLowerCase()}`}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: COLORS.brandColor,
    borderRadius: 999,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 20,
    width: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
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
  title: {
    color: COLORS.primaryColor,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
});
