import { COLORS } from "@/constants/Constants";
import { PaginationDotProps } from "@/types/PaginationDotProps";
import { StyleSheet, View } from "react-native";

function PaginationDot({
  activeIndex,
  index,
  title,
  totalIndexes,
}: PaginationDotProps) {
  return (
    <View
      key={`${title}-${index}`}
      style={[styles.dot, index === activeIndex ? styles.dotActive : null]}
      accessibilityRole="image"
      accessibilityLabel={`Paso ${index + 1} de ${totalIndexes}`}
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 40,
    height: 10,
    borderRadius: 999,
    backgroundColor: COLORS.secondaryColor,
  },
  dotActive: {
    backgroundColor: COLORS.brandColor,
  },
});

export { PaginationDot };
