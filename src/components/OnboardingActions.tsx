import { COLORS, HOME_ROUTE, HOME_TEXT } from "@/constants/Constants";
import { OnboardingActionsProps } from "@/types/OnboardingActionsProps";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

function OnboardingActions({ isDesktop }: OnboardingActionsProps) {
  const router = useRouter();

  const handleGoToHome = () => {
    router.push(HOME_ROUTE);
  };

  return (
    <View
      style={[
        styles.onboardingActionsContainer,
        isDesktop ? styles.onboardingActionsContainerDesktop : null,
      ]}
    >
      <Pressable
        style={[
          styles.onboardingActionsButton,
          isDesktop
            ? styles.onboardingActionsButtonDesktop
            : styles.onboardingActionsButtonMobile,
        ]}
        onPress={handleGoToHome}
      >
        <Text style={styles.onboardingActionsAccessText}>
          {HOME_TEXT.toUpperCase()}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  onboardingActionsContainer: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 36,
    paddingHorizontal: 24,
  },
  onboardingActionsContainerDesktop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  onboardingActionsButton: {
    alignItems: "center",
    backgroundColor: COLORS.brandColor,
    borderRadius: 18,
    justifyContent: "center",
    minHeight: 56,
  },
  onboardingActionsButtonDesktop: {
    flexShrink: 0,
    height: 56,
    width: 220,
  },
  onboardingActionsButtonMobile: {
    flex: 0,
    height: 56,
    width: "100%",
  },
  onboardingActionsAccessText: {
    color: COLORS.defaultBackground,
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
});

export { OnboardingActions };
