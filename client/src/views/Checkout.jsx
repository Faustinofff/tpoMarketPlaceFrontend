import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [name, setName] = useState(""); // Estado para el nombre del cliente
  const navigate = useNavigate(); // Para redirigir después del checkout

  // Obtener token del almacenamiento local
  const token = localStorage.getItem("token");

  // Usar el precio con descuento solo si realmente existe y aplica
  const hasDiscount =
    cart.discountPrice && cart.discountPrice < cart.total;
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
        clearCart(); // Limpiar carrito tras la compra
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
      <h2 className="text-2xl mb-4">Finalizar compra</h2>

      <div>
        <label className="block mb-2">Nombre completo:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 mb-4 bg-gray-700 rounded w-full"
          placeholder="Ingresa tu nombre"
        />
      </div>

      <div>
        <p className="mb-2 text-lg">Total: ${cart.total}</p>

        {hasDiscount && (
          <p className="text-xl text-red-500 mb-4">
            ¡Descuento del 20%! Total con descuento: ${finalPrice}
          </p>
        )}

        <button
          onClick={handleCheckout}
          className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                    text-white font-extrabold 
                    text-8xl h-[50px] w-[200px]
                    rounded-full shadow-2xl 
                    hover:scale-110 transition-transform duration-300 flex items-center justify-center whitespace-nowrap"
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
