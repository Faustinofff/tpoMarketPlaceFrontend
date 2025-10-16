import { Link } from "react-router-dom";

const ProductCard = ({ id, nombre, precio, imagenUrl }) => {
  const precioFormateado = precio ? Number(precio).toLocaleString("es-AR") : "N/A";

  return (
    <Link
      to={`/producto/${id}`}
      className="bg-[#0a0a20] rounded-2xl border border-gray-700 shadow-md hover:scale-105 transition-transform flex flex-col overflow-hidden w-[260px] h-[420px] no-underline"
    >
      {/* Imagen cuadrada */}
      <div className="w-full aspect-square overflow-hidden">
        <img
          src={imagenUrl}
          alt={nombre}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Contenido */}
      <div className="p-3 flex-1 flex flex-col justify-center">
        <h3 className="text-white font-semibold text-lg hover:text-[#00f0ff] transition-colors duration-200">
          {nombre}
        </h3>
        <p className="text-white mt-1">${precioFormateado}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
