import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const token = localStorage.getItem("token");

  // 📦 Obtener el carrito del usuario autenticado
  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:4002/api/v1/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al obtener el carrito");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ➕ Agregar producto al carrito
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await fetch(
        `http://localhost:4002/api/v1/cart/add?productId=${productId}&quantity=${quantity}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error al agregar producto:", err);
    }
  };

  // ❌ Eliminar producto
  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:4002/api/v1/cart/remove/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🧹 Vaciar carrito
  const clearCart = async () => {
    try {
      await fetch("http://localhost:4002/api/v1/cart/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart({ items: [], total: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
