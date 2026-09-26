import { createContext, useContext, useState } from "react";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.skuCode === product.skuCode);

      if (existing) {
        return prev.map((item) =>
          item.skuCode === product.skuCode
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (skuCode) => {
    setCart((prev) => prev.filter((item) => item.skuCode !== skuCode));
  };

  const clearCart = () => setCart([]);

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <OrderContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        clearCart,
        addOrder,
        totalPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useCart() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useCart must be used inside OrderProvider");
  }

  return context;
}
