import { Header } from "@/components/Header";
import { COLORS, PREPARATION_STEPS } from "@/constants/Constants";
import { RECIPES } from "@/constants/Mock";
import { useCart } from "@/contexts/CartContext";
import { Ingredient } from "@/types/Ingredient";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function RecipeDetailsPage() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { width } = useWindowDimensions();
  const { addRecipeIngredients } = useCart();
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>(
    [],
  );
  const isSmallPhone = width < 390;
  const isMobileLayout = width < 768;

  const recipe = useMemo(() => RECIPES.find((item) => item.id === id), [id]);

  const selectedIngredients = useMemo(() => {
    if (!recipe) {
      return [];
    }

    return recipe.ingredients.filter((ingredient) =>
      selectedIngredientIds.includes(ingredient.id),
    );
  }, [recipe, selectedIngredientIds]);

  const toggleIngredient = (ingredient: Ingredient) => {
    setSelectedIngredientIds((currentIds) => {
      if (currentIds.includes(ingredient.id)) {
        return currentIds.filter((idItem) => idItem !== ingredient.id);
      }

      return [...currentIds, ingredient.id];
    });
  };

  const handleAddSelectedIngredients = () => {
    if (!selectedIngredients.length) {
      return;
    }

    addRecipeIngredients(selectedIngredients);
    setSelectedIngredientIds([]);
  };

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Header isBackDisplayed isCartDisplayed isLogoDisplayed />
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No encontramos la receta</Text>
          <Text style={styles.emptyStateDescription}>
            Regresa al listado e intenta de nuevo.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header isBackDisplayed isCartDisplayed isLogoDisplayed />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />

        <View
          style={[styles.mainCard, isMobileLayout && styles.mainCardMobile]}
        >
          <View style={styles.section}>
            <Text
              style={[
                styles.recipeTitle,
                isSmallPhone && styles.recipeTitleSmall,
              ]}
            >
              {recipe.name}
            </Text>
            <Text
              style={[
                styles.prepTimeText,
                isSmallPhone && styles.prepTimeTextSmall,
              ]}
            >
              Tiempo: {recipe.cookTime} min
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>

            <View style={styles.ingredientsGrid}>
              {recipe.ingredients.map((ingredient) => {
                const isSelected = selectedIngredientIds.includes(
                  ingredient.id,
                );

                return (
                  <Pressable
                    key={ingredient.id}
                    onPress={() => toggleIngredient(ingredient)}
                    style={styles.ingredientItem}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        isSmallPhone && styles.checkboxSmall,
                        isSelected && styles.checkboxSelected,
                      ]}
                    >
                      {isSelected ? (
                        <Ionicons
                          name="checkmark"
                          size={isSmallPhone ? 14 : 16}
                          color="#FFFFFF"
                        />
                      ) : null}
                    </View>

                    <Text
                      style={[
                        styles.ingredientText,
                        isSmallPhone && styles.ingredientTextSmall,
                      ]}
                    >
                      {ingredient.quantity} {ingredient.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={handleAddSelectedIngredients}
              disabled={!selectedIngredients.length}
              style={[
                styles.addToCartButton,
                isSmallPhone && styles.addToCartButtonSmall,
                !selectedIngredients.length && styles.addToCartButtonDisabled,
              ]}
            >
              <Text
                style={[
                  styles.addToCartButtonText,
                  isSmallPhone && styles.addToCartButtonTextSmall,
                ]}
              >
                AGREGAR INGREDIENTES AL CARRITO
              </Text>
            </Pressable>
          </View>

          <View style={styles.stepsSection}>
            <Text style={styles.sectionTitle}>Pasos</Text>

            {isMobileLayout ? (
              <View style={styles.stepsListMobile}>
                {PREPARATION_STEPS.map((step, index) => (
                  <View key={step} style={[styles.stepItemMobile]}>
                    <Text style={styles.stepNumberSmall}>{index + 1}</Text>
                    <Text style={styles.stepTextSmall}>{step}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.stepsRow}>
                {PREPARATION_STEPS.map((step, index) => (
                  <View key={step} style={styles.stepItem}>
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addToCartButton: {
    alignItems: "center",
    backgroundColor: COLORS.brandColor,
    borderRadius: 999,
    justifyContent: "center",
    marginTop: 14,
    minHeight: 52,
    paddingHorizontal: 20,
  },
  addToCartButtonDisabled: {
    opacity: 0.5,
  },
  addToCartButtonSmall: {
    minHeight: 48,
    marginTop: 12,
    paddingHorizontal: 16,
  },
  addToCartButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
  },
  addToCartButtonTextSmall: {
    fontSize: 12,
    lineHeight: 16,
  },
  checkbox: {
    alignItems: "center",
    borderColor: "#CBD5E1",
    borderRadius: 8,
    borderWidth: 2,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  checkboxSmall: {
    borderRadius: 7,
    height: 24,
    width: 24,
  },
  checkboxSelected: {
    backgroundColor: COLORS.brandColor,
    borderColor: COLORS.brandColor,
  },
  container: {
    backgroundColor: COLORS.surfaceColor,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  content: {
    paddingBottom: 30,
  },
  emptyState: {
    alignItems: "center",
    backgroundColor: COLORS.defaultBackground,
    borderRadius: 20,
    marginTop: 24,
    padding: 24,
  },
  emptyStateDescription: {
    color: COLORS.secondaryColor,
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
  emptyStateTitle: {
    color: COLORS.primaryColor,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  ingredientItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    width: "48%",
  },
  ingredientText: {
    color: COLORS.primaryColor,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  ingredientTextSmall: {
    fontSize: 15,
  },
  ingredientsGrid: {
    columnGap: "4%",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 14,
  },
  mainCard: {
    backgroundColor: COLORS.defaultBackground,
    borderRadius: 30,
    marginTop: -32,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 14,
    shadowColor: COLORS.primaryColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 3,
  },
  mainCardMobile: {
    paddingBottom: 4,
  },
  prepTimeText: {
    color: COLORS.secondaryColor,
    fontSize: 18,
    fontWeight: "500",
    marginTop: 2,
  },
  prepTimeTextSmall: {
    fontSize: 16,
  },
  recipeImage: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 250,
    width: "100%",
  },
  recipeTitle: {
    color: COLORS.primaryColor,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 36,
  },
  recipeTitleSmall: {
    fontSize: 24,
    lineHeight: 32,
  },
  section: {
    marginBottom: 24,
  },
  stepsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.primaryColor,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 14,
  },
  stepItem: {
    flex: 1,
  },
  stepItemMobile: {
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
  },
  stepNumber: {
    color: COLORS.brandColor,
    fontSize: 54,
    fontWeight: "800",
    lineHeight: 56,
    marginBottom: 8,
  },
  stepNumberSmall: {
    color: COLORS.brandColor,
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 32,
    marginBottom: 0,
    marginRight: 12,
    textAlign: "center",
    width: 28,
  },
  stepsRow: {
    gap: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  stepsListMobile: {
    width: "100%",
  },
  stepText: {
    color: COLORS.secondaryColor,
    fontSize: 13,
    lineHeight: 18,
  },
  stepTextSmall: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 4,
  },
});
