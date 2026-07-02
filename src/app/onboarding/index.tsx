import { Header } from "@/components/Header";
import { OnboardingActions } from "@/components/OnboardingActions";
import { OnboardingCard } from "@/components/OnboardingCard";
import { PaginationDot } from "@/components/PaginationDot";
import { ONBOARDING_SLIDES } from "@/constants/Mock";
import { useCallback, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { APPLICATION_NAME, COLORS } from "../../constants/Constants";

export default function OnboardingPage() {
  const { width: screenWidth } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const isProgrammaticScroll = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;
  const isDesktop = screenWidth >= 768;
  const illustrationHeight = isDesktop
    ? Math.min(Math.max(screenWidth * 0.32, 280), 420)
    : 220;

  const updateActiveIndexFromScroll = useCallback(
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

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isProgrammaticScroll.current) {
        return;
      }

      updateActiveIndexFromScroll(event);
    },
    [updateActiveIndexFromScroll],
  );

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      updateActiveIndexFromScroll(event);
      isProgrammaticScroll.current = false;
    },
    [updateActiveIndexFromScroll],
  );

  const handlePaginationPress = useCallback(
    (index: number) => {
      isProgrammaticScroll.current = true;
      setActiveIndex(index);
      scrollViewRef.current?.scrollTo({
        x: index * screenWidth,
        animated: true,
      });
    },
    [screenWidth],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header isTitleDisplayed title={APPLICATION_NAME} />
        </View>

        <View style={styles.paginationContainer}>
          <View style={styles.pagination}>
            {ONBOARDING_SLIDES.map((slide, index) => (
              <PaginationDot
                activeIndex={activeIndex}
                key={`${slide.title}-${index}`}
                index={index}
                onPress={handlePaginationPress}
                totalIndexes={ONBOARDING_SLIDES.length}
              />
            ))}
          </View>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={[styles.slider, isLastSlide ? styles.sliderWithActions : null]}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
          contentContainerStyle={styles.sliderContainer}
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

        {isLastSlide ? (
          <View style={styles.actionsContainer}>
            <OnboardingActions isDesktop={isDesktop} />
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
  },
  headerContainer: {
    padding: 24,
    marginBottom: 16,
  },
  paginationContainer: {
    paddingHorizontal: 24,
    marginBottom: 36,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  slider: {
    flex: 1,
  },
  sliderWithActions: {
    marginBottom: 110,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  actionsContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});
