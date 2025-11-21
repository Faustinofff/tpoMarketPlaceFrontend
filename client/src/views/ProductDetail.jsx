import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // Accede a la acción de agregar al carrito
import { toast } from "react-toastify"; // Muestra notificaciones

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4002/api/v1/products/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error al obtener el producto:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Producto agregado al carrito", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (loading) return <p className="text-white">Cargando producto...</p>;
  if (!product) return <p className="text-red-500">Producto no encontrado</p>;

  const precioFormateado = product.price ? Number(product.price).toLocaleString("es-AR") : "N/A";
  const imageUrl = product.imageUrl || "/placeholder.png"; // Si no hay imagen, mostrar la de reemplazo

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

        <button
          onClick={handleAddToCart}  // Llama a la función con el toast
          className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                     text-white font-bold text-base px-8 py-3 rounded-full shadow-lg
                     hover:scale-105 transition-transform duration-300"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
