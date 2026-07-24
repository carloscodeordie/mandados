import { Header } from "@/components/Header";
import {
  COLORS,
  LOGIN_ROUTE,
  LOGIN_TEXT,
  LOGON_TEXT,
  PAYMENT_ROUTE,
  PAYMENT_TEXT,
} from "@/constants/Constants";
import { useAuth } from "@/contexts/AuthContext";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function LogonPage() {
  const { isLoggedIn, register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim());

  const handleRegister = () => {
    if (!isValidEmail(email)) {
      setError("Ingresa un correo electronico valido.");
      return;
    }

    if (!password.trim()) {
      setError("Ingresa una contrasena.");
      return;
    }

    const isRegistrationSuccessful = register(email, password);

    if (!isRegistrationSuccessful) {
      setError("Ese correo ya esta registrado. Inicia sesion.");
      return;
    }

    setError("");
    router.replace(PAYMENT_ROUTE);
  };

  const handleGoToLogin = () => {
    router.replace(LOGIN_ROUTE);
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
        title={LOGON_TEXT}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Crea tu cuenta registrando tu correo.</Text>

        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="correo@ejemplo.com"
          style={styles.input}
          value={email}
        />

        <TextInput
          autoCapitalize="none"
          autoComplete="password"
          onChangeText={setPassword}
          placeholder="Contrasena"
          secureTextEntry
          style={styles.input}
          value={password}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable onPress={handleRegister} style={styles.primaryButton}>
          <Text
            style={styles.primaryButtonText}
          >{`${LOGON_TEXT} y continuar al ${PAYMENT_TEXT.toLowerCase()}`}</Text>
        </Pressable>

        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>Ya tienes una cuenta?</Text>

          <Pressable onPress={handleGoToLogin} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>{LOGIN_TEXT}</Text>
          </Pressable>
        </View>
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
  errorText: {
    color: COLORS.dangerColor,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "left",
    width: "100%",
  },
  input: {
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
  loginContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  loginTitle: {
    color: COLORS.secondaryColor,
    fontSize: 13,
    marginBottom: 8,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: COLORS.brandColor,
    borderRadius: 999,
    justifyContent: "center",
    marginTop: 8,
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
    minHeight: 44,
    paddingHorizontal: 18,
  },
  secondaryButtonText: {
    color: COLORS.secondaryColor,
    fontSize: 13,
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
