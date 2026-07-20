import { Header } from "@/components/Header";
import { RecipeCard } from "@/components/RecipeCard";
import {
  COLORS,
  RECIPE_FILTERS,
  RECIPES_DESKTOP_COLUMN_COUNT,
  RECIPES_MOBILE_COLUMN_COUNT,
  RECIPES_TEXT,
} from "@/constants/Constants";
import { RECIPES } from "@/constants/Mock";

import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function RecipesPage() {
  const [activeFilter, setActiveFilter] = useState(RECIPE_FILTERS[0]);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const numColumns = isDesktop
    ? RECIPES_DESKTOP_COLUMN_COUNT
    : RECIPES_MOBILE_COLUMN_COUNT;

  const filteredRecipes =
    activeFilter === "Todos"
      ? RECIPES
      : RECIPES.filter((recipe) => recipe.category === activeFilter);

  return (
    <View style={styles.container}>
      <Header
        isLogoDisplayed
        isCartDisplayed
        isTitleDisplayed
        title={RECIPES_TEXT}
      />

      {isDesktop ? (
        <View style={styles.filtersDesktopContainer}>
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
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : (
        <View style={styles.filtersContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContent}
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
                    style={[
                      styles.filterText,
                      isActive && styles.filterTextActive,
                    ]}
                  >
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}

      <FlatList
        key={numColumns}
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
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
    backgroundColor: COLORS.surfaceColor,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  filterButton: {
    backgroundColor: COLORS.surfaceColor,
    borderColor: COLORS.surfaceColor,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 36,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filterButtonActive: {
    backgroundColor: COLORS.brandColor,
    borderColor: COLORS.brandColor,
  },
  filtersContainer: {
    backgroundColor: COLORS.defaultBackground,
    borderColor: COLORS.surfaceColor,
    borderRadius: 999,
    borderWidth: 1,
    elevation: 2,
    maxHeight: 64,
    shadowColor: COLORS.primaryColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  filtersContent: {
    alignItems: "center",
    gap: 10,
    padding: 12,
  },
  filtersDesktopContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    padding: 12,
  },
  filterText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  recipesContent: {
    gap: 16,
    paddingVertical: 20,
  },
  recipesRow: {
    gap: 16,
  },
});
