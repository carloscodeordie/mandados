import { Header } from "@/components/Header";
import {
  COLORS,
  LOGIN_TEXT,
  LOGON_ROUTE,
  LOGON_TEXT,
  PAYMENT_ROUTE,
  PAYMENT_TEXT,
} from "@/constants/Constants";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginPage() {
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim());

  const handleLogin = () => {
    if (!isValidEmail(email)) {
      setError("Ingresa un correo electronico valido.");
      return;
    }

    if (!password.trim()) {
      setError("Ingresa tu contrasena.");
      return;
    }

    const isLoginSuccessful = login(email, password);

    if (!isLoginSuccessful) {
      setError("No encontramos una cuenta con ese correo. Crea una cuenta.");
      return;
    }

    setError("");
    router.replace(PAYMENT_ROUTE);
  };

  const handleGoToLogon = () => {
    router.push(LOGON_ROUTE);
  };

  if (isLoggedIn) {
    return <Redirect href={PAYMENT_ROUTE} />;
  }

  return (
    <View style={styles.loginContainer}>
      <Header isBackDisplayed />

      <View style={styles.loginContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logoImage}
          />
        </View>

        <Text style={styles.loginTitle}>
          Si ya tienes cuenta, inicia sesion con tu correo.
        </Text>

        <View style={styles.loginInputWrapper}>
          <Ionicons
            color={COLORS.secondaryColor}
            name="mail-outline"
            size={18}
            style={styles.loginInputIcon}
          />

          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="correo@ejemplo.com"
            style={[styles.loginInput, styles.loginInputWithLeftIcon]}
            value={email}
          />
        </View>

        <TextInput
          autoCapitalize="none"
          autoComplete="password"
          onChangeText={setPassword}
          placeholder="Contraseña"
          secureTextEntry
          style={styles.loginInput}
          value={password}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <Text
            style={styles.loginButtonText}
          >{`${LOGIN_TEXT} y continuar al ${PAYMENT_TEXT.toLowerCase()}`}</Text>
        </Pressable>

        <View style={styles.logonContainer}>
          <Text style={styles.logonTitle}>No tienes una cuenta?</Text>

          <Pressable onPress={handleGoToLogon} style={styles.logonButton}>
            <Text style={styles.logonButtonText}>{LOGON_TEXT}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: COLORS.dangerColor,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "left",
    width: "100%",
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: COLORS.brandColor,
    borderRadius: 999,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 20,
    marginTop: 8,
    width: "100%",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  loginContainer: {
    backgroundColor: COLORS.surfaceColor,
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  loginContent: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 36,
  },
  logoImage: {
    height: 150,
    resizeMode: "contain",
    width: 300,
  },
  loginInput: {
    backgroundColor: COLORS.defaultBackground,
    borderColor: COLORS.secondaryColor,
    borderRadius: 12,
    borderWidth: 1,
    color: COLORS.primaryColor,
    fontSize: 14,
    marginBottom: 10,
    minHeight: 48,
    paddingHorizontal: 14,
    width: "100%",
  },
  loginInputIcon: {
    left: 14,
    position: "absolute",
    top: 15,
    zIndex: 1,
  },
  loginInputWithLeftIcon: {
    paddingLeft: 40,
  },
  loginInputWrapper: {
    position: "relative",
    width: "100%",
  },
  loginTitle: {
    color: COLORS.primaryColor,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  logonButton: {
    alignItems: "center",
    borderColor: COLORS.secondaryColor,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 18,
  },
  logonButtonText: {
    color: COLORS.secondaryColor,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
  logonContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  logonTitle: {
    color: COLORS.secondaryColor,
    fontSize: 13,
    marginBottom: 8,
  },
});
