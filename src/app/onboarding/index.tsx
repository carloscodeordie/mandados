import { useOnboarding } from "@/app/hook/useOnboarding";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { OnboardingActions } from "@/components/OnboardingActions";
import { OnboardingCard } from "@/components/OnboardingCard";
import { PaginationDot } from "@/components/PaginationDot";
import { Retry } from "@/components/Retry";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { APPLICATION_NAME, COLORS } from "../../constants/Constants";

export default function OnboardingPage() {
  const { width: screenWidth } = useWindowDimensions();
  const {
    data: onboardingSlides = [],
    error,
    isError,
    isLoading,
    refetch,
  } = useOnboarding();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const isProgrammaticScroll = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = onboardingSlides.length;
  const isFirstSlide = activeIndex === 0;
  const isLastSlide = totalSlides > 0 && activeIndex === totalSlides - 1;
  const isDesktop = screenWidth >= 768;
  const illustrationHeight = isDesktop
    ? Math.min(Math.max(screenWidth * 0.32, 280), 420)
    : 220;

  useEffect(() => {
    if (totalSlides === 0) {
      if (activeIndex !== 0) {
        setActiveIndex(0);
      }
      return;
    }

    const clampedIndex = Math.max(0, Math.min(activeIndex, totalSlides - 1));
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  }, [activeIndex, totalSlides]);

  const updateActiveIndexFromScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (
        totalSlides === 0 ||
        !Number.isFinite(screenWidth) ||
        screenWidth <= 0
      ) {
        return;
      }

      const nextIndex = Math.round(
        event.nativeEvent.contentOffset.x / screenWidth,
      );

      if (!Number.isFinite(nextIndex)) {
        return;
      }

      const clampedIndex = Math.max(0, Math.min(nextIndex, totalSlides - 1));

      setActiveIndex((currentIndex) =>
        currentIndex === clampedIndex ? currentIndex : clampedIndex,
      );
    },
    [screenWidth, totalSlides],
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
      if (totalSlides === 0) {
        return;
      }

      const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));

      isProgrammaticScroll.current = true;
      setActiveIndex(clampedIndex);
      scrollViewRef.current?.scrollTo({
        x: clampedIndex * screenWidth,
        animated: true,
      });
    },
    [screenWidth, totalSlides],
  );

  const handlePreviousSlidePress = useCallback(() => {
    if (isFirstSlide) {
      return;
    }

    handlePaginationPress(activeIndex - 1);
  }, [activeIndex, handlePaginationPress, isFirstSlide]);

  const handleNextSlidePress = useCallback(() => {
    if (isLastSlide) {
      return;
    }

    handlePaginationPress(activeIndex + 1);
  }, [activeIndex, handlePaginationPress, isLastSlide]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header isTitleDisplayed title={APPLICATION_NAME} />
        </View>

        <View style={styles.paginationContainer}>
          <View style={styles.pagination}>
            {onboardingSlides.map((slide, index) => (
              <PaginationDot
                activeIndex={activeIndex}
                key={`${slide.title}-${index}`}
                index={index}
                onPress={handlePaginationPress}
                totalIndexes={totalSlides}
              />
            ))}
          </View>
        </View>

        <View style={styles.sliderWrapper}>
          {isLoading ? <Loading /> : null}
          {isError ? (
            <Retry
              handleRetry={refetch}
              title="Error al cargar el onboarding."
            />
          ) : null}

          {!isLoading && !isError && totalSlides > 0 ? (
            <ScrollView
              ref={scrollViewRef}
              style={[
                styles.slider,
                isLastSlide ? styles.sliderWithActions : null,
              ]}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              onMomentumScrollEnd={handleScrollEnd}
              scrollEventThrottle={16}
              contentContainerStyle={styles.sliderContainer}
            >
              {onboardingSlides.map((slide, index) => (
                <OnboardingCard
                  key={`${slide.title}-${index}`}
                  description={slide.description}
                  isDesktop={isDesktop}
                  illustrationHeight={illustrationHeight}
                  imageSource={slide.imageUrl}
                  index={index}
                  screenWidth={screenWidth}
                  title={slide.title}
                />
              ))}
            </ScrollView>
          ) : null}

          {!isLoading && !isError && totalSlides > 0 && !isFirstSlide ? (
            <Pressable
              onPress={handlePreviousSlidePress}
              style={[styles.carouselButton, styles.carouselButtonLeft]}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={COLORS.primaryColor}
              />
            </Pressable>
          ) : null}

          {!isLoading && !isError && totalSlides > 0 && !isLastSlide ? (
            <Pressable
              onPress={handleNextSlidePress}
              style={[styles.carouselButton, styles.carouselButtonRight]}
            >
              <Ionicons
                name="chevron-forward"
                size={24}
                color={COLORS.primaryColor}
              />
            </Pressable>
          ) : null}
        </View>

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
  actionsContainer: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
  container: {
    backgroundColor: COLORS.defaultBackground,
    flex: 1,
  },
  headerContainer: {
    marginBottom: 16,
    padding: 24,
  },
  pagination: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  paginationContainer: {
    marginBottom: 36,
    paddingHorizontal: 24,
  },
  carouselButton: {
    alignItems: "center",
    backgroundColor: "rgba(241, 245, 249, 0.95)",
    borderColor: "rgba(100, 116, 139, 0.25)",
    borderRadius: 22,
    borderWidth: 1,
    elevation: 2,
    height: 44,
    justifyContent: "center",
    position: "absolute",
    shadowColor: "#0F172A",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    top: "45%",
    transform: [{ translateY: -22 }],
    width: 44,
    zIndex: 2,
  },
  carouselButtonLeft: {
    left: 16,
  },
  carouselButtonRight: {
    right: 16,
  },
  safeArea: {
    backgroundColor: COLORS.defaultBackground,
    flex: 1,
  },
  slider: {
    flex: 1,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderWrapper: {
    flex: 1,
    position: "relative",
  },
  sliderWithActions: {
    marginBottom: 110,
  },
});
