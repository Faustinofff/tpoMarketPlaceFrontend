import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ id, nombre, precio, imagenUrl, stock }) => {
  const { addToCart } = useContext(CartContext);
  const precioFormateado = precio ? precio.toString() : "N/A";
  const sinStock = stock === 0;

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden w-1/3">
      <img
        src={imagenUrl}
        alt={nombre}
        className="w-full h-32 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-base text-white">{nombre}</h3>
        <p className="text-gray-400 text-sm">${precioFormateado}</p>

        {sinStock ? (
          <button
            className="mt-2 w-full bg-red-600 text-white px-3 py-1 rounded text-sm cursor-not-allowed"
            disabled
          >
            AGOTADO
          </button>
        ) : (
          <button
            className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
            onClick={() => addToCart(id)} // 👈 CAMBIO AQUÍ
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
