import { COLORS, SPLASH_SCREEN_DURATION } from "@/constants/Constants";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function SplashScreenPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("./onboarding");
    }, SPLASH_SCREEN_DURATION);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(1000)}>
        <Image
          source={require("../../assets/images/splash-icon.png")}
          style={styles.splashLogo}
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.splashBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  splashLogo: {
    width: 120,
    height: 120,
  },
});
