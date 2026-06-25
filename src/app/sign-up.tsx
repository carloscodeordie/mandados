import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function SignUpPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.description}>
        Placeholder destination for the onboarding button.
      </Text>
      <Link href="/onboarding" style={styles.link}>
        Back to onboarding
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EFE6",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#111827",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 12,
  },
  description: {
    color: "#4B5563",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    color: "#1F7A4C",
    fontSize: 16,
    fontWeight: "700",
  },
});
