import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4002/api/v1/products/${id}`);
        if (!res.ok) throw new Error(`Producto no encontrado (HTTP ${res.status})`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-white text-center mt-10">Cargando producto...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  const precioFormateado = product.price ? Number(product.price).toLocaleString("es-AR") : "N/A";
  const sinStock = product.stock === 0;
  const imageUrl = product.imageUrl || "/placeholder.png";

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#0a0a20] rounded-xl shadow-lg">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-[300px] h-[300px] object-cover rounded mx-auto" 
      />
      <h1 className="text-4xl font-bold mt-4 text-white">{product.name}</h1>
      <p className="text-2xl text-gray-300 mt-2">${precioFormateado}</p>
      <p className="mt-4 text-gray-400">{product.description}</p>

      {/* Botón dentro del detalle */}
      {sinStock ? (
        <button
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-md cursor-not-allowed"
          disabled
        >
          AGOTADO
        </button>
      ) : (
        <button
          className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                        text-white font-extrabold 
                        text-8xl h-[50px] w-[200px]
                        rounded-full shadow-2xl 
                        hover:scale-110 transition-transform duration-300 flex items-center justify-center whitespace-nowrap"
          onClick={() => addToCart(product.id)}
        >
          Agregar al carrito
        </button>
      )}
    </div>
  );
}
