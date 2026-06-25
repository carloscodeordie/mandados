import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get("window");

const slides = [
  {
    title: "Track every request",
    description:
      "Keep every mandado organized with clear status updates and one place to review what is pending.",
  },
  {
    title: "Coordinate in seconds",
    description:
      "Share the important details fast so the right person can pick up the task without back and forth.",
  },
  {
    title: "Stay in control",
    description:
      "Review progress, confirm details, and move to the next step when you are ready.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === slides.length - 1;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(
      event.nativeEvent.contentOffset.x / screenWidth,
    );

    setActiveIndex(nextIndex);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Mandados</Text>
          <Text style={styles.title}>
            A quick look at what the app helps you do
          </Text>
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
          {slides.map((slide) => (
            <View key={slide.title} style={styles.slide}>
              <View style={styles.card}>
                <View style={styles.illustration}>
                  <View style={styles.illustrationAccent} />
                  <View style={styles.illustrationAccentSmall} />
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
              onPress={() => router.push("/sign-in")}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                Sign in
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.primaryButton]}
              onPress={() => router.push("/sign-up")}
            >
              <Text style={styles.buttonText}>Create account</Text>
            </Pressable>
          </View>
        ) : (
          <></>
        )}

        <View style={styles.footer}>
          <View style={styles.pagination}>
            {slides.map((slide, index) => (
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
    backgroundColor: "#F5EFE6",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5EFE6",
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 24,
    gap: 12,
  },
  eyebrow: {
    color: "#A85C36",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2,
  },
  title: {
    color: "#1F2937",
    fontSize: 34,
    fontWeight: "800",
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
    backgroundColor: "#FFFDF8",
    padding: 28,
    justifyContent: "space-between",
    shadowColor: "#6B4F3B",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  illustration: {
    height: 220,
    borderRadius: 24,
    backgroundColor: "#D9F4E6",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },
  illustrationAccent: {
    width: 148,
    height: 148,
    borderRadius: 999,
    backgroundColor: "#22C55E",
    opacity: 0.18,
  },
  illustrationAccentSmall: {
    position: "absolute",
    width: 84,
    height: 84,
    borderRadius: 999,
    backgroundColor: "#F97316",
    right: 32,
    bottom: 28,
    opacity: 0.26,
  },
  slideTitle: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 12,
  },
  slideDescription: {
    color: "#4B5563",
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
    backgroundColor: "#D6CFC5",
  },
  dotActive: {
    backgroundColor: "#1F7A4C",
  },
  helperText: {
    color: "#6B7280",
    fontSize: 15,
    textAlign: "center",
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
    backgroundColor: "#1F7A4C",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D6CFC5",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButtonText: {
    color: "#1F2937",
  },
});
