import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItemData {
  id: string;
  eventName: string;
  zoneName: string;
  price: number;
  quantity: number;
  image?: string;
  type?: 'ticket' | 'item';
  itemName?: string;
}

interface CartContextType {
  items: CartItemData[];
  addItem: (item: CartItemData) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const mockInitialItems: CartItemData[] = [
  {
    id: "1",
    eventName: "Festival de Rock en Vivo 2024",
    zoneName: "VIP",
    price: 2500,
    quantity: 2,
    type: 'ticket' as const,
  },
  {
    id: "2",
    eventName: "Festival de Rock en Vivo 2024",
    zoneName: "General Centro",
    price: 850,
    quantity: 3,
    type: 'ticket' as const,
  },
  {
    id: "item-1",
    eventName: "Festival de Rock en Vivo 2024",
    zoneName: "Combo Familiar",
    itemName: "Combo Familiar",
    price: 350,
    quantity: 1,
    type: 'item' as const,
  },
  {
    id: "item-2",
    eventName: "Festival de Rock en Vivo 2024",
    zoneName: "Cerveza Premium",
    itemName: "Cerveza Premium",
    price: 85,
    quantity: 2,
    type: 'item' as const,
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemData[]>(mockInitialItems);

  const addItem = (newItem: CartItemData) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === newItem.id && item.zoneName === newItem.zoneName
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        };
        return updatedItems;
      }

      return [...prevItems, newItem];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        itemCount,
      }}
    >
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
