import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  APPLICATION_NAME,
  COLORS,
  ONBOARDING_SLIDES,
  PRODUCTS_ROUTE,
  PRODUCTS_TEXT,
  RECIPES_ROUTE,
  RECIPES_TEXT,
} from "../constants/Constants";

export default function OnboardingPage() {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;
  const isDesktop = screenWidth >= 768;
  const illustrationHeight = isDesktop
    ? Math.min(Math.max(screenWidth * 0.32, 280), 420)
    : 220;

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.round(
        event.nativeEvent.contentOffset.x / screenWidth,
      );

      const clampedIndex = Math.max(
        0,
        Math.min(nextIndex, ONBOARDING_SLIDES.length - 1),
      );

      setActiveIndex((currentIndex) =>
        currentIndex === clampedIndex ? currentIndex : clampedIndex,
      );
    },
    [screenWidth],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{APPLICATION_NAME}</Text>
        </View>

        <View style={styles.paginationContainer}>
          <View style={styles.pagination}>
            {ONBOARDING_SLIDES.map((slide, index) => (
              <View
                key={`${slide.title}-${index}`}
                style={[
                  styles.dot,
                  index === activeIndex ? styles.dotActive : null,
                ]}
                accessibilityRole="image"
                accessibilityLabel={`Paso ${index + 1} de ${ONBOARDING_SLIDES.length}`}
              />
            ))}
          </View>
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScrollEnd}
          onMomentumScrollEnd={handleScrollEnd}
          onScrollEndDrag={handleScrollEnd}
          scrollEventThrottle={16}
          contentContainerStyle={styles.sliderContainer}
        >
          {ONBOARDING_SLIDES.map((slide, index) => (
            <View
              key={`${slide.title}-${index}`}
              style={[styles.slide, { width: screenWidth }]}
            >
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.slideTitle}>
                    {slide.title.toUpperCase()}
                  </Text>
                  <Text style={styles.slideDescription}>
                    {slide.description}
                  </Text>
                </View>
                <View
                  style={[styles.illustration, { height: illustrationHeight }]}
                >
                  <Image
                    source={slide.imageSource}
                    style={[
                      styles.illustrationImage,
                      isDesktop ? styles.illustrationImageDesktop : null,
                    ]}
                    resizeMode="contain"
                    accessibilityLabel={slide.title}
                  />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {isLastSlide ? (
          <View
            style={[styles.actions, isDesktop ? styles.actionsDesktop : null]}
          >
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
              <Text style={styles.buttonText}>
                {PRODUCTS_TEXT.toUpperCase()}
              </Text>
            </Pressable>
          </View>
        ) : null}
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
    marginBottom: 16,
  },
  headerTitle: {
    color: COLORS.secondaryColor,
    fontSize: 24,
    fontFamily: "Poppins_800ExtraBold",
    lineHeight: 40,
  },
  paginationContainer: {
    paddingHorizontal: 24,
    marginBottom: 36,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  slide: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  slideTitle: {
    color: COLORS.primaryColor,
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
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  dot: {
    width: 40,
    height: 10,
    borderRadius: 999,
    backgroundColor: COLORS.secondaryColor,
  },
  dotActive: {
    backgroundColor: COLORS.brandColor,
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
  illustration: {
    borderRadius: 24,
    backgroundColor: "transparent",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  illustrationImage: {
    width: "100%",
    height: "100%",
  },
  illustrationImageDesktop: {
    width: "82%",
    alignSelf: "center",
  },
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
