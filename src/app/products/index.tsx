import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import {
  COLORS,
  PRODUCT_FILTERS,
  PRODUCTS_TEXT,
  RECIPES_DESKTOP_COLUMN_COUNT,
  RECIPES_MOBILE_COLUMN_COUNT,
} from "@/constants/Constants";
import { PRODUCTS } from "@/constants/Mock";
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
  productsContent: {
    gap: 16,
    paddingVertical: 20,
  },
  productsRow: {
    gap: 16,
  },
});
