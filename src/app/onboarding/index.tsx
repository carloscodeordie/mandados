import { OnboardingActions } from "@/components/OnboardingActions";
import { OnboardingCard } from "@/components/OnboardingCard";
import { PaginationDot } from "@/components/PaginationDot";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
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
} from "../../constants/Constants";

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
              <PaginationDot
                activeIndex={activeIndex}
                key={`${slide.title}-${index}`}
                index={index}
                title={slide.title}
                totalIndexes={ONBOARDING_SLIDES.length}
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
          contentContainerStyle={styles.sliderSection}
        >
          {ONBOARDING_SLIDES.map((slide, index) => (
            <OnboardingCard
              key={`${slide.title}-${index}`}
              description={slide.description}
              isDesktop={isDesktop}
              illustrationHeight={illustrationHeight}
              imageSource={slide.imageSource}
              index={index}
              screenWidth={screenWidth}
              title={slide.title}
            />
          ))}
        </ScrollView>

        {isLastSlide ? <OnboardingActions isDesktop={isDesktop} /> : null}
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
  sliderSection: {
    marginBottom: 16,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});
