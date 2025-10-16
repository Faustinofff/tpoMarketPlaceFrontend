import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (!cart) return <p className="text-white p-4">Cargando carrito...</p>;
  if (cart.items.length === 0)
    return <h2 className="text-white p-4">🛒 Tu carrito está vacío</h2>;

  // Calcular cantidad total de productos
  const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  // Verifica si el carrito es elegible para descuento
  const discountEligible = totalItems >= 3;

  // Calcular totales
  const totalPrice = cart.total;
  const discountPrice = totalPrice * 0.8;

  // 🔧 Solo guardamos el descuento si aplica
  if (discountEligible) {
    cart.discountPrice = discountPrice;
  } else {
    delete cart.discountPrice; // Eliminamos si no aplica
  }

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
              className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                        text-white font-extrabold 
                        text-8xl h-[50px] w-[200px]
                        rounded-full shadow-2xl 
                        hover:scale-110 transition-transform duration-300 flex items-center justify-center whitespace-nowrap"
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
        className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                        text-white font-extrabold 
                        text-8xl h-[50px] w-[200px]
                        rounded-full shadow-2xl 
                        hover:scale-110 transition-transform duration-300 flex items-center justify-center whitespace-nowrap"
      >
        Vaciar carrito
      </button>

      <button
        onClick={() => navigate("/checkout")}
        className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                        text-white font-extrabold 
                        text-8xl h-[50px] w-[200px]
                        rounded-full shadow-2xl 
                        hover:scale-110 transition-transform duration-300 flex items-center justify-center whitespace-nowrap"
      >
        Checkout
      </button>
    </div>
  );
}
