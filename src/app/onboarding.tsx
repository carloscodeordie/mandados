import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  APPLICATION_NAME,
  APPLICATION_SLOGAN,
  COLORS,
  ONBOARDING_SLIDES,
  PRODUCTS_ROUTE,
  RECIPES_ROUTE,
} from "../constants/Constants";

const { width: screenWidth } = Dimensions.get("window");

export default function OnboardingPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(
      event.nativeEvent.contentOffset.x / screenWidth,
    );

    setActiveIndex(nextIndex);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.applicationTitle}>{APPLICATION_NAME}</Text>
          <Text style={styles.headerTitle}>{APPLICATION_SLOGAN}</Text>
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onScrollEndDrag={handleScroll}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.sliderContent}
        >
          {ONBOARDING_SLIDES.map((slide) => (
            <View key={slide.title} style={styles.slide}>
              <View style={styles.card}>
                <View style={styles.illustration}>
                  <Image
                    source={slide.imageSource}
                    style={styles.illustrationImage}
                    resizeMode="stretch"
                  />
                </View>
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideDescription}>{slide.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {isLastSlide ? (
          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.push(RECIPES_ROUTE)}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                Recetas
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.primaryButton]}
              onPress={() => router.push(PRODUCTS_ROUTE)}
            >
              <Text style={styles.buttonText}>Productos</Text>
            </Pressable>
          </View>
        ) : (
          <></>
        )}

        <View style={styles.footer}>
          <View style={styles.pagination}>
            {ONBOARDING_SLIDES.map((slide, index) => (
              <View
                key={slide.title}
                style={[
                  styles.dot,
                  index === activeIndex ? styles.dotActive : null,
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.defaultBackground,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.defaultBackground,
    paddingVertical: 24,
  },
  headerContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  applicationTitle: {
    color: COLORS.primaryColor,
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
    letterSpacing: 2,
  },
  headerTitle: {
    color: COLORS.secondaryColor,
    fontSize: 24,
    fontFamily: "Poppins_800ExtraBold",
    lineHeight: 40,
  },
  sliderContent: {
    paddingVertical: 28,
  },
  slide: {
    width: screenWidth,
    paddingHorizontal: 24,
  },
  card: {
    flex: 1,
    borderRadius: 32,
    backgroundColor: COLORS.surfaceColor,
    padding: 28,
    justifyContent: "space-between",
    shadowColor: COLORS.secondaryColor,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  illustration: {
    height: 220,
    borderRadius: 24,
    backgroundColor: "transparent",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },
  illustrationImage: {
    width: "100%",
    height: "100%",
  },
  slideTitle: {
    color: COLORS.brandColor,
    fontSize: 28,
    fontFamily: "Poppins_800ExtraBold",
    marginBottom: 12,
  },
  slideDescription: {
    color: COLORS.secondaryColor,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 24,
    gap: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: COLORS.secondaryColor,
  },
  dotActive: {
    backgroundColor: COLORS.brandColor,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 36,
  },
  button: {
    flex: 1,
    minHeight: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
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
