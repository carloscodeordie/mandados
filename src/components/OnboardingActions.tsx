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
          isDesktop ? styles.buttonDesktop : null,
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
          isDesktop ? styles.buttonDesktop : null,
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
    flexDirection: "row",
    gap: 12,
    marginBottom: 36,
    paddingHorizontal: 24,
  },
  actionsDesktop: {
    flexDirection: "column",
    alignSelf: "center",
  },
  button: {
    flex: 1,
    minHeight: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDesktop: {
    flex: 0,
    width: 260,
    height: 56,
  },
  primaryButton: {
    backgroundColor: COLORS.brandColor,
  },
  secondaryButton: {
    backgroundColor: COLORS.defaultBackground,
    borderWidth: 1,
    borderColor: COLORS.secondaryColor,
  },
  buttonText: {
    color: COLORS.defaultBackground,
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  secondaryButtonText: {
    color: COLORS.primaryColor,
  },
});

export { OnboardingActions };
