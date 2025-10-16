import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");  // Estado para el nombre del cliente
  const navigate = useNavigate();  // Usamos esto para redirigir después del checkout

  // Obtener el token del almacenamiento local
  const token = localStorage.getItem("token");

  // Usamos el precio con descuento guardado en el carrito
  const discountPrice = cart.discountPrice || cart.total;  // Si no hay descuento, usar el total

  const handleCheckout = async () => {
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:4002/api/v1/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Aquí agregamos el token en los encabezados
        },
        body: JSON.stringify({
          name,
          total: discountPrice,  // Enviamos el precio con descuento
          items: cart.items,
        }),
      });

      if (response.ok) {
        clearCart(); // Limpiar el carrito después de la compra
        navigate("/order-confirmation", { state: { name } });  // Pasamos el nombre al estado de la navegación
      } else {
        alert("Hubo un problema al realizar la compra");
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
        <p className="mb-2">Total: ${cart.total}</p>
        {cart.discountPrice && (
          <p className="text-xl text-red-500">
            ¡Descuento del 20%! Total con descuento: ${discountPrice}
          </p>
        )}
        <button
          onClick={handleCheckout}
          className="mt-4 bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
