import { COLORS } from "@/constants/Constants";
import { OnboardingCardProps } from "@/types/OnboardingCardProps";
import { Image, StyleSheet, Text, View } from "react-native";

function OnboardingCard({
  description,
  isDesktop,
  illustrationHeight,
  imageSource,
  index,
  screenWidth,
  title,
}: OnboardingCardProps) {
  return (
    <View
      key={`${title}-${index}`}
      style={[styles.cardContainer, { width: screenWidth }]}
    >
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title.toUpperCase()}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
        <View style={[styles.cardIllustration, { height: illustrationHeight }]}>
          <Image
            source={imageSource}
            style={[
              styles.cardIllustrationImage,
              isDesktop ? styles.cardIllustrationImageDesktop : null,
            ]}
            resizeMode="contain"
            accessibilityLabel={title}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  card: {
    flex: 1,
    width: "100%",
    maxWidth: 880,
    borderRadius: 32,
    backgroundColor: COLORS.surfaceColor,
    padding: 28,
    justifyContent: "space-between",
    shadowColor: COLORS.secondaryColor,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
    minHeight: 470,
  },
  cardHeader: {
    marginBottom: 24,
  },
  cardTitle: {
    color: COLORS.primaryColor,
    fontSize: 28,
    fontFamily: "Poppins_800ExtraBold",
    marginBottom: 12,
  },
  cardDescription: {
    color: COLORS.secondaryColor,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
  },
  cardIllustration: {
    borderRadius: 24,
    backgroundColor: "transparent",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  cardIllustrationImage: {
    width: "100%",
    height: "100%",
  },
  cardIllustrationImageDesktop: {
    width: "82%",
    alignSelf: "center",
  },
});

export { OnboardingCard };
