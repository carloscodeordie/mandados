import { Ingredient } from "@/types/Ingredient";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type CartContextValue = {
  ingredients: Ingredient[];
  ingredientsCount: number;
  addRecipeIngredients: (ingredients: Ingredient[]) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function CartProvider({ children }: { children: ReactNode }) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const addRecipeIngredients = useCallback((newIngredients: Ingredient[]) => {
    setIngredients((currentIngredients) => [
      ...currentIngredients,
      ...newIngredients,
    ]);
  }, []);

  const clearCart = useCallback(() => {
    setIngredients([]);
  }, []);

  const value = useMemo(
    () => ({
      ingredients,
      ingredientsCount: ingredients.length,
      addRecipeIngredients,
      clearCart,
    }),
    [addRecipeIngredients, clearCart, ingredients],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

export { CartProvider, useCart };
