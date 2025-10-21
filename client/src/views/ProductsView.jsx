import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductsView = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const URL_API = "http://localhost:4002/api/v1/products";
  const URL_CATEGORIAS = "http://localhost:4002/api/v1/categories";

  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (queryParam) setSearch(queryParam);
  }, [queryParam]);

  // 🔹 Cargar productos y categorías al iniciar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProd, resCat] = await Promise.all([
          fetch(URL_API),
          fetch(URL_CATEGORIAS),
        ]);

        if (!resProd.ok || !resCat.ok)
          throw new Error("Error al obtener datos del servidor");

        const dataProd = await resProd.json();
        const dataCat = await resCat.json();

        setProductos(dataProd);
        setCategorias(dataCat.content || dataCat); // soporta paginación o lista directa
      } catch (error) {
        console.error("Error al obtener productos o categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  const filteredProducts = productos.filter((producto) => {
    const matchSearch = producto.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      !categoriaSeleccionada ||
      producto.category?.id === categoriaSeleccionada ||
      producto.category_id === categoriaSeleccionada;
    return matchSearch && matchCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Cargando productos...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <h1 className="text-5xl font-extrabold text-white text-center mb-10">
          Catálogo Completo
        </h1>

        
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-lg px-5 py-3 rounded-full bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
          />
        </div>

        
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
