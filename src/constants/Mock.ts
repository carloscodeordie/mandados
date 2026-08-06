import { FeaturedSlide } from "@/types/FeaturedSlide";
import { Product } from "@/types/Product";
import { Recipe } from "@/types/Recipe";

export const RECIPES: Recipe[] = [
  {
    id: "1",
    name: "Tostada de Aguacate con Lima",
    products: [
      {
        id: "1",
        name: "Aguacate",
        imageUrl:
          "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=800&q=80",
        quantity: "1",
        measurementUnit: "unit",
        priceUnit: 0.25,
        category: "Frutas",
        inStock: true,
        price: 10,
      },
      {
        id: "2",
        name: "Pan",
        imageUrl:
          "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
        quantity: "2",
        measurementUnit: "unit",
        category: "Cereales",
        inStock: true,
        price: 10,
      },
      {
        id: "3",
        name: "Lima",
        imageUrl:
          "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
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
    products: [
      {
        id: "4",
        name: "Lechuga",
        imageUrl:
          "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=800&q=80",
        quantity: "1",
        measurementUnit: "unit",
        category: "Verduras",
        inStock: true,
        price: 10,
      },
      {
        id: "5",
        name: "Huevos",
        imageUrl:
          "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=800&q=80",
        quantity: "2",
        measurementUnit: "unit",
        priceUnit: 0.06,
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
    products: [
      {
        id: "6",
        name: "Pollo",
        imageUrl:
          "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80",
        quantity: "1",
        measurementUnit: "unit",
        category: "Carnes",
        inStock: true,
        price: 10,
      },
      {
        id: "7",
        name: "Tortilla",
        imageUrl:
          "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=800&q=80",
        quantity: "1",
        measurementUnit: "unit",
        category: "Cereales",
        inStock: true,
        price: 10,
      },
      {
        id: "8",
        name: "Espinaca",
        imageUrl:
          "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
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
    products: [
      {
        id: "9",
        name: "Plátano",
        imageUrl:
          "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
        quantity: "1",
        measurementUnit: "unit",
        category: "Frutas",
        inStock: true,
        price: 10,
      },
      {
        id: "10",
        name: "Frutos rojos",
        imageUrl:
          "https://images.unsplash.com/photo-1563746924237-fb7f0e6f645d?auto=format&fit=crop&w=800&q=80",
        quantity: "1",
        measurementUnit: "unit",
        category: "Frutas",
        inStock: true,
        price: 10,
      },
      {
        id: "11",
        name: "Yogurth",
        imageUrl:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
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
    products: [
      {
        id: "12",
        name: "Calabacín",
        imageUrl:
          "https://images.unsplash.com/photo-1583663848850-46af132dc08e?auto=format&fit=crop&w=800&q=80",
        quantity: "1",
        measurementUnit: "unit",
        priceUnit: 0.3,
        category: "Verduras",
        inStock: true,
        price: 10,
      },
      {
        id: "13",
        name: "Zanahoria",
        imageUrl:
          "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=800&q=80",
        quantity: "1",
        measurementUnit: "unit",
        category: "Verduras",
        inStock: true,
        price: 10,
      },
      {
        id: "14",
        name: "Brócoli",
        imageUrl:
          "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80",
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
    products: [
      {
        id: "15",
        name: "Salmon",
        imageUrl:
          "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=800&q=80",
        quantity: "1",
        measurementUnit: "unit",
        priceUnit: 0.2,
        category: "Pescados",
        inStock: true,
        price: 10,
      },
      {
        id: "16",
        name: "Arroz",
        imageUrl:
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
        quantity: "1",
        measurementUnit: "unit",
        category: "Cereales",
        inStock: true,
        price: 10,
      },
      {
        id: "17",
        name: "Aguacate",
        imageUrl:
          "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=800&q=80",
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

export const PRODUCTS: Product[] = [
  {
    allowedMeasurementUnits: ["unit", "kg"],
    id: "1",
    name: "Aguacate",
    imageUrl:
      "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "kg",
    priceUnit: 0.25,
    category: "Frutas",
    inStock: true,
    price: 10,
  },
  {
    id: "2",
    name: "Pan",
    imageUrl:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "unit",
    category: "Cereales",
    inStock: true,
    price: 8,
  },
  {
    id: "3",
    name: "Lima",
    imageUrl:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "kg",
    category: "Frutas",
    inStock: true,
    price: 6,
  },
  {
    id: "4",
    name: "Lechuga",
    imageUrl:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "unit",
    category: "Verduras",
    inStock: true,
    price: 7,
  },
  {
    allowedMeasurementUnits: ["unit", "kg"],
    id: "5",
    name: "Huevos",
    imageUrl:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "kg",
    priceUnit: 0.06,
    category: "Carnes",
    inStock: true,
    price: 12,
  },
  {
    id: "6",
    name: "Pollo",
    imageUrl:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "kg",
    category: "Carnes",
    inStock: true,
    price: 18,
  },
  {
    id: "7",
    name: "Tortilla",
    imageUrl:
      "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "kg",
    category: "Cereales",
    inStock: true,
    price: 9,
  },
  {
    id: "8",
    name: "Espinaca",
    imageUrl:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "kg",
    category: "Verduras",
    inStock: true,
    price: 11,
  },
  {
    id: "9",
    name: "Plátano",
    imageUrl:
      "https://images.unsplash.com/photo-1574226516831-e1dff420e37f?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "unit",
    category: "Frutas",
    inStock: true,
    price: 5,
  },
  {
    id: "10",
    name: "Frutos rojos",
    imageUrl:
      "https://images.unsplash.com/photo-1563746924237-fb7f0e6f645d?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "g",
    category: "Frutas",
    inStock: true,
    price: 13,
  },
  {
    id: "11",
    name: "Yogurth",
    imageUrl:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "ml",
    category: "Lácteos",
    inStock: true,
    price: 10,
  },
  {
    allowedMeasurementUnits: ["unit", "kg"],
    id: "12",
    name: "Calabacín",
    imageUrl:
      "https://images.unsplash.com/photo-1583663848850-46af132dc08e?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "kg",
    priceUnit: 0.3,
    category: "Verduras",
    inStock: true,
    price: 8,
  },
  {
    id: "13",
    name: "Zanahoria",
    imageUrl:
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "kg",
    category: "Verduras",
    inStock: true,
    price: 7,
  },
  {
    id: "14",
    name: "Brócoli",
    imageUrl:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "kg",
    category: "Verduras",
    inStock: false,
    price: 9,
  },
  {
    allowedMeasurementUnits: ["unit", "kg"],
    id: "15",
    name: "Salmon",
    imageUrl:
      "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "kg",
    priceUnit: 0.2,
    category: "Pescados",
    inStock: true,
    price: 24,
  },
  {
    id: "16",
    name: "Arroz",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    quantity: "1",
    measurementUnit: "kg",
    category: "Cereales",
    inStock: true,
    price: 14,
  },
];

export const FEATURED_SLIDES: FeaturedSlide[] = [
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
