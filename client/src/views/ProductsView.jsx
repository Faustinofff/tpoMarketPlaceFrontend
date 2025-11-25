// src/views/ProductsView.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Thunks para obtener productos y categorías
import { fetchProducts } from "../redux/productSlice"; // Ya existía
import { fetchCategories } from "../redux/categorySlice"; // ¡NUEVO!
import ProductCard from "../components/ProductCard";
import LatestProducts from "../components/LatestProducts";

const ProductsView = () => {
  const dispatch = useDispatch();
  
  // Leer del store de Redux
  const productos = useSelector((state) => state.products.products);
  const loadingProductsStatus = useSelector((state) => state.products.status);
  const categorias = useSelector((state) => state.categories.categories);
  const loadingCategoriesStatus = useSelector((state) => state.categories.status);

  // Estados locales para la UI (filtrado y búsqueda)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [search, setSearch] = useState("");

  const loading = loadingProductsStatus === "loading" || loadingCategoriesStatus === "loading";

  // useEffect solo despacha las acciones de Redux
  useEffect(() => {
    // Cargar productos si el estado es 'idle'
    if (loadingProductsStatus === "idle") { 
      dispatch(fetchProducts());
    }
    // Cargar categorías si el estado es 'idle'
    if (loadingCategoriesStatus === "idle") { 
      dispatch(fetchCategories());
    }
  }, [dispatch, loadingProductsStatus, loadingCategoriesStatus]);

  const filteredProducts = productos.filter((producto) => {
    const matchSearch = producto.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !categoriaSeleccionada || producto.category?.id === categoriaSeleccionada || producto.category_id === categoriaSeleccionada;
    return matchSearch && matchCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Cargando productos...
      </div>
    );
  }

  // ... Renderizado
  return (
    <div className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <h1 className="text-5xl font-extrabold text-white text-center mb-10">
          Catálogo Completo
        </h1>

        {/* Barra de búsqueda */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-lg px-5 py-3 rounded-full bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
          />
        </div>

        {/* Sección de Últimos Productos */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            ¡Últimos Productos!
          </h2>
          <LatestProducts />
        </div>

        {/* Filtro por categorías */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setCategoriaSeleccionada(
                  categoriaSeleccionada === cat.id ? null : cat.id
                )
              }
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                categoriaSeleccionada === cat.id
                  ? "bg-[#00ffff] text-black"
                  : "bg-gray-800 text-white hover:bg-[#00ffff] hover:text-black"
              }`}
            >
              {cat.description}
            </button>
          ))}
        </div>

        {/* Mostrar productos filtrados */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {filteredProducts.map((producto) => (
              <div key={producto.id} className="w-[260px]">
                <ProductCard
                  id={producto.id}
                  nombre={producto.name}
                  precio={producto.price}
                  imagenUrl={producto.imageUrl}
                  stock={producto.stock}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg mt-20">
            No se encontraron productos que coincidan con “{search}”.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsView;