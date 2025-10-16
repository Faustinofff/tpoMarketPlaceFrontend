import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ id, nombre, precio, imagenUrl, stock }) => {
  const { addToCart } = useContext(CartContext);
  const precioFormateado = precio ? Number(precio).toLocaleString("es-AR") : "N/A";

  return (
    <div className="bg-[#0a0a20] rounded-2xl border border-gray-700 shadow-md hover:scale-105 transition-transform flex flex-col overflow-hidden w-[260px] h-[380px]">

      
      {/* Link al detalle */}
      <Link to={`/producto/${id}`} className="flex-1 cursor-pointer">
        <div className="h-44 w-full overflow-hidden">
          <img
            src={imagenUrl}
            alt={nombre}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="p-3">
          <h3 className="no-underline text-white hover:text-[#00f0ff] transition-colors duration-200"
          style={{ color: 'white', textDecoration: 'none' }}>{nombre}</h3>
          <p className="no-underline text-white hover:text-[#00f0ff] transition-colors duration-200"
          style={{ color: 'white', textDecoration: 'none' }}>${precioFormateado}</p>
        </div>
      </Link>

      {/* Botón carrito */}
      <div className="p-3">
        
      </div>
    </div>
  );
};

export default ProductCard;
