import { COLORS } from "@/constants/Constants";
import { RecipeCardProps } from "@/types/RecipeCardProps";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <View style={styles.recipeCard}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />

        <View style={styles.cookTimeBadge}>
          <Text style={styles.cookTimeText}>{recipe.cookTime}</Text>
        </View>

        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <View style={styles.recipeContent}>
        <Text numberOfLines={2} style={styles.recipeTitle}>
          {recipe.name}
        </Text>
        <Text numberOfLines={1} style={styles.recipeIngredients}>
          {recipe.ingredients}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.brandColor,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primaryColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 24,
  },
  cookTimeBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 999,
    backgroundColor: "rgba(30, 41, 59, 0.82)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cookTimeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  imageWrapper: {
    position: "relative",
  },
  recipeCard: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: COLORS.defaultBackground,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    shadowColor: COLORS.primaryColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
    overflow: "hidden",
  },
  recipeContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
    gap: 5,
  },
  recipeImage: {
    width: "100%",
    height: 150,
  },
  recipeTitle: {
    color: COLORS.primaryColor,
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 22,
  },
  recipeIngredients: {
    color: COLORS.secondaryColor,
    fontSize: 15,
    fontWeight: "500",
  },
});

export { RecipeCard };
