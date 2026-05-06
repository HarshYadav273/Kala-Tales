import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}

function normalizeProduct(product) {
  return {
    ...product,
    id: String(product.id),
    price: Number(product.price) || 0,
  };
}

function loadStoredCart() {
  try {
    const stored = localStorage.getItem("kala-tales-cart");
    const parsed = stored ? JSON.parse(stored) : [];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item) => item && item.id != null && Number(item.quantity) > 0)
      .map((item) => ({
        ...normalizeProduct(item),
        quantity: Number(item.quantity),
      }));
  } catch {
    localStorage.removeItem("kala-tales-cart");
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadStoredCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartFullscreen, setCartFullscreen] = useState(false);

  useEffect(() => {
    localStorage.setItem("kala-tales-cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    const cartProduct = normalizeProduct(product);

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartProduct.id);

      if (existing) {
        return prev.map((item) =>
          item.id === cartProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...cartProduct, quantity: 1 }];
    });

    setCartOpen(true);
  }

  function removeFromCart(productId) {
    const id = String(productId);
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function increaseQty(productId) {
    const id = String(productId);
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decreaseQty(productId) {
    const id = String(productId);

    setCart((prev) => {
      const item = prev.find((cartItem) => cartItem.id === id);
      if (!item) {
        return prev;
      }

      if (item.quantity === 1) {
        return prev.filter((cartItem) => cartItem.id !== id);
      }

      return prev.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem,
      );
    });
  }

  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        cartFullscreen,
        setCartFullscreen,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
