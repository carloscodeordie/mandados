import { COLORS, RETRY_BUTTON_TEXT } from "@/constants/Constants";
import type { RetryProps } from "@/types/RetryProps";
import { Pressable, StyleSheet, Text, View } from "react-native";

function Retry({ handleRetry, title }: RetryProps) {
  return (
    <View style={styles.retryContainer}>
      <Text style={styles.retryText}>{title}</Text>
      <Pressable onPress={handleRetry} style={styles.retryButton}>
        <Text style={styles.retryButtonText}>{RETRY_BUTTON_TEXT}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  retryButton: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 999,
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  retryButtonText: {
    color: COLORS.defaultBackground,
    fontFamily: "Poppins_700Bold",
    fontSize: 13,
  },
  retryContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  retryText: {
    color: COLORS.primaryColor,
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
});

export { Retry };
