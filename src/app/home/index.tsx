import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { RecipeCard } from "@/components/RecipeCard";
import { COLORS, PRODUCTS_ROUTE, RECIPES_ROUTE } from "@/constants/Constants";
import { PRODUCTS, RECIPES } from "@/constants/Mock";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  accentColor: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "new-products",
    title: "Nuevos productos",
    subtitle: "Descubre lo recien llegado para tu cocina",
    imageUrl: PRODUCTS[0]?.imageUrl ?? "",
    accentColor: "#22C55E",
  },
  {
    id: "discounts",
    title: "Descuentos",
    subtitle: "Aprovecha precios especiales por tiempo limitado",
    imageUrl: PRODUCTS[1]?.imageUrl ?? PRODUCTS[0]?.imageUrl ?? "",
    accentColor: "#F59E0B",
  },
];

const FEATURED_PRODUCTS = PRODUCTS.slice(0, 10);
const FEATURED_RECIPES = RECIPES.slice(0, 10);

export default function HomePage() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const heroCardWidth = Math.max(300, Math.min(width - 40, 840));

  return (
    <View style={styles.container}>
      <Header isCartDisplayed isTitleDisplayed title="Inicio" />

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
            snapToInterval={heroCardWidth + 12}
            decelerationRate="fast"
            pagingEnabled
          >
            {HERO_SLIDES.map((slide) => (
              <View
                key={slide.id}
                style={[
                  styles.heroSlide,
                  {
                    width: heroCardWidth,
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

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.itemsCarouselContent}
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
