import { useContext } from "react";
import { CartContext } from "../context/CartContext";


export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  if (!cart) return <p className="text-white p-4">Cargando carrito...</p>;
  if (cart.items.length === 0)
    return <h2 className="text-white p-4">🛒 Tu carrito está vacío</h2>;

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

      <h3 className="text-xl mt-6">Total: ${cart.total}</h3>
      <button
        onClick={clearCart}
        className="mt-4 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Vaciar carrito
      </button>
    </div>
  );
}
