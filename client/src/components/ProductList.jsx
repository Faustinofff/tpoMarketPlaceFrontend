import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

const ProductList = ({ mostrarTodos = false }) => {
  const dispatch = useDispatch();
  const { products = [], error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div className="text-white text-center">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  // Limitar a 6 productos si se está mostrando solo los productos populares
  const productosAMostrar = mostrarTodos ? products : products.slice(0, 6);

  return (
    <section className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] py-16">
      <div className="w-full px-10 pb-16">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          {mostrarTodos ? "Catálogo Completo" : "Productos Populares"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 justify-items-center">
          {productosAMostrar.length > 0 ? (
            productosAMostrar.map((producto) => (
              <div key={producto.id} className="flex justify-center">
                <ProductCard
                  id={producto.id}
                  nombre={producto.name}
                  precio={producto.price}
                  imagenUrl={producto.imageUrl}
                  stock={producto.stock}
                />
              </div>
            ))
          ) : (
            <p className="text-white text-center">No hay productos disponibles.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;


