import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import {
  COLORS,
  PRODUCTS_TEXT,
  RECIPES_DESKTOP_COLUMN_COUNT,
  RECIPES_MOBILE_COLUMN_COUNT,
} from "@/constants/Constants";
import { PRODUCTS } from "@/constants/Mock";
import { ProductCategory } from "@/types/ProductCategory";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const PRODUCT_FILTERS: Array<"Todos" | ProductCategory> = [
  "Todos",
  "Frutas",
  "Verduras",
  "Carnes",
  "Pescados",
  "Lácteos",
  "Cereales",
  "Legumbres",
  "Bebidas",
  "Otros",
];

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof PRODUCT_FILTERS)[number]>("Todos");

  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const numColumns = isDesktop
    ? RECIPES_DESKTOP_COLUMN_COUNT
    : RECIPES_MOBILE_COLUMN_COUNT;

  const filteredProducts = useMemo(
    () =>
      activeFilter === "Todos"
        ? PRODUCTS
        : PRODUCTS.filter((product) => product.category === activeFilter),
    [activeFilter],
  );

  return (
    <View style={styles.container}>
      <Header
        isLogoDisplayed
        isCartDisplayed
        isTitleDisplayed
        title={PRODUCTS_TEXT}
      />

      {isDesktop ? (
        <View style={styles.filtersDesktopContainer}>
          {PRODUCT_FILTERS.map((filter) => {
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
            {PRODUCT_FILTERS.map((filter) => {
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
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsContent}
        columnWrapperStyle={styles.productsRow}
        renderItem={({ item }) => <ProductCard product={item} />}
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
    backgroundColor: COLORS.defaultBackground,
    borderRadius: 999,
    borderColor: COLORS.surfaceColor,
    borderWidth: 1,
    maxHeight: 64,
    shadowColor: COLORS.primaryColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  filtersDesktopContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    padding: 12,
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
    minHeight: 36,
    justifyContent: "center",
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
    lineHeight: 18,
    fontWeight: "700",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  productsContent: {
    paddingVertical: 20,
    gap: 16,
  },
  productsRow: {
    gap: 16,
  },
});
