import { Recipe } from "@/types/Recipe";

export const ONBOARDING_SLIDES = [
  {
    title: "Mandado a domicilio",
    description:
      "Te enviamos a tu casa lo que necesites, sin que tengas que salir de tu hogar.",
    imageSource: require("../../assets/images/onboarding/delivery.png"),
  },
  {
    title: "No sabes que cocinar?",
    description:
      "Te ayudamos a decidir qué cocinar con recetas sanas y rápidas.",
    imageSource: require("../../assets/images/onboarding/cooking.png"),
  },
  {
    title: "Siempre fresco",
    description:
      "Sellamos al vacio para que tu comida llegue fresca y lista para comer.",
    imageSource: require("../../assets/images/onboarding/fresh.png"),
  },
];

export const RECIPES: Recipe[] = [
  {
    id: "1",
    name: "Avocado Toast with Lime",
    ingredients: "Fresh Greens, Eggs",
    category: "Desayuno",
    image:
      "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80",
    cookTime: "15 min",
  },
  {
    id: "2",
    name: "Spinach Omelet",
    ingredients: "Fresh Greens, Eggs",
    category: "Desayuno",
    image:
      "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80",
    cookTime: "15 min",
  },
  {
    id: "3",
    name: "Chicken Wrap Bowl",
    ingredients: "Chicken, Tortilla, Spinach",
    category: "Almuerzo",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
    cookTime: "20 min",
  },
  {
    id: "4",
    name: "Berry Smoothie Bowl",
    ingredients: "Banana, Berries, Yogurt",
    category: "Cena",
    image:
      "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80",
    cookTime: "10 min",
  },
  {
    id: "5",
    name: "Roasted Veggie Plate",
    ingredients: "Zucchini, Carrot, Broccoli",
    category: "Almuerzo",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    cookTime: "25 min",
  },
  {
    id: "6",
    name: "Salmon Rice Bowl",
    ingredients: "Salmon, Rice, Avocado",
    category: "Cena",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    cookTime: "30 min",
  },
];
