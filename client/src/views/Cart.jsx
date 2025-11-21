// src/views/Cart.jsx
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart, updateQuantity } from '../redux/cartSlice'; // Accede a las acciones de Redux
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Cart() {
  const { items, total } = useSelector((state) => state.cart); // Obtener el carrito desde Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!items) return <p className="text-white p-4">Cargando carrito...</p>;
  if (items.length === 0) return <h2 className="text-white p-4">🛒 Tu carrito está vacío</h2>;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const discountEligible = totalItems >= 3;
  const discountPrice = total * 0.8;

  const handleReduceQuantity = (productId) => {
    dispatch(updateQuantity({ productId, quantityChange: -1 }));
    toast.info("Cantidad reducida", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.info("Producto eliminado del carrito", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-4">🛍️ Mi Carrito</h2>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between items-center border-b border-gray-600 pb-4">
            <div>
              <p className="font-semibold text-lg">{item.product.name}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${item.product.price}</p>
              <img 
                src={item.product.imageUrl || '/placeholder.png'} 
                alt={item.product.name} 
                className="w-20 h-20 object-cover" 
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleReduceQuantity(item.product.id)}
                className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff] text-white font-bold text-base px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Reducir cantidad
              </button>

              <button
                onClick={() => handleRemoveFromCart(item.product.id)}
                className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff] text-white font-bold text-base px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl mt-6">Total: ${total}</h3>

      {discountEligible && (
        <p className="text-lg text-red-500 mt-2">
          ¡Descuento del 20%! Total con descuento: ${discountPrice}
        </p>
      )}

      <div className="flex flex-wrap gap-4 mt-8">
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff] text-white font-bold text-base px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Vaciar carrito
        </button>

        <button
          onClick={() => navigate("/checkout")}
          className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff] text-white font-bold text-base px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
