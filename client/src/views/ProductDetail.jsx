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
    <div className="max-w-4xl mx-auto p-8 bg-[#0a0a20] rounded-xl shadow-lg text-white mt-10">
      <div className="flex flex-col items-center text-center">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-[300px] h-[300px] object-cover rounded mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-xl mb-4">${precioFormateado}</p>
        <p className="text-gray-400 mb-8">{product.description}</p>

        {sinStock ? (
          <button
            className="bg-red-600 text-white py-3 px-8 rounded-full font-bold cursor-not-allowed opacity-70"
            disabled
          >
            AGOTADO
          </button>
        ) : (
          <button
            onClick={() => addToCart(product.id)}
            className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                       text-white font-bold text-base
                       px-8 py-3 rounded-full shadow-lg
                       hover:scale-105 transition-transform duration-300"
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
}
