import { useContext } from "react";
import { CartContext } from "../context/CartContext";


const ProductCard = ({ id, nombre, precio, imagenUrl, stock }) => {
  const { addToCart } = useContext(CartContext);
  const precioFormateado = precio ? Number(precio).toLocaleString("es-AR") : "N/A";
  const sinStock = stock === 0;


  return (
    // En pantallas pequeñas toma todo el ancho (w-full),
    // en sm+ tiene un max-width constante para que todas sean iguales.
    <div className="w-full sm:max-w-[260px] h-[380px] bg-[#0a0a20] rounded-2xl border border-gray-700 flex flex-col overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02]">
      {/* Imagen: altura fija para evitar 'finas' */}
      <div className="w-full h-44 overflow-hidden">
        <img
          src={imagenUrl}
          alt={nombre}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>


      {/* Contenido */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-white text-base mb-1 line-clamp-2">
            {nombre}
          </h3>
          <p className="text-gray-400 text-sm">${precioFormateado}</p>
        </div>


        {sinStock ? (
          <button
            className="w-full bg-red-600 text-white py-2 mt-3 rounded-md text-sm cursor-not-allowed"
            disabled
          >
            AGOTADO
          </button>
        ) : (
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 mt-3 rounded-md text-sm transition-colors"
            onClick={() => addToCart(id)}
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
};


export default ProductCard;
