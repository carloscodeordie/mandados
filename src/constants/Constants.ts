import { Href } from "expo-router";

export const APPLICATION_NAME = "Mandados";
export const APPLICATION_SLOGAN = "Come sano sin tanta vuelta";

export const COLORS = {
  brandColor: "#32CD32",
  defaultBackground: "#FFFFFF",
  primaryColor: "#1E293B",
  secondaryColor: "#64748B",
  splashBackground: "#22C55E",
  successColor: "#064E3B",
  surfaceColor: "#F1F5F9",
};

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

export const RECIPE_FILTERS = ["Todos", "Desayuno", "Almuerzo", "Cena"];

export const RECIPES_ROUTE: Href = "/recipes";
export const RECIPES_TEXT = "Recetas";

export const PRODUCTS_ROUTE: Href = "/products";
export const PRODUCTS_TEXT = "Productos";

export const SPLASH_SCREEN_DURATION = 3000;
