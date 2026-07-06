import { ProductCategory } from "@/types/ProductCategory";
import { Href } from "expo-router";

export const ADD_INGREDIENTS_TEXT = "Agregar ingredientes";
export const ADDED_FEEDBACK_DURATION_MS = 1200;

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

export const INGREDIENTS_TEXT = "Ingredientes";

export const NOT_FOUND_BUTTON = "Ir al inicio";
export const NOT_FOUND_ERROR = "Error";
export const NOT_FOUND_TITLE = "La pagina no existe";
export const NOT_FOUND_PATH: Href = "/+not-found";

export const PREPARATION_STEPS = [
  "Preparar y medir todos los ingredientes.",
  "Cocinar la base principal de la receta.",
  "Servir y agregar toppings al gusto.",
];

export const PRODUCT_FILTERS: ProductCategory[] = [
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
export const PRODUCTS_ROUTE: Href = "/products";
export const PRODUCTS_TEXT = "Productos";

export const RECIPE_FILTERS = ["Todos", "Desayuno", "Almuerzo", "Cena"];

export const RECIPES_DESKTOP_COLUMN_COUNT = 4;
export const RECIPES_MOBILE_COLUMN_COUNT = 2;
export const RECIPES_ROUTE: Href = "/recipes";
export const RECIPES_TEXT = "Recetas";

export const SPLASH_SCREEN_DURATION = 3000;
