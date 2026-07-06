import { Header } from "@/components/Header";
import {
  COLORS,
  NOT_FOUND_BUTTON,
  NOT_FOUND_ERROR,
  NOT_FOUND_TITLE,
} from "@/constants/Constants";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles.notFoundContainer}>
      <Header isLogoDisplayed isTitleDisplayed title={NOT_FOUND_ERROR} />

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
  );
}

const styles = StyleSheet.create({
  notFoundContainer: {
    backgroundColor: COLORS.surfaceColor,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
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
    marginTop: 18,
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  notFoundImage: {
    height: 140,
    marginBottom: 8,
    width: "75%",
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
