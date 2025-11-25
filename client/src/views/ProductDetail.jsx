// src/views/ProductDetail.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Importar thunks y acciones del productDetailSlice
import { fetchProductById } from "../redux/productDetailSlice"; 
// Importar la acción de carrito local y la thunk de sincronización
import { addToCart, syncCartWithBackend } from "../redux/cartSlice"; 
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Leer del store de Redux
  const product = useSelector((state) => state.productDetail.product);
  const loadingStatus = useSelector((state) => state.productDetail.status);
  const token = useSelector((state) => state.auth.token);
  
  const loading = loadingStatus === "loading";

  // useEffect solo despacha la acción de Redux
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  const handleAddToCart = async () => {
    if (!product) {
        toast.error("El producto no está disponible.");
        return;
    }

    // 1. **Acción LOCAL (Inmediata):** Actualiza el estado de Redux localmente
    const productData = { product, quantity: 1 };
    dispatch(addToCart(productData));

    // Si no hay token, no intentamos sincronizar y mostramos un error de UI
    if (!token) {
      toast.error("Debes iniciar sesión para agregar al carrito");
      return;
    }
    
    // 2. **Acción REMOTA:** Despacha la thunk para sincronizar con el backend
    const resultAction = await dispatch(
      syncCartWithBackend({ productId: product.id, quantity: 1 })
    );

    // 3. Maneja el resultado de la thunk (éxito o fracaso)
    if (syncCartWithBackend.fulfilled.match(resultAction)) {
      toast.success("Producto agregado al carrito 🛒", { autoClose: 2500 });
    } else {
      // Usa el mensaje de error que definimos en la thunk
      const error = resultAction.payload;
      console.error("Error al sincronizar carrito:", error);
      toast.error("No se pudo sincronizar con el carrito del backend");
    }
  };

  if (loading) return <p className="text-white">Cargando producto...</p>;
  if (!product) return <p className="text-red-500">Producto no encontrado</p>;

  // ... Renderizado
  const precioFormateado = product.price
    ? Number(product.price).toLocaleString("es-AR")
    : "N/A";
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

        <button
          onClick={handleAddToCart}
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