import { COLORS } from "@/constants/Constants";
import { HeaderProps } from "@/types/HeaderProps";
import { StyleSheet, Text, View } from "react-native";

function Header({ title }: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  headerTitle: {
    color: COLORS.secondaryColor,
    fontSize: 24,
    fontFamily: "Poppins_800ExtraBold",
    lineHeight: 40,
  },
});

export { Header };
