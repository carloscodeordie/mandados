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
  card: {
    backgroundColor: COLORS.surfaceColor,
    borderRadius: 32,
    elevation: 4,
    flex: 1,
    justifyContent: "space-between",
    maxWidth: 880,
    minHeight: 470,
    padding: 28,
    shadowColor: COLORS.secondaryColor,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    width: "100%",
  },
  cardContainer: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  cardDescription: {
    color: COLORS.secondaryColor,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
  },
  cardHeader: {
    marginBottom: 24,
  },
  cardIllustration: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 24,
    justifyContent: "center",
    overflow: "hidden",
  },
  cardIllustrationImage: {
    height: "100%",
    width: "100%",
  },
  cardIllustrationImageDesktop: {
    alignSelf: "center",
    width: "82%",
  },
  cardTitle: {
    color: COLORS.primaryColor,
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 28,
    marginBottom: 12,
  },
});

export { OnboardingCard };
