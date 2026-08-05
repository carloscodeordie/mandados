import { MeasurementUnit } from "@/types/MeasurementUnit";
import { ProductCategory } from "@/types/ProductCategory";
import { Href } from "expo-router";

export const ADD_INGREDIENTS_TEXT = "Agregar ingredientes";
export const ADDED_FEEDBACK_DURATION_MS = 1200;

export const APPLICATION_NAME = "GroceryToGo";
export const APPLICATION_SLOGAN = "Come sano sin tanta vuelta";

export const AVAILABLE_TEXT = "Disponible";
export const UNAVAILABLE_TEXT = "Sin stock";

export const CART_PRODUCTS_STORAGE_KEY = "@mandados:cart-products";
export const CART_ROUTE: Href = "/cart";
export const CART_TEXT = "Carrito";

export const CHECKOUT_TEXT = "Comprar";

export const HOME_ROUTE: Href = "/home";
export const HOME_TEXT = "Acceder";

export const LOGIN_ROUTE: Href = "/login";
export const LOGIN_TEXT = "Iniciar sesion";

export const LOGON_ROUTE: Href = "/logon";
export const LOGON_TEXT = "Crear cuenta";

export const COLORS = {
  brandColor: "#32CD32",
  dangerColor: "#DC2626",
  defaultBackground: "#FFFFFF",
  primaryColor: "#1E293B",
  secondaryColor: "#64748B",
  splashBackground: "#22C55E",
  successColor: "#064E3B",
  surfaceColor: "#F1F5F9",
};

export const EMPTY_CART_DESCRIPTION =
  "Agrega productos desde recetas o productos para comenzar tu compra.";
export const EMPTY_CART_TITLE = "Tu carrito esta vacio";

export const FEATURED_TEXT = "Destacados";

export const GO_TO_PRODUCTS_TEXT = "Ir a productos";
export const GO_TO_RECIPES_TEXT = "Ir a recetas";

export const INGREDIENTS_TEXT = "Ingredientes";

export const MEASUREMENT_UNIT_LABELS: Record<MeasurementUnit, string> = {
  g: "gr",
  kg: "kg",
  l: "l",
  ml: "ml",
  unit: "unidad",
};

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

export const PAYMENT_ROUTE: Href = "/payment";
export const PAYMENT_TEXT = "Pago";

export const QUANTITY_TEXT = "Cantidad";

export const RECIPE_FILTERS = ["Todos", "Desayuno", "Almuerzo", "Cena"];

export const RECIPES_DESKTOP_COLUMN_COUNT = 4;
export const RECIPES_MOBILE_COLUMN_COUNT = 2;
export const RECIPES_ROUTE: Href = "/recipes";
export const RECIPES_TEXT = "Recetas";

export const SEE_ALL_TEXT = "Ver todos";
export const SEE_MORE_TEXT = "Ver mas";

export const SPLASH_SCREEN_DURATION = 3000;

export const UNIT_TEXT = "unidad";

export const WELCOME_TEXT = "Bienvenido";

export const LOGIN_QUESTION_TEXT = "¿Ya tienes una cuenta?";
export const LOGON_QUESTION_TEXT = "¿No tienes una cuenta?";
