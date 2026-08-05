import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { RecipeCard } from "@/components/RecipeCard";
import {
  APPLICATION_NAME,
  COLORS,
  FEATURED_TEXT,
  GO_TO_PRODUCTS_TEXT,
  GO_TO_RECIPES_TEXT,
  PRODUCTS_ROUTE,
  PRODUCTS_TEXT,
  RECIPES_ROUTE,
  RECIPES_TEXT,
  SEE_ALL_TEXT,
  SEE_MORE_TEXT,
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
  const recipesScrollViewRef = useRef<ScrollView>(null);
  const [productsScrollOffset, setProductsScrollOffset] = useState(0);
  const [recipesScrollOffset, setRecipesScrollOffset] = useState(0);

  const handleProductsScroll = (direction: -1 | 1) => {
    const cardWidth = 250;
    const gap = 12;
    const step = cardWidth + gap;

    productsScrollViewRef.current?.scrollTo({
      animated: true,
      x: Math.max(0, productsScrollOffset + direction * step),
    });
  };

  const handleRecipesScroll = (direction: -1 | 1) => {
    const cardWidth = 260;
    const gap = 12;
    const step = cardWidth + gap;

    recipesScrollViewRef.current?.scrollTo({
      animated: true,
      x: Math.max(0, recipesScrollOffset + direction * step),
    });
  };

  return (
    <View style={styles.homeContainer}>
      <Header isCartDisplayed isTitleDisplayed title={APPLICATION_NAME} />

      <ScrollView
        contentContainerStyle={styles.homeContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderTitle}>{FEATURED_TEXT}</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContainer}
            snapToInterval={featuredCardWidth + 12}
            decelerationRate="fast"
            pagingEnabled
          >
            {FEATURED_SLIDES.map((slide) => (
              <View
                key={slide.id}
                style={[
                  styles.featuredSlide,
                  {
                    width: featuredCardWidth,
                    backgroundColor: slide.accentColor,
                  },
                ]}
              >
                <View style={styles.featuredHeader}>
                  <Text style={styles.featuredTitle}>{slide.title}</Text>
                  <Text style={styles.featuredSubtitle}>{slide.subtitle}</Text>
                </View>

                <View style={styles.featuredImageContainer}>
                  <View
                    style={[
                      styles.featuredImage,
                      { backgroundColor: "rgba(255, 255, 255, 0.22)" },
                    ]}
                  >
                    <Text style={styles.featuredImageLabel}>
                      {SEE_MORE_TEXT}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.sliderTitle}>{PRODUCTS_TEXT}</Text>

          <View style={styles.slider}>
            <Pressable
              accessibilityRole="button"
              onPress={() => handleProductsScroll(-1)}
              style={[styles.sliderButton, styles.sliderButtonLeft]}
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
              contentContainerStyle={styles.sliderContent}
              onScroll={(event) => {
                setProductsScrollOffset(event.nativeEvent.contentOffset.x);
              }}
              scrollEventThrottle={16}
            >
              {FEATURED_PRODUCTS.map((product) => (
                <View key={product.id} style={styles.productCardContainer}>
                  <ProductCard product={product} />
                </View>
              ))}

              <Pressable
                onPress={() => router.push(PRODUCTS_ROUTE)}
                style={styles.seeAllContainer}
                accessibilityRole="button"
              >
                <Text style={styles.seeAllTitle}>{SEE_ALL_TEXT}</Text>
                <Text style={styles.seeAllSubtitle}>{GO_TO_PRODUCTS_TEXT}</Text>
              </Pressable>
            </ScrollView>

            <Pressable
              accessibilityRole="button"
              onPress={() => handleProductsScroll(1)}
              style={[styles.sliderButton, styles.sliderButtonRight]}
            >
              <Ionicons
                color={COLORS.brandColor}
                name="chevron-forward"
                size={22}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.sliderTitle}>{RECIPES_TEXT}</Text>

          <View style={styles.slider}>
            <Pressable
              accessibilityRole="button"
              onPress={() => handleRecipesScroll(-1)}
              style={[styles.sliderButton, styles.sliderButtonLeft]}
            >
              <Ionicons
                color={COLORS.brandColor}
                name="chevron-back"
                size={22}
              />
            </Pressable>

            <ScrollView
              ref={recipesScrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sliderContent}
              onScroll={(event) => {
                setRecipesScrollOffset(event.nativeEvent.contentOffset.x);
              }}
              scrollEventThrottle={16}
            >
              {FEATURED_RECIPES.map((recipe) => (
                <View key={recipe.id} style={styles.recipeCardContainer}>
                  <RecipeCard recipe={recipe} />
                </View>
              ))}

              <Pressable
                onPress={() => router.push(RECIPES_ROUTE)}
                style={styles.seeAllContainer}
                accessibilityRole="button"
              >
                <Text style={styles.seeAllTitle}>{SEE_ALL_TEXT}</Text>
                <Text style={styles.seeAllSubtitle}>{GO_TO_RECIPES_TEXT}</Text>
              </Pressable>
            </ScrollView>

            <Pressable
              accessibilityRole="button"
              onPress={() => handleRecipesScroll(1)}
              style={[styles.sliderButton, styles.sliderButtonRight]}
            >
              <Ionicons
                color={COLORS.brandColor}
                name="chevron-forward"
                size={22}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: COLORS.surfaceColor,
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  homeContent: {
    gap: 24,
    paddingBottom: 36,
  },
  slider: {
    position: "relative",
  },
  sliderButton: {
    alignItems: "center",
    backgroundColor: COLORS.successColor,
    borderColor: COLORS.brandColor,
    borderWidth: 1,
    borderRadius: 999,
    elevation: 4,
    height: 40,
    justifyContent: "center",
    marginRight: 2,
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -20 }],
    width: 40,
    zIndex: 1,
  },
  sliderButtonLeft: {
    left: 4,
  },
  sliderButtonRight: {
    right: 4,
  },
  sliderContent: {
    gap: 12,
    paddingRight: 8,
  },
  featuredContainer: {
    gap: 12,
    paddingRight: 8,
  },
  featuredImage: {
    alignItems: "center",
    borderRadius: 14,
    justifyContent: "center",
    minHeight: 90,
    minWidth: 120,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  featuredImageLabel: {
    color: "#FFFFFF",
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
  },
  featuredImageContainer: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "flex-end",
  },
  featuredSlide: {
    borderRadius: 20,
    minHeight: 170,
    padding: 18,
  },
  featuredSubtitle: {
    color: "#FFFFFF",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    opacity: 0.95,
  },
  featuredHeader: {
    gap: 4,
  },
  featuredTitle: {
    color: "#FFFFFF",
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 24,
  },
  productCardContainer: {
    minWidth: 250,
    width: 250,
  },
  seeAllContainer: {
    backgroundColor: "#14532D",
    alignItems: "center",
    borderRadius: 22,
    justifyContent: "center",
    minHeight: 210,
    minWidth: 200,
    paddingHorizontal: 18,
  },
  recipeCardContainer: {
    minWidth: 260,
    width: 260,
  },
  sliderContainer: {
    gap: 12,
  },
  sliderTitle: {
    color: COLORS.primaryColor,
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 22,
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
