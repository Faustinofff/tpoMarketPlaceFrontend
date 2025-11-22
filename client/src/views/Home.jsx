import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductList from '../components/ProductList';

export default function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  // Cargar productos al entrar al home
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  return (
    <div className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] min-h-screen">

      <div className="relative w-full h-[600px] mt-1">
        <img
          src="/ip.png"
          alt="Imagen futurista gamer"
          className="w-full h-full object-cover"
        />

        <div className="absolute top-1/4 left-12 text-left">
          <h1 className="text-5xl font-bold text-white mb-4">ELECTROSHOP</h1>
          <p className="text-lg text-white">Te brindamos los dispositivos originales más baratos del país</p>
        </div>

        <div className="absolute top-1/2 right-[5%] transform -translate-y-1/2">
          <button
            onClick={() => window.location.href = "/productos"}
            className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                       text-white font-bold tracking-wide
                       text-lg px-8 py-4
                       rounded-full shadow-lg
                       hover:scale-105 transition-transform duration-300
                       flex items-center justify-center whitespace-nowrap"
          >
            Ver todos los productos
          </button>
        </div>
      </div>

      {/* Productos populares */}
      <div className="mt-10">
        <ProductList mostrarTodos={false} />
      </div>

    </div>
  );
}
