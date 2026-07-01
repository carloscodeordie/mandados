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
    name: "Tostada de Aguacate con Lima",
    ingredients: [
      {
        id: "1",
        name: "Aguacate",
        quantity: "1",
        measurementUnit: "unit",
        category: "Frutas",
        inStock: true,
        price: 10,
      },
      {
        id: "2",
        name: "Pan",
        quantity: "2",
        measurementUnit: "unit",
        category: "Cereales",
        inStock: true,
        price: 10,
      },
      {
        id: "3",
        name: "Lima",
        quantity: "1",
        measurementUnit: "unit",
        category: "Frutas",
        inStock: true,
        price: 10,
      },
    ],
    category: "Desayuno",
    image:
      "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80",
    cookTime: 15,
  },
  {
    id: "2",
    name: "Omelet de Espinaca",
    ingredients: [
      {
        id: "4",
        name: "Lechuga",
        quantity: "1",
        measurementUnit: "unit",
        category: "Verduras",
        inStock: true,
        price: 10,
      },
      {
        id: "5",
        name: "Huevos",
        quantity: "2",
        measurementUnit: "unit",
        category: "Carnes",
        inStock: true,
        price: 10,
      },
    ],
    category: "Desayuno",
    image:
      "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80",
    cookTime: 15,
  },
  {
    id: "3",
    name: "Bowl de Wrap de Pollo",
    ingredients: [
      {
        id: "6",
        name: "Pollo",
        quantity: "1",
        measurementUnit: "unit",
        category: "Carnes",
        inStock: true,
        price: 10,
      },
      {
        id: "7",
        name: "Tortilla",
        quantity: "1",
        measurementUnit: "unit",
        category: "Cereales",
        inStock: true,
        price: 10,
      },
      {
        id: "8",
        name: "Espinaca",
        quantity: "1",
        measurementUnit: "unit",
        category: "Verduras",
        inStock: true,
        price: 10,
      },
    ],
    category: "Almuerzo",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
    cookTime: 20,
  },
  {
    id: "4",
    name: "Smoothie de Frutos Rojos",
    ingredients: [
      {
        id: "9",
        name: "Plátano",
        quantity: "1",
        measurementUnit: "unit",
        category: "Frutas",
        inStock: true,
        price: 10,
      },
      {
        id: "10",
        name: "Frutos rojos",
        quantity: "1",
        measurementUnit: "unit",
        category: "Frutas",
        inStock: true,
        price: 10,
      },
      {
        id: "11",
        name: "Yogurth",
        quantity: "1",
        measurementUnit: "unit",
        category: "Lácteos",
        inStock: true,
        price: 10,
      },
    ],
    category: "Cena",
    image:
      "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80",
    cookTime: 10,
  },
  {
    id: "5",
    name: "Plato de Verduras Asadas",
    ingredients: [
      {
        id: "12",
        name: "Calabacín",
        quantity: "1",
        measurementUnit: "unit",
        category: "Verduras",
        inStock: true,
        price: 10,
      },
      {
        id: "13",
        name: "Zanahoria",
        quantity: "1",
        measurementUnit: "unit",
        category: "Verduras",
        inStock: true,
        price: 10,
      },
      {
        id: "14",
        name: "Brócoli",
        quantity: "1",
        measurementUnit: "unit",
        category: "Verduras",
        inStock: true,
        price: 10,
      },
    ],
    category: "Almuerzo",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    cookTime: 25,
  },
  {
    id: "6",
    name: "Bowl de Arroz con Salmón",
    ingredients: [
      {
        id: "15",
        name: "Salmon",
        quantity: "1",
        measurementUnit: "unit",
        category: "Pescados",
        inStock: true,
        price: 10,
      },
      {
        id: "16",
        name: "Arroz",
        quantity: "1",
        measurementUnit: "unit",
        category: "Cereales",
        inStock: true,
        price: 10,
      },
      {
        id: "17",
        name: "Aguacate",
        quantity: "1",
        measurementUnit: "unit",
        category: "Frutas",
        inStock: true,
        price: 10,
      },
    ],
    category: "Cena",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    cookTime: 30,
  },
];
