import { COLORS } from "@/constants/Constants";
import { useCart } from "@/contexts/CartContext";
import { RecipeCardProps } from "@/types/RecipeCardProps";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter();
  const { addRecipeProducts } = useCart();

  const handleAddProducts = () => {
    addRecipeProducts(recipe.products);
  };

  const handleRecipePress = () => {
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <Pressable style={styles.recipeCard} onPress={handleRecipePress}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />

        <View style={styles.cookTimeBadge}>
          <Text style={styles.cookTimeText}>{recipe.cookTime} min</Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={(event) => {
            event.stopPropagation();
            handleAddProducts();
          }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <View style={styles.recipeContent}>
        <Text numberOfLines={2} style={styles.recipeTitle}>
          {recipe.name}
        </Text>
        <Text numberOfLines={1} style={styles.recipeProducts}>
          {recipe.products.map((product) => product.name).join(", ")}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: "center",
    backgroundColor: COLORS.brandColor,
    borderRadius: 18,
    bottom: 10,
    elevation: 3,
    height: 36,
    justifyContent: "center",
    position: "absolute",
    right: 10,
    shadowColor: COLORS.primaryColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 36,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "500",
    includeFontPadding: false,
    lineHeight: 24,
    textAlign: "center",
    textAlignVertical: "center",
  },
  cookTimeBadge: {
    alignItems: "center",
    backgroundColor: "rgba(30, 41, 59, 0.82)",
    borderRadius: 999,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: "absolute",
    right: 10,
    top: 10,
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
    backgroundColor: COLORS.defaultBackground,
    borderColor: "#E5E7EB",
    borderRadius: 22,
    borderWidth: 1,
    elevation: 2,
    flex: 1,
    overflow: "hidden",
    shadowColor: COLORS.primaryColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  recipeContent: {
    gap: 5,
    paddingBottom: 14,
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  recipeImage: {
    height: 150,
    width: "100%",
  },
  recipeProducts: {
    color: COLORS.secondaryColor,
    fontSize: 15,
    fontWeight: "500",
  },
  recipeTitle: {
    color: COLORS.primaryColor,
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 22,
  },
});

export { RecipeCard };
