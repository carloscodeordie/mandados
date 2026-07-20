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
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 999,
    height: 10,
    justifyContent: "center",
    width: 40,
  },
  dotActive: {
    backgroundColor: COLORS.brandColor,
  },
  dotInner: {
    height: "100%",
    width: "100%",
  },
});

export { PaginationDot };
