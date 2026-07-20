import { COLORS } from "@/constants/Constants";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

function Splash() {
  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(1000)}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.splashLogo}
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLORS.splashBackground,
    flex: 1,
    justifyContent: "center",
  },
  splashLogo: {
    height: 120,
    width: 120,
  },
});

export { Splash };
