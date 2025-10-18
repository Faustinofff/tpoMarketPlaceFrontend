import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [name, setName] = useState(""); 
  const navigate = useNavigate();

  
  const token = localStorage.getItem("token");

  
  const hasDiscount = cart.discountPrice && cart.discountPrice < cart.total;
  const finalPrice = hasDiscount ? cart.discountPrice : cart.total;

  const handleCheckout = async () => {
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      navigate("/login");
      return;
    }

    if (!name.trim()) {
      alert("Por favor, ingresa tu nombre antes de continuar.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4002/api/v1/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          total: finalPrice,
          items: cart.items,
        }),
      });

      if (response.ok) {
        clearCart(); 
        navigate("/order-confirmation", { state: { name } });
      } else {
        alert("Hubo un problema al realizar la compra.");
      }
    } catch (error) {
      alert("Error de conexión. Intenta nuevamente.");
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-6 font-semibold">🧾 Finalizar compra</h2>

      <div className="mb-6">
        <label className="block mb-2 text-lg font-medium">Nombre completo:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 bg-gray-700 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
          placeholder="Ingresa tu nombre"
        />
      </div>

      <div className="mb-6">
        <p className="text-lg mb-2">Total: ${cart.total}</p>

        {hasDiscount && (
          <p className="text-lg text-red-500">
            ¡Descuento del 20%! Total con descuento: ${finalPrice}
          </p>
        )}
      </div>

      <button
        onClick={handleCheckout}
        className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                   text-white font-bold text-base
                   px-8 py-3 rounded-full shadow-lg
                   hover:scale-105 transition-transform duration-300
                   flex items-center justify-center"
      >
        Finalizar compra
      </button>
    </div>
  );
}
