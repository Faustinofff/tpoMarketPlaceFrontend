import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  const [cart, setCart] = useState({ items: [], total: 0 });
  const token = localStorage.getItem("token");

  // Fetch carrito
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

  // Añadir al carrito
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

  // Eliminar producto del carrito
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

  // Vaciar carrito
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

  // Actualizar la cantidad de un producto en el carrito
  const updateQuantity = (productId, quantityChange) => {
    const updatedItems = cart.items.map(item => {
      if (item.product.id === productId) {
        const updatedQuantity = item.quantity + quantityChange;

        // Si la cantidad es menor o igual a 0, lo eliminamos del carrito
        if (updatedQuantity <= 0) {
          return null;
        }

        return { ...item, quantity: updatedQuantity };
      }
      return item;
    }).filter(item => item !== null); // Filtramos los productos eliminados

    // Actualizamos el estado del carrito
    setCart({
      items: updatedItems,
      total: updatedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    });
  };

  // Fetch del carrito cuando se carga
  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
