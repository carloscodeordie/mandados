import {
  COLORS,
  PRODUCTS_ROUTE,
  PRODUCTS_TEXT,
  RECIPES_ROUTE,
  RECIPES_TEXT,
} from "@/constants/Constants";
import { OnboardingActionsProps } from "@/types/OnboardingActionsProps";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

function OnboardingActions({ isDesktop }: OnboardingActionsProps) {
  const router = useRouter();

  return (
    <View style={[styles.actions, isDesktop ? styles.actionsDesktop : null]}>
      <Pressable
        style={[
          styles.button,
          styles.secondaryButton,
          isDesktop ? styles.buttonDesktop : styles.buttonMobile,
        ]}
        onPress={() => router.push(RECIPES_ROUTE)}
        accessibilityRole="button"
        accessibilityLabel="Ir a recetas"
        accessibilityHint="Abre la pantalla de recetas"
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          {RECIPES_TEXT.toUpperCase()}
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.button,
          styles.primaryButton,
          isDesktop ? styles.buttonDesktop : styles.buttonMobile,
        ]}
        onPress={() => router.push(PRODUCTS_ROUTE)}
        accessibilityRole="button"
        accessibilityLabel="Ir a productos"
        accessibilityHint="Abre la pantalla de productos"
      >
        <Text style={styles.buttonText}>{PRODUCTS_TEXT.toUpperCase()}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 36,
    paddingHorizontal: 24,
  },
  actionsDesktop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    alignItems: "center",
    borderRadius: 18,
    justifyContent: "center",
    minHeight: 56,
  },
  buttonDesktop: {
    flexShrink: 0,
    height: 56,
    width: 220,
  },
  buttonMobile: {
    flex: 0,
    height: 56,
    width: "100%",
  },
  buttonText: {
    color: COLORS.defaultBackground,
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: COLORS.brandColor,
  },
  secondaryButton: {
    backgroundColor: COLORS.defaultBackground,
    borderColor: COLORS.secondaryColor,
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: COLORS.primaryColor,
  },
});

export { OnboardingActions };
