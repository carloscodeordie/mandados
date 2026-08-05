import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { RecipeCard } from "@/components/RecipeCard";
import {
  APPLICATION_NAME,
  COLORS,
  PRODUCTS_ROUTE,
  RECIPES_ROUTE,
} from "@/constants/Constants";
import { FEATURED_SLIDES, PRODUCTS, RECIPES } from "@/constants/Mock";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const FEATURED_PRODUCTS = PRODUCTS.slice(0, 10);
const FEATURED_RECIPES = RECIPES.slice(0, 10);

export default function HomePage() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const featuredCardWidth = Math.max(300, Math.min(width - 40, 840));
  const productsScrollViewRef = useRef<ScrollView>(null);
  const [productsScrollOffset, setProductsScrollOffset] = useState(0);

  const handleProductsScroll = (direction: -1 | 1) => {
    const cardWidth = 250;
    const gap = 12;
    const step = cardWidth + gap;

    productsScrollViewRef.current?.scrollTo({
      animated: true,
      x: Math.max(0, productsScrollOffset + direction * step),
    });
  };

  return (
    <View style={styles.container}>
      <Header isCartDisplayed isTitleDisplayed title={APPLICATION_NAME} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destacados</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.heroCarouselContent}
            snapToInterval={featuredCardWidth + 12}
            decelerationRate="fast"
            pagingEnabled
          >
            {FEATURED_SLIDES.map((slide) => (
              <View
                key={slide.id}
                style={[
                  styles.heroSlide,
                  {
                    width: featuredCardWidth,
                    backgroundColor: slide.accentColor,
                  },
                ]}
              >
                <View style={styles.heroTextBlock}>
                  <Text style={styles.heroTitle}>{slide.title}</Text>
                  <Text style={styles.heroSubtitle}>{slide.subtitle}</Text>
                </View>

                <View style={styles.heroImageWrap}>
                  <View
                    style={[
                      styles.heroImage,
                      { backgroundColor: "rgba(255, 255, 255, 0.22)" },
                    ]}
                  >
                    <Text style={styles.heroImageLabel}>Ver mas</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Productos</Text>

          <View style={styles.carouselShell}>
            <Pressable
              accessibilityLabel="Ir al producto anterior"
              accessibilityRole="button"
              onPress={() => handleProductsScroll(-1)}
              style={[styles.carouselButton, styles.carouselButtonLeft]}
            >
              <Ionicons
                color={COLORS.brandColor}
                name="chevron-back"
                size={22}
              />
            </Pressable>

            <ScrollView
              ref={productsScrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.itemsCarouselContent}
              onScroll={(event) => {
                setProductsScrollOffset(event.nativeEvent.contentOffset.x);
              }}
              scrollEventThrottle={16}
            >
              {FEATURED_PRODUCTS.map((product) => (
                <View key={product.id} style={styles.productCardWrap}>
                  <ProductCard product={product} />
                </View>
              ))}

              <Pressable
                onPress={() => router.push(PRODUCTS_ROUTE)}
                style={[styles.seeAllCard, styles.productsSeeAllCard]}
                accessibilityRole="button"
                accessibilityLabel="Ir a todos los productos"
              >
                <Text style={styles.seeAllTitle}>Ver todos</Text>
                <Text style={styles.seeAllSubtitle}>Ir a productos</Text>
              </Pressable>
            </ScrollView>

            <Pressable
              accessibilityLabel="Ir al producto siguiente"
              accessibilityRole="button"
              onPress={() => handleProductsScroll(1)}
              style={[styles.carouselButton, styles.carouselButtonRight]}
            >
              <Ionicons
                color={COLORS.brandColor}
                name="chevron-forward"
                size={22}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recetas</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.itemsCarouselContent}
          >
            {FEATURED_RECIPES.map((recipe) => (
              <View key={recipe.id} style={styles.recipeCardWrap}>
                <RecipeCard recipe={recipe} />
              </View>
            ))}

            <Pressable
              onPress={() => router.push(RECIPES_ROUTE)}
              style={[styles.seeAllCard, styles.recipesSeeAllCard]}
              accessibilityRole="button"
              accessibilityLabel="Ir a todas las recetas"
            >
              <Text style={styles.seeAllTitle}>Ver todas</Text>
              <Text style={styles.seeAllSubtitle}>Ir a recetas</Text>
            </Pressable>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surfaceColor,
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  content: {
    gap: 24,
    paddingBottom: 36,
  },
  carouselButton: {
    alignItems: "center",
    backgroundColor: COLORS.defaultBackground,
    borderColor: COLORS.surfaceColor,
    borderWidth: 1,
    borderRadius: 999,
    elevation: 4,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -20 }],
    width: 40,
    zIndex: 1,
  },
  carouselButtonLeft: {
    left: 4,
  },
  carouselButtonRight: {
    right: 4,
  },
  carouselShell: {
    position: "relative",
  },
  heroCarouselContent: {
    gap: 12,
    paddingRight: 8,
  },
  heroImage: {
    alignItems: "center",
    borderRadius: 14,
    justifyContent: "center",
    minHeight: 90,
    minWidth: 120,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  heroImageLabel: {
    color: "#FFFFFF",
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
  },
  heroImageWrap: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "flex-end",
  },
  heroSlide: {
    borderRadius: 20,
    minHeight: 170,
    padding: 18,
  },
  heroSubtitle: {
    color: "#FFFFFF",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    opacity: 0.95,
  },
  heroTextBlock: {
    gap: 4,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 24,
  },
  itemsCarouselContent: {
    gap: 12,
    paddingRight: 8,
  },
  productCardWrap: {
    minWidth: 250,
    width: 250,
  },
  productsSeeAllCard: {
    backgroundColor: "#14532D",
  },
  recipeCardWrap: {
    minWidth: 260,
    width: 260,
  },
  recipesSeeAllCard: {
    backgroundColor: "#0F766E",
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: COLORS.primaryColor,
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 22,
  },
  seeAllCard: {
    alignItems: "center",
    borderRadius: 22,
    justifyContent: "center",
    minHeight: 210,
    minWidth: 200,
    paddingHorizontal: 18,
  },
  seeAllSubtitle: {
    color: "#FFFFFF",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginTop: 4,
  },
  seeAllTitle: {
    color: "#FFFFFF",
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
  },
});
