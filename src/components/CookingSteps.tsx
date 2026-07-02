import { COLORS, PREPARATION_STEPS } from "@/constants/Constants";
import { CookingStepsProps } from "@/types/CookingStepsProps";
import { StyleSheet, Text, View } from "react-native";

function CookingSteps({ isMobileLayout }: CookingStepsProps) {
  return (
    <View style={styles.cookingStepsContainer}>
      <Text style={styles.cookingStepsTitle}>Pasos</Text>

      {isMobileLayout ? (
        <View style={styles.cookingStepRowMobile}>
          {PREPARATION_STEPS.map((step, index) => (
            <View key={step} style={[styles.cookingStepItemMobile]}>
              <Text style={styles.cookingStepNumberMobile}>{index + 1}</Text>
              <Text style={styles.cookingStepTextMobile}>{step}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.cookingStepsRow}>
          {PREPARATION_STEPS.map((step, index) => (
            <View key={step} style={styles.cookingStepItem}>
              <Text style={styles.cookingStepNumber}>{index + 1}</Text>
              <Text style={styles.cookingStepText}>{step}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cookingStepsContainer: {
    marginBottom: 16,
  },
  cookingStepsTitle: {
    color: COLORS.primaryColor,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 14,
  },
  cookingStepsRow: {
    gap: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cookingStepItem: {
    flex: 1,
  },
  cookingStepNumber: {
    color: COLORS.brandColor,
    fontSize: 54,
    fontWeight: "800",
    lineHeight: 56,
    marginBottom: 8,
    textAlign: "center",
  },
  cookingStepText: {
    color: COLORS.secondaryColor,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
  cookingStepRowMobile: {
    width: "100%",
  },
  cookingStepItemMobile: {
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
  },
  cookingStepNumberMobile: {
    color: COLORS.brandColor,
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 32,
    marginBottom: 0,
    marginRight: 12,
    textAlign: "center",
    width: 28,
  },
  cookingStepTextMobile: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 4,
  },
});

export { CookingSteps };
