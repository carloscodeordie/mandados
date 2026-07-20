import {
  COLORS,
  NOT_FOUND_BUTTON,
  NOT_FOUND_TITLE,
} from "@/constants/Constants";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "./Header";

export default function NotFoundScreen() {
  return (
    <View style={styles.screenContainer}>
      <Header isLogoDisplayed />
      <View style={styles.notFoundContainer}>
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/onboarding/delivery.png")}
            style={styles.notFoundImage}
            resizeMode="contain"
          />
          <Text style={styles.statusCode}>404</Text>
          <Text style={styles.title}>{NOT_FOUND_TITLE}</Text>

          <Link href="/products" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>{NOT_FOUND_BUTTON}</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: COLORS.brandColor,
    borderRadius: 999,
    justifyContent: "center",
    marginTop: 18,
    minHeight: 48,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  card: {
    alignItems: "center",
    backgroundColor: COLORS.defaultBackground,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  notFoundContainer: {
    backgroundColor: COLORS.surfaceColor,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  notFoundImage: {
    height: 140,
    marginBottom: 8,
    width: "75%",
  },
  screenContainer: {
    flex: 1,
  },
  statusCode: {
    color: COLORS.brandColor,
    fontSize: 40,
    fontWeight: "800",
    lineHeight: 46,
  },
  title: {
    color: COLORS.primaryColor,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 8,
    textAlign: "center",
  },
});
