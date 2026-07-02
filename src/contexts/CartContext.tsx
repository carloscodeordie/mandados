import { Product } from "@/types/Product";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type CartContextValue = {
  products: Product[];
  productsCount: number;
  addRecipeProducts: (products: Product[]) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  const addRecipeProducts = useCallback((newProducts: Product[]) => {
    setProducts((currentProducts) => [...currentProducts, ...newProducts]);
  }, []);

  const clearCart = useCallback(() => {
    setProducts([]);
  }, []);

  const value = useMemo(
    () => ({
      products,
      productsCount: products.length,
      addRecipeProducts,
      clearCart,
    }),
    [addRecipeProducts, clearCart, products],
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
