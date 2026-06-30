import { COLORS } from "@/constants/Constants";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

function Splash() {
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

export { Splash };
