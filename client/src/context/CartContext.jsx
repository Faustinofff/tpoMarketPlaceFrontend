import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  const [cart, setCart] = useState({ items: [], total: 0 });
  const token = localStorage.getItem("token");

  
  const fetchCart = async () => {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:4002/api/v1/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error al obtener el carrito:", errorText);
        return;
      }

      
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("Respuesta del carrito no es JSON válido:", jsonErr);
        return;
      }

      
      if (!data || !data.items) {
        data = { items: [], total: 0 };
      }

      setCart(data);
    } catch (err) {
      console.error("Error al conectar con el backend:", err);
    }
  };

  
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await fetch(
        `http://localhost:4002/api/v1/cart/add?productId=${productId}&quantity=${quantity}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        console.error("Error al agregar producto:", await res.text());
        return;
      }

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error al agregar producto:", err);
    }
  };

  
  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:4002/api/v1/cart/remove/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        console.error("Error al eliminar producto:", await res.text());
        return;
      }

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  
  const clearCart = async () => {
    try {
      await fetch("http://localhost:4002/api/v1/cart/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart({ items: [], total: 0 });
    } catch (err) {
      console.error("Error al vaciar carrito:", err);
    }
  };

  
  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
