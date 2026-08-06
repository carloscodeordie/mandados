import { COLORS } from "@/constants/Constants";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        size={48}
        color={COLORS.primaryColor}
        style={styles.loadingSpinner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },
  loadingSpinner: {
    transform: [{ scale: 1.8 }],
  },
});

export { Loading };
