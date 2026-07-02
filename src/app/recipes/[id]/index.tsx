import { CookingSteps } from "@/components/CookingSteps";
import { Header } from "@/components/Header";
import { COLORS } from "@/constants/Constants";
import { RECIPES } from "@/constants/Mock";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/Product";
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
  const { addRecipeProducts } = useCart();
  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([]);
  const isSmallPhone = width < 390;
  const isMobileLayout = width < 768;

  const recipe = useMemo(() => RECIPES.find((item) => item.id === id), [id]);

  const selectedProducts = useMemo(() => {
    if (!recipe) {
      return [];
    }

    return recipe.products.filter((product) =>
      selectedProductsIds.includes(product.id),
    );
  }, [recipe, selectedProductsIds]);

  const toggleProduct = (product: Product) => {
    setSelectedProductsIds((currentIds) => {
      if (currentIds.includes(product.id)) {
        return currentIds.filter((idItem) => idItem !== product.id);
      }

      return [...currentIds, product.id];
    });
  };

  const handleAddSelectedProducts = () => {
    if (!selectedProducts.length) {
      return;
    }

    addRecipeProducts(selectedProducts);
    setSelectedProductsIds([]);
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

            <View style={styles.productsGrid}>
              {recipe.products.map((product) => {
                const isSelected = selectedProductsIds.includes(product.id);

                return (
                  <Pressable
                    key={product.id}
                    onPress={() => toggleProduct(product)}
                    style={styles.productItem}
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
                        styles.productText,
                        isSmallPhone && styles.productTextSmall,
                      ]}
                    >
                      {product.quantity} {product.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={handleAddSelectedProducts}
              disabled={!selectedProducts.length}
              style={[
                styles.addToCartButton,
                isSmallPhone && styles.addToCartButtonSmall,
                !selectedProducts.length && styles.addToCartButtonDisabled,
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
          <CookingSteps isMobileLayout={isMobileLayout} />
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
  productItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    width: "48%",
  },
  productText: {
    color: COLORS.primaryColor,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  productTextSmall: {
    fontSize: 15,
  },
  productsGrid: {
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
    height: 300,
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
  sectionTitle: {
    color: COLORS.primaryColor,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 14,
  },
});
