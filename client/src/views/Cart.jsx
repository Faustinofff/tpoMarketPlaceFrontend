import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (!cart) return <p className="text-white p-4">Cargando carrito...</p>;
  if (cart.items.length === 0)
    return <h2 className="text-white p-4">🛒 Tu carrito está vacío</h2>;

  // Verifica si el total de productos (sumando las cantidades) es 3 o más
  const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  // Verifica si el carrito es elegible para descuento
  const discountEligible = totalItems >= 3;

  // Calcular el total con y sin descuento
  const totalPrice = cart.total;
  const discountPrice = discountEligible ? totalPrice * 0.8 : totalPrice; // Aplicar 20% de descuento

  // Guardamos el precio con descuento en el estado del carrito (si es necesario)
  cart.discountPrice = discountPrice;

  console.log("Total de unidades en el carrito:", totalItems);
  console.log("Total sin descuento:", totalPrice);
  console.log("Descuento aplicado:", discountEligible);
  console.log("Total con descuento:", discountPrice);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-4">🛍️ Mi Carrito</h2>
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b border-gray-600 pb-2"
          >
            <div>
              <p className="font-semibold">{item.product.name}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${item.product.price}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <h3 className="text-xl mt-6">Total: ${totalPrice}</h3>
      {discountEligible && (
        <p className="text-xl text-red-500">
          ¡Descuento del 20%! Total con descuento: ${discountPrice}
        </p>
      )}

      <button
        onClick={() => clearCart()}
        className="mt-4 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Vaciar carrito
      </button>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-4 bg-green-500 px-4 py-2 rounded hover:bg-green-600"
      >
        Checkout
      </button>
    </div>
  );
}
