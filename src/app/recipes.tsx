import { RecipeCard } from "@/components/RecipeCard";
import { COLORS, RECIPE_FILTERS, RECIPES } from "@/constants/Constants";

import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function RecipesPage() {
  const [activeFilter, setActiveFilter] = useState(RECIPE_FILTERS[0]);

  const filteredRecipes =
    activeFilter === "Todos"
      ? RECIPES
      : RECIPES.filter((recipe) => recipe.category === activeFilter);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContent}
        style={styles.filtersContainer}
      >
        {RECIPE_FILTERS.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterButton,
                isActive && styles.filterButtonActive,
              ]}
            >
              <Text
                style={[styles.filterText, isActive && styles.filterTextActive]}
              >
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.recipesContent}
        columnWrapperStyle={styles.recipesRow}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surfaceColor,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  filtersContainer: {
    maxHeight: 56,
    backgroundColor: COLORS.defaultBackground,
    borderRadius: 999,
    borderColor: COLORS.surfaceColor,
    borderWidth: 1,
    shadowColor: COLORS.primaryColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  filtersContent: {
    alignItems: "center",
    gap: 10,
    padding: 12,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: COLORS.surfaceColor,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceColor,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filterButtonActive: {
    borderColor: COLORS.brandColor,
    backgroundColor: COLORS.brandColor,
  },
  filterText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "700",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  recipesContent: {
    paddingVertical: 20,
    gap: 16,
  },
  recipesRow: {
    gap: 16,
  },
});
