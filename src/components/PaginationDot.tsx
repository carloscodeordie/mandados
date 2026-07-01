import { COLORS } from "@/constants/Constants";
import { PaginationDotProps } from "@/types/PaginationDotProps";
import { Pressable, StyleSheet, View } from "react-native";

function PaginationDot({
  activeIndex,
  index,
  onPress,
  totalIndexes,
}: PaginationDotProps) {
  return (
    <Pressable
      onPress={() => onPress(index)}
      style={[styles.dot, index === activeIndex ? styles.dotActive : null]}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityState={{ selected: index === activeIndex }}
      accessibilityLabel={`Ir al paso ${index + 1} de ${totalIndexes}`}
    >
      <View style={styles.dotInner} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 40,
    height: 10,
    borderRadius: 999,
    backgroundColor: COLORS.secondaryColor,
    justifyContent: "center",
  },
  dotInner: {
    width: "100%",
    height: "100%",
  },
  dotActive: {
    backgroundColor: COLORS.brandColor,
  },
});

export { PaginationDot };
