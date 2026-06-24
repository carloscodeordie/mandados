import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(1000)}>
        <Image
          source={require("../../assets/images/splash-icon.png")}
          style={styles.logo}
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
});
