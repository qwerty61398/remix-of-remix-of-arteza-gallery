import { createContext, useContext, useState, ReactNode } from "react";
import { Painting } from "@/data/paintings";

interface CartItem {
  painting: Painting;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (painting: Painting) => void;
  removeFromCart: (paintingId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (painting: Painting) => {
    setItems(prev => {
      const existing = prev.find(item => item.painting.id === painting.id);
      if (existing) {
        return prev.map(item =>
          item.painting.id === painting.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { painting, quantity: 1 }];
    });
  };

  const removeFromCart = (paintingId: string) => {
    setItems(prev => prev.filter(item => item.painting.id !== paintingId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.painting.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
